# Cardamom Care - API Specification

## Base URL
`/api/v1`

## Endpoints

### 1. System Health
- **GET** `/health`
- **Response**: `{"status": "healthy", "service": "Cardamom Care API", "version": "0.1.0"}`

### 2. Multi-Agent Status
- **GET** `/agents/status`
- **Response**: Details on active Agentverse agents (Irrigation, Disease Detection, Soil Health, Yield Predictor).
