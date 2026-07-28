import os
import textwrap

PROJECT_NAME = "smart-port-ai"

# Define the structure
directories = [
    "frontend/src/components/layout",
    "frontend/src/components/shared",
    "frontend/src/pages",
    "frontend/src/services",
    "frontend/src/utils",
    "frontend/src/context",
    "frontend/src/assets",
    
    "backend/shared/models",
    "backend/api-gateway/routes",
    "backend/api-gateway/services",
    "backend/api-gateway/core",
    "backend/common",
    
    "datasets",
    "docs",
    "database/migrations",
    "database/seed_data",
    "database/sql",
    "docker",
    "scripts",
    "tests/integration",
    "tests/e2e",
]

agents = [
    "vessel-agent",
    "cargo-agent",
    "traffic-agent",
    "customs-agent",
    "equipment-agent",
    "security-agent",
    "weather-agent",
    "resource-agent"
]

for agent in agents:
    directories.extend([
        f"backend/agents/{agent}/routes",
        f"backend/agents/{agent}/services",
        f"backend/agents/{agent}/models",
        f"backend/agents/{agent}/schemas",
        f"backend/agents/{agent}/utils",
        f"backend/agents/{agent}/tests"
    ])

def create_file(path, content=""):
    full_path = os.path.join(PROJECT_NAME, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

def main():
    if not os.path.exists(PROJECT_NAME):
        os.makedirs(PROJECT_NAME)
        
    for d in directories:
        os.makedirs(os.path.join(PROJECT_NAME, d), exist_ok=True)

    # ---------------------------------------------------------
    # ROOT FILES
    # ---------------------------------------------------------
    create_file(".env.example", """
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=postgres
        POSTGRES_DB=smartportdb
        POSTGRES_HOST=postgres
        POSTGRES_PORT=5432
        
        KAFKA_BROKER_URL=kafka:9092
        REDIS_URL=redis://redis:6379/0
        
        JWT_SECRET_KEY=supersecretkey
        JWT_ALGORITHM=HS256
    """)
    
    create_file("README.md", """
        # Smart Port Management System
        
        A microservices-based Multi-Agent AI architecture for port management.
    """)
    
    create_file("docker-compose.yml", """
        version: '3.8'
        
        services:
          postgres:
            image: postgres:15
            environment:
              POSTGRES_USER: postgres
              POSTGRES_PASSWORD: postgres
              POSTGRES_DB: smartportdb
            ports:
              - "5432:5432"
              
          redis:
            image: redis:7
            ports:
              - "6379:6379"
              
          zookeeper:
            image: confluentinc/cp-zookeeper:latest
            environment:
              ZOOKEEPER_CLIENT_PORT: 2181
              ZOOKEEPER_TICK_TIME: 2000
              
          kafka:
            image: confluentinc/cp-kafka:latest
            depends_on:
              - zookeeper
            ports:
              - "9092:9092"
            environment:
              KAFKA_BROKER_ID: 1
              KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
              KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
              KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    """)

    # ---------------------------------------------------------
    # BACKEND SHARED
    # ---------------------------------------------------------
    create_file("backend/shared/database.py", """
        # Database connection using SQLAlchemy
        from sqlalchemy import create_engine
        from sqlalchemy.ext.declarative import declarative_base
        from sqlalchemy.orm import sessionmaker
        
        # Boilerplate connection
    """)
    create_file("backend/shared/auth.py", "# JWT authentication utilities")
    create_file("backend/shared/kafka.py", "# Kafka producer/consumer utilities")
    create_file("backend/shared/logging.py", "# Logging configuration")
    create_file("backend/shared/config.py", "# Shared configuration settings")
    create_file("backend/shared/utils.py", "# Common utilities")
    create_file("backend/shared/exceptions.py", "# Exception handlers")
    create_file("backend/shared/models/__init__.py", "# Shared models")

    # ---------------------------------------------------------
    # BACKEND AGENTS
    # ---------------------------------------------------------
    for agent in agents:
        base = f"backend/agents/{agent}"
        
        create_file(f"{base}/main.py", f"""
            from fastapi import FastAPI
            from routes import api
            
            app = FastAPI(title="{agent.replace('-', ' ').title()}")
            
            @app.get("/")
            def read_root():
                return {{"status": "ok", "service": "{agent}"}}
        """)
        
        create_file(f"{base}/config.py", "# Agent specific configuration")
        create_file(f"{base}/requirements.txt", "fastapi\nuvicorn\nsqlalchemy\npydantic\nkafka-python\nredis\n")
        
        # Init files for modules
        create_file(f"{base}/routes/__init__.py", "")
        create_file(f"{base}/services/__init__.py", "")
        create_file(f"{base}/models/__init__.py", "")
        create_file(f"{base}/schemas/__init__.py", "")
        create_file(f"{base}/utils/__init__.py", "")
        create_file(f"{base}/tests/__init__.py", "")

    # ---------------------------------------------------------
    # FRONTEND
    # ---------------------------------------------------------
    create_file("frontend/package.json", """
        {
          "name": "smart-port-frontend",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
            "preview": "vite preview"
          },
          "dependencies": {
            "axios": "^1.4.0",
            "leaflet": "^1.9.4",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "react-router-dom": "^6.14.1"
          },
          "devDependencies": {
            "@types/react": "^18.2.15",
            "@types/react-dom": "^18.2.7",
            "autoprefixer": "^10.4.14",
            "postcss": "^8.4.26",
            "tailwindcss": "^3.3.3",
            "vite": "^4.4.5"
          }
        }
    """)
    create_file("frontend/vite.config.js", """
        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        
        export default defineConfig({
          plugins: [react()],
        })
    """)
    create_file("frontend/tailwind.config.js", """
        /** @type {import('tailwindcss').Config} */
        export default {
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        }
    """)
    create_file("frontend/postcss.config.js", """
        export default {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }
    """)
    create_file("frontend/index.html", """
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Smart Port Management System</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
          </body>
        </html>
    """)
    create_file("frontend/src/main.jsx", """
        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import App from './App.jsx'
        import './index.css'
        
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        )
    """)
    create_file("frontend/src/index.css", """
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    """)
    create_file("frontend/src/App.jsx", """
        import { BrowserRouter, Routes, Route } from 'react-router-dom';
        import Layout from './components/layout/Layout';
        
        function App() {
          return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<div>Dashboard</div>} />
                  {/* Routes go here */}
                </Route>
              </Routes>
            </BrowserRouter>
          )
        }
        export default App;
    """)
    
    # Example Pages
    frontend_pages = [
        "Login", "Dashboard", "VesselMonitoring", "CargoOperations", 
        "TruckYardManagement", "Customs", "EquipmentHealth", 
        "Security", "Weather", "ResourceOptimization", "Reports", "Settings"
    ]
    for page in frontend_pages:
        create_file(f"frontend/src/pages/{page}.jsx", f"export default function {page}() {{ return <div>{page}</div>; }}")

    # ---------------------------------------------------------
    # DATASETS
    # ---------------------------------------------------------
    datasets = ["ships.csv", "containers.csv", "trucks.csv", "weather.csv", "equipment.csv", "customs.csv"]
    for ds in datasets:
        create_file(f"datasets/{ds}", "id,name\n1,sample\n")

    # ---------------------------------------------------------
    # DOCS
    # ---------------------------------------------------------
    docs = ["System_Architecture.md", "API_Documentation.md", "Database_Schema.md", "Agent_Communication_Flow.md", "Deployment_Guide.md"]
    for doc in docs:
        create_file(f"docs/{doc}", f"# {doc.replace('_', ' ').replace('.md', '')}")

    # ---------------------------------------------------------
    # SCRIPTS
    # ---------------------------------------------------------
    scripts = ["init_db.sh", "seed_data.sh", "start_services.sh", "stop_services.sh"]
    for script in scripts:
        create_file(f"scripts/{script}", "#!/bin/bash\n# Script placeholder")

    # ---------------------------------------------------------
    # DOCKERFILES
    # ---------------------------------------------------------
    create_file("docker/frontend.Dockerfile", """
        FROM node:18-alpine
        WORKDIR /app
        COPY package.json .
        RUN npm install
        COPY . .
        EXPOSE 5173
        CMD ["npm", "run", "dev", "--", "--host"]
    """)
    
    create_file("docker/backend.Dockerfile", """
        FROM python:3.10-slim
        WORKDIR /app
        COPY requirements.txt .
        RUN pip install -r requirements.txt
        COPY . .
        CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
    """)
    
    print("Project scaffolded successfully!")

if __name__ == "__main__":
    main()
