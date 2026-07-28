import { useState, useEffect, useRef } from 'react';

export interface SwarmState {
  totalAgents: number;
  onlineAgents: number;
  offlineAgents: number;
  totalMessages: number;
  systemHealth: string;
  lastUpdated: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: string;
  lastHeartbeat: string;
  messagesSent: number;
  messagesReceived: number;
  latency: string;
  lastTask: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
}

export function useSwarm() {
  const [state, setState] = useState<SwarmState | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [liveWeather, setLiveWeather] = useState<any>(null);
  const [liveDisease, setLiveDisease] = useState<any>(null);
  const ws = useRef<WebSocket | null>(null);

  const fetchLiveWeather = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/weather/live');
      const data = await res.json();
      if (data && data.cached) {
        setLiveWeather(data);
      }
    } catch (e) {
      console.error("Failed to fetch live weather", e);
    }
  };

  const fetchLiveDisease = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/disease/live');
      const data = await res.json();
      if (data && data.cached) {
        setLiveDisease(data);
      }
    } catch (e) {
      console.error("Failed to fetch live disease", e);
    }
  };

  useEffect(() => {
    // Connect to websocket
    const connectWs = () => {
      // The backend router is mounted at /api/swarm and the websocket endpoint is /ws
      ws.current = new WebSocket('ws://localhost:8000/api/swarm/ws');

      ws.current.onopen = () => {
        setIsConnected(true);
        fetchLiveWeather();
        fetchLiveDisease();
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        // Reconnect after 3 seconds
        setTimeout(connectWs, 3000);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'INITIAL_STATE' || data.type === 'SWARM_UPDATE') {
            setState(data.state);
            setAgents(data.agents);
            setLogs(data.logs);
            
            // Check if there's a weather agent update in logs or just fetch periodically
            // For simplicity, we can fetch it when we get a swarm update
            fetchLiveWeather();
            fetchLiveDisease();
          }
        } catch (error) {
          console.error("Error parsing websocket message:", error);
        }
      };
    };

    connectWs();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return { state, agents, logs, isConnected, liveWeather, liveDisease };
}
