from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict, Any
from app.coordinator.swarm_coordinator import coordinator
from app.services.websocket_manager import websocket_manager
from app.schemas.swarm import SwarmStateSchema, AgentSchema, LogEntrySchema

router = APIRouter()

@router.get("/status", response_model=SwarmStateSchema)
def get_swarm_status():
    return coordinator.get_swarm_state()

@router.get("/agents", response_model=List[AgentSchema])
def get_swarm_agents():
    return coordinator.registry.get_all_agents()

@router.get("/logs", response_model=List[LogEntrySchema])
def get_swarm_logs():
    return coordinator.logger.get_logs()

@router.get("/messages")
def get_swarm_messages():
    # To conform to standard list of messages if needed, currently we just track total messages
    # but we can return some stats or recent message logs. Returning empty list for now.
    return []

@router.post("/reset")
def reset_swarm():
    coordinator.reset()
    return {"status": "Swarm reset successful"}

@router.get("/health")
def get_swarm_health():
    state = coordinator.get_swarm_state()
    return {"status": state.systemHealth}

@router.websocket("/ws")
async def swarm_websocket(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        # Send initial state
        await websocket.send_json({
            "type": "INITIAL_STATE",
            "state": coordinator.get_swarm_state().model_dump(),
            "agents": [a.model_dump() for a in coordinator.registry.get_all_agents()],
            "logs": [l.model_dump() for l in coordinator.logger.get_logs()]
        })
        
        while True:
            # Wait for any messages from the client if needed
            data = await websocket.receive_text()
            # Can handle incoming messages here if necessary
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)
