import httpx
import asyncio
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class WeatherFetcher:
    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1/forecast"
        # Idukki, Kerala
        self.default_lat = 9.8164
        self.default_lon = 77.2140

    def set_location(self, lat: float, lon: float):
        self.default_lat = lat
        self.default_lon = lon

    async def fetch_weather(self) -> Optional[Dict[str, Any]]:
        params = {
            "latitude": self.default_lat,
            "longitude": self.default_lon,
            "current": "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,cloud_cover,surface_pressure",
            "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum",
            "timezone": "auto"
        }

        # Retry logic
        for attempt in range(3):
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(self.base_url, params=params, timeout=10.0)
                    response.raise_for_status()
                    return response.json()
            except Exception as e:
                logger.error(f"Weather fetch failed on attempt {attempt + 1}: {e}")
                if attempt < 2:
                    await asyncio.sleep(2)
        return None

weather_fetcher = WeatherFetcher()
