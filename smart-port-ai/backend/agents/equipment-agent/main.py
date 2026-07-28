from fastapi import FastAPI
from routes import api

app = FastAPI(title="Equipment Agent")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "equipment-agent"}
