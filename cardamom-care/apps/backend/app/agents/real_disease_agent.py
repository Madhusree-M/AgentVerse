import asyncio
from datetime import datetime
from app.coordinator.swarm_coordinator import coordinator
from app.schemas.swarm import EventSchema
from app.services.disease_analyzer import disease_analyzer

class RealDiseaseAgent:
    def __init__(self):
        self.agent_id = "agent-disease"
        self.name = "Real Disease Agent"
        self.role = "Foliage Inspection"
        self.running = False
        self.cached_analysis = None
        self.last_analysis = None

    async def start(self):
        coordinator.register_agent(self.agent_id, self.name, self.role)
        self.running = True
        
        # Subscribe to weather events
        for event in ["HIGH_HUMIDITY", "HIGH_FUNGAL_RISK", "RAIN_WARNING", "HEAT_STRESS", "NORMAL_WEATHER"]:
            coordinator.bus.subscribe(event, self.handle_weather_event)
            
        asyncio.create_task(self._heartbeat_loop())

    async def stop(self):
        self.running = False

    async def _heartbeat_loop(self):
        while self.running:
            await asyncio.sleep(5)
            coordinator.handle_heartbeat(self.agent_id)

    async def handle_weather_event(self, event: EventSchema):
        if not self.running:
            return
            
        # Ensure we only process events from the weather agent
        if not event.payload or "value" not in event.payload:
            return
            
        weather_data = event.payload["value"]
        
        # Log reception
        coordinator.logger.add_log(f"DiseaseAgent received {event.eventType}")
        
        # Analyze
        result, events = disease_analyzer.analyze_weather(weather_data)
        
        # Cache
        result.timestamp = datetime.now().isoformat()
        self.cached_analysis = result.model_dump()
        self.last_analysis = result.timestamp
        
        # Log calculation
        coordinator.logger.add_log(f"DiseaseAgent calculated {result.disease_name} Risk {result.risk_percentage}%")
        
        # Wait a short delay to simulate analysis time
        await asyncio.sleep(0.5)
        
        # Publish
        for out_event in events:
            coordinator.publish_message(
                sender_id=self.agent_id,
                receiver_id="coordinator",
                event_type=out_event,
                payload=self.cached_analysis
            )

real_disease_agent = RealDiseaseAgent()
