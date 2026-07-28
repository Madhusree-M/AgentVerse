from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class AgentSchema(BaseModel):
    id: str
    name: str
    role: str = "Agent"
    status: str
    lastHeartbeat: str
    messagesSent: int = 0
    messagesReceived: int = 0
    latency: str = "0ms"
    lastTask: str = "Initializing..."

class EventSchema(BaseModel):
    sender: str
    receiver: str
    eventType: str
    payload: Dict[str, Any]
    timestamp: str

class LogEntrySchema(BaseModel):
    timestamp: str
    message: str

class SwarmStateSchema(BaseModel):
    totalAgents: int
    onlineAgents: int
    offlineAgents: int
    totalMessages: int
    systemHealth: str
    lastUpdated: str
