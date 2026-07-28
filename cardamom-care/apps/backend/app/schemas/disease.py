from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DiseaseAnalysisResult(BaseModel):
    disease_name: str
    risk_percentage: int
    severity: str
    recommendation: str
    inspection_priority: str
    timestamp: str = ""

class DiseaseEventConstants:
    DISEASE_LOW = "DISEASE_LOW"
    DISEASE_MEDIUM = "DISEASE_MEDIUM"
    DISEASE_HIGH = "DISEASE_HIGH"
    CAPSULE_ROT_DETECTED = "CAPSULE_ROT_DETECTED"
    LEAF_BLIGHT_ALERT = "LEAF_BLIGHT_ALERT"
    RHIZOME_ROT_ALERT = "RHIZOME_ROT_ALERT"
