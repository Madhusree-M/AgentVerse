from fastapi import FastAPI
from routes import api

app = FastAPI(title="Resource Agent")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "resource-agent"}
