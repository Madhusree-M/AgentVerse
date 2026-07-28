from typing import Dict, Any, List

class WeatherAnalyzer:
    def analyze(self, weather_data: Dict[str, Any]) -> List[str]:
        events = []
        if not weather_data or "current" not in weather_data:
            return events

        current = weather_data["current"]
        temp = current.get("temperature_2m", 0)
        humidity = current.get("relative_humidity_2m", 0)
        rainfall = current.get("precipitation", 0)
        wind = current.get("wind_speed_10m", 0)

        if humidity > 90 and rainfall > 20:
            events.append("HIGH_FUNGAL_RISK")
        elif humidity > 90:
            events.append("HIGH_HUMIDITY")
            
        if rainfall > 25:
            events.append("RAIN_WARNING")
        elif rainfall < 5 and humidity < 60:
            events.append("LOW_RAINFALL")
            
        if wind > 35:
            events.append("WIND_ALERT")
            
        if temp > 30:
            events.append("HEAT_STRESS")
            
        if not events:
            events.append("NORMAL_WEATHER")
            
        return events

weather_analyzer = WeatherAnalyzer()
