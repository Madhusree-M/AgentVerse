import asyncio
import random
from app.coordinator.swarm_coordinator import coordinator

class MockAgent:
    def __init__(self, agent_id: str, name: str, role: str, events: list):
        self.agent_id = agent_id
        self.name = name
        self.role = role
        self.events = events
        self.running = False

    async def start(self):
        coordinator.register_agent(self.agent_id, self.name, self.role)
        self.running = True
        
        asyncio.create_task(self._heartbeat_loop())
        asyncio.create_task(self._event_loop())

    async def stop(self):
        self.running = False

    async def _heartbeat_loop(self):
        while self.running:
            await asyncio.sleep(5)
            coordinator.handle_heartbeat(self.agent_id)

    async def _event_loop(self):
        while self.running:
            await asyncio.sleep(10)
            event_type = random.choice(self.events)
            
            # For demonstration, pick a random receiver or broadcast
            agents = coordinator.registry.get_all_agents()
            other_agents = [a for a in agents if a.id != self.agent_id]
            receiver = random.choice(other_agents).id if other_agents else "coordinator"
            
            coordinator.publish_message(
                sender_id=self.agent_id,
                receiver_id=receiver,
                event_type=event_type,
                payload={"value": random.randint(1, 100)}
            )


soil_agent = MockAgent(
    "agent-soil", 
    "SoilAgent", 
    "Nutrient Balance", 
    ["LOW_NITROGEN", "PH_IMBALANCE", "OPTIMAL_SOIL"]
)
irrigation_agent = MockAgent(
    "agent-irrigation", 
    "IrrigationAgent", 
    "Moisture Control", 
    ["LOW_SOIL_MOISTURE", "IRRIGATION_START", "IRRIGATION_STOP"]
)

async def start_mock_agents():
    # Wait a tiny bit for the system to boot up
    await asyncio.sleep(2)
    await asyncio.sleep(2)
    # Disease agent is now real
    await soil_agent.start()
    await asyncio.sleep(1)
    await irrigation_agent.start()
