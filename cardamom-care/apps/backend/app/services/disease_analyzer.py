from app.schemas.disease import DiseaseAnalysisResult, DiseaseEventConstants
from typing import Tuple, List

class DiseaseRuleEngine:
    def __init__(self):
        # We can make this easily extensible in the future by loading from JSON/DB
        pass

    def evaluate(self, humidity: float, rainfall: float, temp: float, cloud_cover: float = 0) -> Tuple[DiseaseAnalysisResult, List[str]]:
        events = []
        
        # Rule 1: Rhizome Rot
        if humidity > 95 and rainfall > 50:
            result = DiseaseAnalysisResult(
                disease_name="Rhizome Rot",
                risk_percentage=88,
                severity="HIGH",
                recommendation="Improve soil drainage and apply Trichoderma",
                inspection_priority="HIGH"
            )
            events.extend([DiseaseEventConstants.RHIZOME_ROT_ALERT, DiseaseEventConstants.DISEASE_HIGH])
            return result, events
            
        # Rule 2: Capsule Rot
        if humidity > 90 and rainfall > 20 and 18 <= temp <= 28:
            result = DiseaseAnalysisResult(
                disease_name="Capsule Rot",
                risk_percentage=94,
                severity="HIGH",
                recommendation="Spray Copper Oxychloride within 24 hours",
                inspection_priority="CRITICAL"
            )
            events.extend([DiseaseEventConstants.CAPSULE_ROT_DETECTED, DiseaseEventConstants.DISEASE_HIGH])
            return result, events

        # Rule 3: Leaf Blight
        if humidity > 85 and cloud_cover > 70 and 20 <= temp <= 28:
            result = DiseaseAnalysisResult(
                disease_name="Leaf Blight",
                risk_percentage=65,
                severity="MEDIUM",
                recommendation="Monitor spread, apply Mancozeb if symptoms worsen",
                inspection_priority="MEDIUM"
            )
            events.extend([DiseaseEventConstants.LEAF_BLIGHT_ALERT, DiseaseEventConstants.DISEASE_MEDIUM])
            return result, events

        # Default / Healthy
        if temp > 32 and humidity < 60:
            result = DiseaseAnalysisResult(
                disease_name="Healthy",
                risk_percentage=5,
                severity="LOW",
                recommendation="Maintain normal irrigation schedule",
                inspection_priority="LOW"
            )
            events.append(DiseaseEventConstants.DISEASE_LOW)
            return result, events
            
        # Fallback if no specific rule matched
        result = DiseaseAnalysisResult(
            disease_name="Healthy",
            risk_percentage=10,
            severity="LOW",
            recommendation="Continue standard monitoring",
            inspection_priority="LOW"
        )
        events.append(DiseaseEventConstants.DISEASE_LOW)
        return result, events

class DiseaseAnalyzer:
    def __init__(self):
        self.engine = DiseaseRuleEngine()
        
    def analyze_weather(self, weather_data: dict) -> Tuple[DiseaseAnalysisResult, List[str]]:
        temp = weather_data.get("temperature_2m", 25.0)
        humidity = weather_data.get("relative_humidity_2m", 60.0)
        rainfall = weather_data.get("precipitation", 0.0)
        cloud_cover = weather_data.get("cloud_cover", 0.0)
        
        return self.engine.evaluate(humidity, rainfall, temp, cloud_cover)

disease_analyzer = DiseaseAnalyzer()
