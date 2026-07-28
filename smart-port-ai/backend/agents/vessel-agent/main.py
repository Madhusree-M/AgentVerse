from fastapi import FastAPI
from routes import api

app = FastAPI(title="Vessel Agent")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "vessel-agent"}
