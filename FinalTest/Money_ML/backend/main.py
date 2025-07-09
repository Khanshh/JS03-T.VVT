import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Tải các biến môi trường từ file .env
load_dotenv()

# Khởi tạo FastAPI
app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8001",
        "http://127.0.0.1:8001",
        "http://localhost:8001/",
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khởi tạo client OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Định nghĩa mô hình dữ liệu cho yêu cầu
class ChatRequest(BaseModel):
    message: str

@app.options("/chat")
async def options_chat(request: Request):
    print("Nhận yêu cầu OPTIONS")
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
    print(f"Nhận yêu cầu POST: {request.message}")
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": "Bạn là MoneyML Chatbot, một trợ lý tài chính thông minh. Hãy trả lời các câu hỏi về quản lý tài chính cá nhân một cách ngắn gọn, chính xác và hữu ích bằng tiếng Việt."},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=250
        )
        reply = response.choices[0].message.content.strip()
        print(f"Phản hồi: {reply}")
        return {"reply": reply}
    except Exception as e:
        print(f"Lỗi: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Lỗi khi xử lý yêu cầu: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)