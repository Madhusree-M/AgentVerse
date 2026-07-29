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
            await asyncio.sleep(12)
            event_type = random.choice(self.events)
            
            # Pick a random receiver or broadcast
            agents = coordinator.registry.get_all_agents()
            other_agents = [a for a in agents if a.id != self.agent_id]
            receiver = random.choice(other_agents).id if other_agents else "coordinator"
            
            coordinator.publish_message(
                sender_id=self.agent_id,
                receiver_id=receiver,
                event_type=event_type,
                payload={"value": random.randint(1, 100)}
            )


yield_agent = MockAgent(
    "agent-yield", 
    "Yield Prediction Agent", 
    "Harvest Forecaster", 
    ["YIELD_MODEL_UPDATED", "HARVEST_OPTIMAL", "DRY_SPELL_WARNING"]
)
market_agent = MockAgent(
    "agent-market", 
    "Market Intelligence Agent", 
    "Auction Rate Monitor", 
    ["AUCTION_PRICE_PEAK", "DAILY_AVG_UPDATE", "GRADE_8MM_PREMIUM"]
)
harvest_agent = MockAgent(
    "agent-harvest", 
    "Harvest Planner Agent", 
    "Picker & Pod Scheduler", 
    ["PICKER_SCHEDULED", "DRYING_POD_ALLOCATED", "BATCH_READY"]
)

async def start_mock_agents():
    await asyncio.sleep(2)
    await yield_agent.start()
    await asyncio.sleep(1)
    await market_agent.start()
    await asyncio.sleep(1)
    await harvest_agent.start()
