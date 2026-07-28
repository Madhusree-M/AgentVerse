from fastapi import FastAPI
from routes import api

app = FastAPI(title="Weather Agent")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "weather-agent"}
