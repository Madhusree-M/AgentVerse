from fastapi import APIRouter
from app.agents.real_weather_agent import real_weather_agent
from typing import Dict, Any

router = APIRouter()

@router.get("/live", response_model=Dict[str, Any])
def get_live_weather():
    if real_weather_agent.cached_weather:
        return {
            "cached": True,
            "last_fetch": real_weather_agent.last_fetch,
            "data": real_weather_agent.cached_weather
        }
    return {"cached": False, "data": None}
from pydantic import BaseModel
from app.services.weather_fetcher import weather_fetcher

class LocationUpdate(BaseModel):
    lat: float
    lon: float

@router.post("/location")
async def update_weather_location(loc: LocationUpdate):
    weather_fetcher.set_location(loc.lat, loc.lon)
    # Trigger an immediate fetch so dashboard updates instantly
    await real_weather_agent.trigger_fetch()
    return {"status": "success", "lat": loc.lat, "lon": loc.lon}
