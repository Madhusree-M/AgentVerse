import asyncio
from datetime import datetime
from app.coordinator.swarm_coordinator import coordinator
from app.services.weather_fetcher import weather_fetcher
from app.services.weather_analyzer import weather_analyzer

class RealWeatherAgent:
    def __init__(self):
        self.agent_id = "agent-weather"
        self.name = "Real Weather Agent"
        self.role = "Open-Meteo Intelligence"
        self.running = False
        self.cached_weather = None
        self.last_fetch = None

    async def start(self):
        coordinator.register_agent(self.agent_id, self.name, self.role)
        self.running = True
        
        asyncio.create_task(self._heartbeat_loop())
        asyncio.create_task(self._fetch_and_analyze_loop())

    async def stop(self):
        self.running = False

    async def _heartbeat_loop(self):
        while self.running:
            await asyncio.sleep(5)
            coordinator.handle_heartbeat(self.agent_id)

    async def trigger_fetch(self):
        # Force a fetch right now
        await self._do_fetch_and_analyze()

    async def _do_fetch_and_analyze(self):
        try:
            weather_data = await weather_fetcher.fetch_weather()
            if weather_data:
                self.cached_weather = weather_data
                self.last_fetch = datetime.now().isoformat()
                
                # Analyze for events
                events = weather_analyzer.analyze(weather_data)
                
                current = weather_data.get("current", {})
                temp = current.get("temperature_2m", "--")
                humidity = current.get("relative_humidity_2m", "--")
                
                # Log the fetch as per requirement
                coordinator.logger.add_log(f"WeatherAgent fetched Open-Meteo. Temp {temp}°C, Humidity {humidity}%")
                
                # Publish events
                for event_type in events:
                    # Broadcast to coordinator for everyone to hear
                    coordinator.publish_message(
                        sender_id=self.agent_id,
                        receiver_id="coordinator",
                        event_type=event_type,
                        payload={"source": "open-meteo", "value": current}
                    )
        except Exception as e:
            coordinator.logger.add_log(f"WeatherAgent error: {str(e)}")

    async def _fetch_and_analyze_loop(self):
        while self.running:
            await self._do_fetch_and_analyze()
            # Wait 60 seconds before next fetch
            await asyncio.sleep(60)

real_weather_agent = RealWeatherAgent()
