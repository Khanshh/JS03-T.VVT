from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as ai
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()

API_KEY = os.getenv("OPEN_API_KEY", "your_api_key_here")
ai.configure(api_key=API_KEY)
model = ai.GenerativeModel("gpt-4.1-nano")
chat = model.start_chat(history=[
    {"role": "user", "parts": ["Bạn là MoneyML Chatbot, một trợ lý AI thân thiện giúp quản lý tài chính cá nhân. Cung cấp lời khuyên tài chính chính xác, ngắn gọn bằng tiếng Việt hoặc tiếng Anh tùy theo câu hỏi của người dùng. Sử dụng giọng điệu chuyên nghiệp nhưng gần gũi."]},
    {"role": "model", "parts": ["Hiểu rồi! Tôi là MoneyML Chatbot, sẵn sàng hỗ trợ bạn về tài chính. Bạn cần giúp gì hôm nay?"]}
])

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "MoneyML Chatbot Backend đang chạy!"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        user_message = request.message.strip()
        if not user_message:
            raise HTTPException(status_code=400, detail="Không có tin nhắn được cung cấp")

        response = chat.send_message(user_message)
        bot_reply = response.text

        return {"reply": bot_reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))