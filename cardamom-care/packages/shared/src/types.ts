export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'farmer' | 'agronomist';
  createdAt: string;
}

export interface FarmLocation {
  latitude: number;
  longitude: number;
  elevationMeters: number;
  region: string;
}

export interface SensorTelemetry {
  timestamp: string;
  soilMoisturePercent: number;
  ambientTempCelsius: number;
  humidityPercent: number;
  soilPh: number;
  npkLevels: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

export interface AgentAlert {
  id: string;
  agentId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  createdAt: string;
}
