# Cardamom Care - System Architecture

## Overview

Cardamom Care is a multi-agent AI system designed for precision cardamom farming. It integrates IoT sensor streams, soil health analytics, automated pest/disease diagnosis, and predictive yield models.

```mermaid
graph TD
    A[Sensors & IoT Streams] -->|HTTP / Telemetry| B[FastAPI Backend]
    B --> C[PostgreSQL + SQLAlchemy]
    B --> D[Agentverse Swarm Coordinator]
    
    subgraph Multi-Agent Swarm
        D --> E[Irrigation Agent]
        D --> F[Disease & Pest Agent]
        D --> G[Soil Health & NPK Agent]
        D --> H[Yield Prediction Agent]
    end
    
    H -->|Scikit-Learn Models| B
    B -->|REST API| I[React 19 Frontend Dashboard]
```

## Core Components

1. **Frontend (`apps/frontend`)**: Built with React 19, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Provides real-time dashboard visualizations with Recharts.
2. **Backend (`apps/backend`)**: Built with Python FastAPI, SQLAlchemy, Alembic, and PostgreSQL. Handles API routing, database sessions, and background AI tasks.
3. **AI Swarm (`Agentverse`)**: Multi-agent coordination layer executing autonomous agents for irrigation triggers, disease detection, and yield prediction via Scikit-learn models.
4. **Shared Workspace (`packages/shared`)**: Common TypeScript types, constants, and data contract definitions.
