from fastapi import FastAPI
from routes import api

app = FastAPI(title="Cargo Agent")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "cargo-agent"}
