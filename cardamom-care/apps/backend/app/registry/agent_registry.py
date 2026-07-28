from typing import Dict, List, Optional
from datetime import datetime
from app.schemas.swarm import AgentSchema

class AgentRegistry:
    def __init__(self):
        self.agents: Dict[str, AgentSchema] = {}

    def register(self, agent_id: str, name: str, role: str) -> AgentSchema:
        now = datetime.now().isoformat()
        if agent_id not in self.agents:
            self.agents[agent_id] = AgentSchema(
                id=agent_id,
                name=name,
                role=role,
                status="ONLINE",
                lastHeartbeat=now,
                messagesSent=0,
                messagesReceived=0,
                latency="10ms",
                lastTask="Registered with Swarm Coordinator"
            )
        else:
            agent = self.agents[agent_id]
            agent.status = "ONLINE"
            agent.lastHeartbeat = now
            agent.lastTask = "Re-registered"
        return self.agents[agent_id]

    def update_heartbeat(self, agent_id: str):
        if agent_id in self.agents:
            self.agents[agent_id].lastHeartbeat = datetime.now().isoformat()
            self.agents[agent_id].status = "ONLINE"

    def update_status(self, agent_id: str, status: str, last_task: Optional[str] = None):
        if agent_id in self.agents:
            self.agents[agent_id].status = status
            if last_task:
                self.agents[agent_id].lastTask = last_task

    def increment_messages_sent(self, agent_id: str):
        if agent_id in self.agents:
            self.agents[agent_id].messagesSent += 1

    def increment_messages_received(self, agent_id: str):
        if agent_id in self.agents:
            self.agents[agent_id].messagesReceived += 1
            
    def get_agent(self, agent_id: str) -> Optional[AgentSchema]:
        return self.agents.get(agent_id)

    def get_all_agents(self) -> List[AgentSchema]:
        return list(self.agents.values())

    def reset(self):
        self.agents.clear()
