import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface LiveWeatherResponse {
  status: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  current: {
    temperature_celsius: number;
    humidity_percent: number;
    precipitation_mm: number;
    wind_speed_kmh: number;
    weather_code: number;
    timestamp: string;
  };
  forecast_7day: {
    dates: string[];
    temp_max: number[];
    temp_min: number[];
    precipitation_sum: number[];
  };
}

export interface WeatherRiskAgentResponse {
  agent_id: string;
  agent_name: string;
  protocol: string;
  timestamp: string;
  status: string;
  telemetry_source: string;
  input_metrics: {
    temperature_celsius: number;
    humidity_percent: number;
    precipitation_mm: number;
    location: string;
  };
  risk_analysis: {
    overall_risk_score: number;
    fungal_spore_risk: string;
    rhizome_rot_risk: string;
    thrips_pest_activity: string;
  };
  recommended_actions: string[];
}

export function useLiveWeather(lat?: number, lon?: number) {
  return useQuery<LiveWeatherResponse>({
    queryKey: ['live-weather', lat, lon],
    queryFn: async () => {
      const params = lat && lon ? { lat, lon } : {};
      const response = await apiClient.get('/weather/live', { params });
      return response.data;
    },
    refetchInterval: 15000, // Refetch live weather every 15s
  });
}

export function useWeatherRiskAgent(lat?: number, lon?: number) {
  return useQuery<WeatherRiskAgentResponse>({
    queryKey: ['weather-risk-agent', lat, lon],
    queryFn: async () => {
      const params = lat && lon ? { lat, lon } : {};
      const response = await apiClient.get('/agents/weather-risk', { params });
      return response.data;
    },
    refetchInterval: 15000,
  });
}

export function useLocationSearch(query: string) {
  return useQuery<Array<{ name: string; lat: number; lon: number }>>({
    queryKey: ['location-search', query],
    queryFn: async () => {
      const response = await apiClient.get('/weather/locations', { params: { q: query } });
      return response.data;
    },
    enabled: true,
  });
}

const DEFAULT_HISTORY_7D = [
  { label: 'Mon', humidity: 88, temp: 24.2 },
  { label: 'Tue', humidity: 92, temp: 23.8 },
  { label: 'Wed', humidity: 85, temp: 25.1 },
  { label: 'Thu', humidity: 96, temp: 22.9 },
  { label: 'Fri', humidity: 90, temp: 24.0 },
  { label: 'Sat', humidity: 94, temp: 23.5 },
  { label: 'Sun', humidity: 89, temp: 24.8 },
];

export function useWeatherHistory(period: string, lat?: number, lon?: number) {
  return useQuery<Array<{ label: string; humidity: number; temp: number }>>({
    queryKey: ['weather-history', period, lat, lon],
    queryFn: async () => {
      try {
        const params = { period, ...(lat && lon ? { lat, lon } : {}) };
        const response = await apiClient.get('/weather/history', { params });
        if (Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        }
        return DEFAULT_HISTORY_7D;
      } catch (err) {
        return DEFAULT_HISTORY_7D;
      }
    },
    initialData: DEFAULT_HISTORY_7D,
    refetchInterval: 30000,
  });
}
