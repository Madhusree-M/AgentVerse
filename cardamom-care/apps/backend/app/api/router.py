from fastapi import APIRouter, Query, Body, UploadFile, File, Form
from typing import Optional, List
from app.services.agentverse import agentverse_service
from app.services.weather_api import weather_api_service
from app.services.agents.weather_risk_agent import weather_risk_agent
from app.services.agents.disease_detection_agent import crop_disease_agent
from app.services.agents.pest_detection_agent import pest_detection_agent

api_router = APIRouter()


@api_router.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "Cardamom Care API",
        "version": "0.1.0"
    }


@api_router.get("/weather/live", tags=["Weather"])
async def get_live_weather(
    lat: Optional[float] = Query(None, description="Latitude (Default: 9.8164 Idukki)"),
    lon: Optional[float] = Query(None, description="Longitude (Default: 77.2140 Idukki)"),
):
    """Fetch live microclimate weather using Open-Meteo Free API."""
    return await weather_api_service.get_live_weather(latitude=lat, longitude=lon)


@api_router.get("/weather/locations", tags=["Weather"])
async def search_weather_locations(
    q: Optional[str] = Query(None, description="Location search query (e.g. Munnar, Pollachi, Bodinayakanur)"),
):
    """Search cardamom growing regions or city names via free Geocoding API."""
    return await weather_api_service.search_locations(query=q or "")


@api_router.get("/weather/history", tags=["Weather"])
async def get_weather_history(
    period: str = Query("7D", description="Time period filter: 24H, 7D, 30D, 1Y"),
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude"),
):
    """Fetch period-filtered microclimate trends (24H, 7D, 30D, 1Y) using Open-Meteo API."""
    return await weather_api_service.get_weather_history(period=period, latitude=lat, longitude=lon)


@api_router.get("/agents/weather-risk", tags=["Agents"])
async def get_weather_risk_analysis(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude"),
):
    """Execute Agentverse Weather Risk Analysis Agent on live Open-Meteo data."""
    return await weather_risk_agent.analyze(latitude=lat, longitude=lon)


@api_router.post("/agents/disease-detect", tags=["Agents"])
async def detect_crop_disease(
    symptoms: List[str] = Body(..., example=["discontinuous chlorotic streaks", "mosaic pattern"]),
    crop_zone: Optional[str] = Body("Block A - Leaf Section"),
    humidity: Optional[float] = Body(85.0),
):
    """Execute Agentverse Crop Disease Detection Agent on text symptoms."""
    return await crop_disease_agent.analyze(symptoms=symptoms, crop_zone=crop_zone, humidity=humidity)


@api_router.post("/agents/disease-detect-image", tags=["Agents"])
async def detect_crop_disease_from_image(
    file: UploadFile = File(...),
    crop_zone: Optional[str] = Form("Block A - High Range"),
):
    """
    Upload a cardamom leaf image file.
    Executes Agentverse Crop Disease Detection Agent to diagnose disease,
    list key symptoms, and prescribe exact medicines & dosages.
    """
    image_bytes = await file.read()
    return await crop_disease_agent.analyze_image(
        image_bytes=image_bytes, filename=file.filename or "leaf_sample.jpg", crop_zone=crop_zone
    )


@api_router.post("/agents/pest-detect", tags=["Agents"])
async def detect_crop_pest(
    observations: List[str] = Body(..., example=["scabs on capsules", "panicle curling"]),
    crop_zone: Optional[str] = Body("Block B - Capsule Clusters"),
    temp_celsius: Optional[float] = Body(26.0),
):
    """Execute Agentverse Pest Detection Agent."""
    return await pest_detection_agent.analyze(observations=observations, crop_zone=crop_zone, temp_celsius=temp_celsius)


@api_router.get("/agents/status", tags=["Agents"])
async def get_agents_status():
    result = await agentverse_service.dispatch_agent_task(
        "supervisor_agent",
        {"command": "check_health"}
    )
    return result
