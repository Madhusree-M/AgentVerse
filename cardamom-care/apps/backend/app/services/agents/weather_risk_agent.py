from datetime import datetime
from typing import Dict, Any, Optional
from app.services.weather_api import weather_api_service


class WeatherRiskAnalysisAgent:
    """
    Agentverse Autonomous Agent 1: Weather Risk Analysis Agent.
    Evaluates microclimate weather streams (from Open-Meteo Free API)
    for Cardamom high-range risks (Fungal Spore Germination, Dew Point Rot, Dry Spells).
    """

    AGENT_ID = "agent_weather_risk_01"
    AGENT_NAME = "Weather Risk Analysis Agent"
    PROTOCOL_TYPE = "cardamom_care/weather_risk/v1"

    async def analyze(
        self, latitude: Optional[float] = None, longitude: Optional[float] = None
    ) -> Dict[str, Any]:
        # 1. Fetch live Open-Meteo weather data
        weather_data = await weather_api_service.get_live_weather(latitude, longitude)
        current = weather_data.get("current", {})
        forecast = weather_data.get("forecast_7day", {})

        temp = current.get("temperature_celsius", 24.0)
        humidity = current.get("humidity_percent", 84)
        precip = current.get("precipitation_mm", 0.0)

        # 2. Risk Evaluation Logic for Cardamom Crop
        fungal_spore_risk = "Low"
        rhizome_rot_risk = "Low"
        thrips_pest_activity = "Moderate"
        risk_score = 15  # Out of 100

        recommendations = []

        # High humidity (>82%) + temperature between 18°C and 27°C triggers spore germination risk
        if humidity > 82 and 18.0 <= temp <= 27.0:
            fungal_spore_risk = "High"
            risk_score += 45
            recommendations.append(
                "High relative humidity coupled with mild temperatures creates optimal conditions for Capsule Rot (Azhukal) spores. Inspect shade canopy and prepare biological Trichoderma spray."
            )

        # Heavy rain (>20mm in 24h forecast)
        precip_sums = forecast.get("precipitation_sum", [])
        max_daily_rain = max(precip_sums) if precip_sums else precip
        if max_daily_rain > 20.0:
            rhizome_rot_risk = "Elevated"
            risk_score += 30
            recommendations.append(
                f"Upcoming heavy rainfall ({max_daily_rain}mm expected). Ensure trench drainage around cardamom clumps is clear to prevent root waterlogging and Rhizome rot."
            )

        # Hot and dry conditions (>27°C and humidity <75%) encourage Thrips pest activity
        if temp > 27.0 and humidity < 75:
            thrips_pest_activity = "High"
            risk_score += 25
            recommendations.append(
                "Warm dry weather detected. Cardamom Thrips (Sciothrips cardamomi) activity increases. Monitor panicles and young shoots."
            )

        if not recommendations:
            recommendations.append(
                "Microclimate conditions are within optimal parameters for cardamom growth. Continue normal shade canopy management."
            )

        # 3. Format Agentverse uAgent-compatible envelope
        return {
            "agent_id": self.AGENT_ID,
            "agent_name": self.AGENT_NAME,
            "protocol": self.PROTOCOL_TYPE,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "status": "active",
            "telemetry_source": "Open-Meteo Live Free API",
            "input_metrics": {
                "temperature_celsius": temp,
                "humidity_percent": humidity,
                "precipitation_mm": precip,
                "location": weather_data.get("location", {}).get("name"),
            },
            "risk_analysis": {
                "overall_risk_score": min(risk_score, 100),
                "fungal_spore_risk": fungal_spore_risk,
                "rhizome_rot_risk": rhizome_rot_risk,
                "thrips_pest_activity": thrips_pest_activity,
            },
            "recommended_actions": recommendations,
        }


weather_risk_agent = WeatherRiskAnalysisAgent()
