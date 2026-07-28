from fastapi import APIRouter
from app.agents.real_disease_agent import real_disease_agent
from typing import Dict, Any
from pydantic import BaseModel
from app.coordinator.swarm_coordinator import coordinator
from app.schemas.swarm import EventSchema
import asyncio
from datetime import datetime

router = APIRouter()

@router.get("/live", response_model=Dict[str, Any])
def get_live_disease():
    if real_disease_agent.cached_analysis:
        return {
            "cached": True,
            "last_analysis": real_disease_agent.last_analysis,
            "data": real_disease_agent.cached_analysis
        }
    return {"cached": False, "data": None}

class SimulateWeatherPayload(BaseModel):
    temperature_2m: float
    relative_humidity_2m: float
    precipitation: float
    cloud_cover: float = 0.0

@router.post("/simulate")
async def simulate_weather_event(payload: SimulateWeatherPayload):
    # Determine which event to send based on the payload roughly
    event_type = "NORMAL_WEATHER"
    if payload.relative_humidity_2m > 90 and payload.precipitation > 20:
        event_type = "HIGH_FUNGAL_RISK"
    elif payload.relative_humidity_2m > 90:
        event_type = "HIGH_HUMIDITY"
    elif payload.precipitation > 25:
        event_type = "RAIN_WARNING"
    elif payload.temperature_2m > 30:
        event_type = "HEAT_STRESS"

    event = EventSchema(
        sender="simulate-script",
        receiver="coordinator",
        eventType=event_type,
        payload={"source": "simulation", "value": payload.model_dump()},
        timestamp=datetime.now().isoformat()
    )
    
    # Send event to bus which DiseaseAgent is listening to
    coordinator.bus.publish(event)
    return {"status": "simulated", "event": event_type}
