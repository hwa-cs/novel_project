from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from content import content_generate
from title import predict
from image import image_sd

# uvicorn main:app --reload --host=192.168.3.23 --port=5000
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class Input(BaseModel):
    passage: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/title")
async def title_generate(input_: Input):
    text = input_.passage    
    text = "\n" + text
    prediction = predict(text)
    return {"title": prediction}

@app.post("/image")
async def image_generate(input_: Input):
    text = input_.passage
    image = image_sd(text)
    
        
    return {"image":image}

@app.post("/content")
async def content_generate(input_: Input):
    text = input_.passage
    content = content_generate(text)
    return {"content": content}
