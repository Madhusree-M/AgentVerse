import asyncio
from typing import Callable, List, Dict
from app.schemas.swarm import EventSchema

class EventBus:
    def __init__(self):
        self.subscribers: Dict[str, List[Callable[[EventSchema], None]]] = {}

    def subscribe(self, event_type: str, callback: Callable[[EventSchema], None]):
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(callback)

    def publish(self, event: EventSchema):
        if event.eventType in self.subscribers:
            for callback in self.subscribers[event.eventType]:
                # In a real app we might use asyncio.create_task for async callbacks,
                # but for simplicity and since it's just in memory we can call it.
                if asyncio.iscoroutinefunction(callback):
                    asyncio.create_task(callback(event))
                else:
                    callback(event)
        
        # Also publish to wildcard if anyone is listening to all events
        if "*" in self.subscribers:
            for callback in self.subscribers["*"]:
                if asyncio.iscoroutinefunction(callback):
                    asyncio.create_task(callback(event))
                else:
                    callback(event)

    def reset(self):
        self.subscribers.clear()
