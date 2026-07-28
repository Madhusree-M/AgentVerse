# 🌿 Cardamom Care

> **AI-Powered Multi-Agent System for Precision Cardamom Farming**

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-brightgreen)](https://nodejs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688)](https://fastapi.tiangolo.com/)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-orange)](https://pnpm.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4-38B2AC)](https://tailwindcss.com/)

---

## 🚀 Overview

**Cardamom Care** is a production-grade monorepo designed to empower precision cardamom agriculture using autonomous AI agent swarms and sensor intelligence. The platform combines real-time IoT soil and climate telemetry with AI multi-agent orchestration for irrigation recommendations, pest/disease detection, soil nutrient management, and yield forecasting.

---

## 🛠️ Technology Stack

### Frontend App (`apps/frontend`)
- **Core**: React 19, TypeScript, Vite, pnpm
- **Styling**: Tailwind CSS, shadcn/ui foundation
- **Routing & State**: React Router DOM, React Query (@tanstack/react-query)
- **Forms & Validation**: React Hook Form, Zod
- **Networking**: Axios
- **UI & Analytics**: Lucide Icons, Recharts

### Backend App (`apps/backend`)
- **Core**: Python 3.11, FastAPI, Uvicorn
- **Database & ORM**: PostgreSQL, SQLAlchemy 2.0, Alembic
- **AI & Analytics**: Scikit-Learn, Pandas, Agentverse multi-agent framework placeholder

### Workspace Shared (`packages/shared`)
- **Shared Contracts**: Reusable TypeScript types, constants, and API schemas shared across packages.

---

## 📁 Repository Structure

```
cardamom-care/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── apps/
│   ├── backend/
│   │   ├── alembic/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── core/
│   │   │   ├── db/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── main.py
│   │   ├── alembic.ini
│   │   ├── pyproject.toml
│   │   └── requirements.txt
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── lib/
│       │   ├── App.tsx
│       │   ├── index.css
│       │   └── main.tsx
│       ├── components.json
│       ├── index.html
│       ├── package.json
│       ├── tailwind.config.ts
│       └── vite.config.ts
├── docs/
│   ├── api-spec.md
│   └── architecture.md
├── packages/
│   └── shared/
│       ├── src/
│       │   ├── constants.ts
│       │   ├── index.ts
│       │   └── types.ts
│       ├── package.json
│       └── tsconfig.json
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: `>=18.0.0`
- **pnpm**: `>=8.0.0`
- **Python**: `>=3.10`
- **PostgreSQL**: `>=14`

### Installation

1. **Clone & Install Dependencies**
   ```bash
   cd cardamom-care
   pnpm install
   ```

2. **Backend Setup**
   ```bash
   cd apps/backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   cp .env.example .env
   ```

---

## 🏃 Running the Application

- **Run Frontend Dev Server**:
  ```bash
  pnpm dev:frontend
  ```
  App will be accessible at `http://localhost:3000`.

- **Run Backend Dev Server**:
  ```bash
  cd apps/backend
  source venv/bin/activate
  uvicorn app.main:app --reload --port 8000
  ```
  Swagger Docs will be available at `http://localhost:8000/docs`.

---

## 📄 License

Distributed under the MIT License.
