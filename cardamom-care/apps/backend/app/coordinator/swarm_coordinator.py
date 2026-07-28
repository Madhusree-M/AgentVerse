from datetime import datetime
from app.registry.agent_registry import AgentRegistry
from app.protocol.event_bus import EventBus
from app.logs.execution_log import ExecutionLog
from app.schemas.swarm import EventSchema, SwarmStateSchema
from app.services.websocket_manager import websocket_manager
import asyncio

class SwarmCoordinator:
    def __init__(self):
        self.registry = AgentRegistry()
        self.bus = EventBus()
        self.logger = ExecutionLog()
        self.total_messages = 0

        # Subscribe to all events to log them and broadcast to websockets
        self.bus.subscribe("*", self._handle_event)
        
    def register_agent(self, agent_id: str, name: str, role: str):
        agent = self.registry.register(agent_id, name, role)
        self.logger.add_log(f"{name} registered")
        event = EventSchema(
            sender=agent_id,
            receiver="coordinator",
            eventType="AGENT_REGISTERED",
            payload={"name": name, "role": role},
            timestamp=datetime.now().isoformat()
        )
        self.bus.publish(event)
        return agent

    def handle_heartbeat(self, agent_id: str):
        self.registry.update_heartbeat(agent_id)
        # We don't log every heartbeat to execution log to avoid spam,
        # but we can broadcast it or just update registry.
        agent = self.registry.get_agent(agent_id)
        if agent:
            event = EventSchema(
                sender=agent_id,
                receiver="coordinator",
                eventType="HEARTBEAT",
                payload={"status": agent.status},
                timestamp=datetime.now().isoformat()
            )
            self.bus.publish(event)

    def publish_message(self, sender_id: str, receiver_id: str, event_type: str, payload: dict):
        self.total_messages += 1
        self.registry.increment_messages_sent(sender_id)
        self.registry.update_status(sender_id, "Active", f"Published {event_type}")
        
        agent = self.registry.get_agent(sender_id)
        agent_name = agent.name if agent else sender_id
        
        # Determine log action string based on whether there's a receiver
        if receiver_id and receiver_id != "coordinator":
            receiver_agent = self.registry.get_agent(receiver_id)
            if receiver_agent:
                self.registry.increment_messages_received(receiver_id)
                self.registry.update_status(receiver_id, "Active", f"Received {event_type}")
                self.logger.add_log(f"{agent_name} published {event_type} to {receiver_agent.name}")
            else:
                self.logger.add_log(f"{agent_name} published {event_type}")
        else:
            self.logger.add_log(f"{agent_name} published {event_type}")

        event = EventSchema(
            sender=sender_id,
            receiver=receiver_id,
            eventType=event_type,
            payload=payload,
            timestamp=datetime.now().isoformat()
        )
        self.bus.publish(event)
        
    async def _handle_event(self, event: EventSchema):
        # Broadcast all swarm changes to frontend via websocket
        state = self.get_swarm_state()
        agents = self.registry.get_all_agents()
        logs = self.logger.get_logs()
        
        await websocket_manager.broadcast({
            "type": "SWARM_UPDATE",
            "state": state.model_dump(),
            "agents": [a.model_dump() for a in agents],
            "logs": [l.model_dump() for l in logs]
        })

    def get_swarm_state(self) -> SwarmStateSchema:
        agents = self.registry.get_all_agents()
        total = len(agents)
        online = sum(1 for a in agents if a.status in ["ONLINE", "Active", "Idle"])
        offline = total - online
        return SwarmStateSchema(
            totalAgents=total,
            onlineAgents=online,
            offlineAgents=offline,
            totalMessages=self.total_messages,
            systemHealth="Healthy" if online == total and total > 0 else ("Degraded" if online > 0 else "Offline"),
            lastUpdated=datetime.now().isoformat()
        )

    def reset(self):
        self.registry.reset()
        self.logger.reset()
        self.bus.reset()
        self.total_messages = 0
        self.bus.subscribe("*", self._handle_event)
        
coordinator = SwarmCoordinator()
