function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.classList.toggle('active');
}

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  if (!message) return;

  const chatbotBody = document.getElementById('chatbot-body');
  const userMessage = document.createElement('div');
  userMessage.className = 'chatbot-message user';
  userMessage.textContent = message;
  chatbotBody.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.className = 'chatbot-message bot';
  botMessage.textContent = 'Cảm ơn câu hỏi của bạn! Hiện tại tôi đang học cách trả lời tốt hơn. 😊';
  chatbotBody.appendChild(botMessage);

  chatbotBody.scrollTop = chatbotBody.scrollHeight;
  input.value = '';
}

document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});