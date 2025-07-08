function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.classList.toggle('active');
}

function typeWriter(text, targetElement, chatbotBody, speed = 20) {
  let i = 0;
  function write() {
    if (i < text.length) {
      targetElement.textContent += text.charAt(i);
      i++;
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
      setTimeout(write, speed);
    }
  }
  write();
}

async function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  if (!message) return;
  input.value = '';

  const chatbotBody = document.getElementById('chatbot-body');

  // Hiển thị tin nhắn người dùng
  const userMessage = document.createElement('div');
  userMessage.className = 'chatbot-message user';
  userMessage.textContent = message;
  chatbotBody.appendChild(userMessage);

  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();
    if (data.detail) {
      throw new Error(data.detail);
    }

    const botMessage = document.createElement('div');
    botMessage.className = 'chatbot-message bot';
    chatbotBody.appendChild(botMessage);

    typeWriter(data.reply, botMessage, chatbotBody);

  } catch (error) {
    const botMessage = document.createElement('div');
    botMessage.className = 'chatbot-message bot';
    chatbotBody.appendChild(botMessage);

    const errorText = 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!';
    typeWriter(errorText, botMessage, chatbotBody);
  }
}

document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
