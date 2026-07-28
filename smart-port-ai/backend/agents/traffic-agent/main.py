from fastapi import FastAPI
from routes import api

app = FastAPI(title="Traffic Agent")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "traffic-agent"}
