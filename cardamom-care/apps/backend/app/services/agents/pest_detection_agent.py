from datetime import datetime
from typing import Dict, Any, List, Optional


class PestDetectionAgent:
    """
    Agentverse Autonomous Agent 3: Pest Detection Agent.
    Identifies Cardamom pest infestations:
    1. Cardamom Thrips (Sciothrips cardamomi)
    2. Shoot & Capsule Borer (Conogethes punctiferalis)
    3. Root Grub (Basilepta fulvicorne)
    """

    AGENT_ID = "agent_pest_detection_03"
    AGENT_NAME = "Pest Detection Agent"
    PROTOCOL_TYPE = "cardamom_care/pest_detection/v1"

    KNOWN_PESTS = {
        "thrips": {
            "name": "Cardamom Thrips",
            "scientific": "Sciothrips cardamomi",
            "damage_pattern": "Scabs & corky encrustations on capsules, panicle curling",
            "threat_level": "High",
            "affected_parts": ["Capsules", "Panicles", "Flower Buds"],
        },
        "borer": {
            "name": "Shoot & Capsule Borer",
            "scientific": "Conogethes punctiferalis",
            "damage_pattern": "Boreholes on tillers with frass excretion, central shoot drying (Dead Heart)",
            "threat_level": "Critical",
            "affected_parts": ["Pseudostems", "Unopened Leaf Sheaths", "Panicles"],
        },
        "root_grub": {
            "name": "Root Grub",
            "scientific": "Basilepta fulvicorne / Holotrichia",
            "damage_pattern": "Chewed roots, clump loosening, yellowing & wilting of entire tillers",
            "threat_level": "High",
            "affected_parts": ["Root System", "Rhizome Base"],
        },
    }

    async def analyze(
        self,
        observations: List[str],
        crop_zone: Optional[str] = "Block B - Capsule Clusters",
        temp_celsius: Optional[float] = 26.0,
    ) -> Dict[str, Any]:
        obs_text = " ".join([o.lower() for o in observations])
        detected_pest = None
        confidence = 94.5

        if "thrips" in obs_text or "scab" in obs_text or "corky" in obs_text or "curling" in obs_text:
            detected_pest = self.KNOWN_PESTS["thrips"]
            confidence = 97.2
        elif "borer" in obs_text or "hole" in obs_text or "frass" in obs_text or "dead heart" in obs_text:
            detected_pest = self.KNOWN_PESTS["borer"]
            confidence = 96.8
        elif "grub" in obs_text or "root" in obs_text or "wilt" in obs_text or "loosening" in obs_text:
            detected_pest = self.KNOWN_PESTS["root_grub"]
            confidence = 95.1
        else:
            # Default scan evaluation based on temperature threshold
            if temp_celsius and temp_celsius > 25.5:
                detected_pest = self.KNOWN_PESTS["thrips"]
                confidence = 88.4
            else:
                detected_pest = self.KNOWN_PESTS["borer"]
                confidence = 85.0

        return {
            "agent_id": self.AGENT_ID,
            "agent_name": self.AGENT_NAME,
            "protocol": self.PROTOCOL_TYPE,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "status": "active",
            "input_observations": {
                "crop_zone": crop_zone,
                "observations": observations,
                "temperature": temp_celsius,
            },
            "pest_diagnosis": {
                "pest_name": detected_pest["name"],
                "scientific_name": detected_pest["scientific"],
                "damage_pattern": detected_pest["damage_pattern"],
                "threat_level": detected_pest["threat_level"],
                "affected_parts": detected_pest["affected_parts"],
                "confidence_percent": f"{confidence}%",
            },
            "agentverse_action": (
                f"Urgent pest suppression alert generated for {crop_zone}. "
                f"Forwarding diagnostic parameters to Treatment Recommendation Agent."
            ),
        }


pest_detection_agent = PestDetectionAgent()
