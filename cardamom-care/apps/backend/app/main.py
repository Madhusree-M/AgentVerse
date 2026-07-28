from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import api_router
from app.routers.swarm import router as swarm_router
from app.routers.weather import router as weather_router
from app.routers.disease import router as disease_router
from app.agents.mock_agents import start_mock_agents
from app.agents.real_weather_agent import real_weather_agent
from app.agents.real_disease_agent import real_disease_agent
import asyncio

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Multi-Agent System Backend for Cardamom Care Precision Farming"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(swarm_router, prefix="/api/swarm", tags=["Swarm Coordinator"])
app.include_router(weather_router, prefix="/api/weather", tags=["Weather Intelligence"])
app.include_router(disease_router, prefix="/api/disease", tags=["Disease Intelligence"])

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(start_mock_agents())
    asyncio.create_task(real_weather_agent.start())
    asyncio.create_task(real_disease_agent.start())


@app.get("/")
async def root():
    return {
        "message": "Welcome to Cardamom Care API",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR
    }
