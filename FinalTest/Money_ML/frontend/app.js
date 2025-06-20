    function toggleChatbot() {
      const chatbot = document.getElementById('chatbot');
      chatbot.classList.toggle('active');
    }

    async function sendMessage() {
      const input = document.getElementById('chatbot-input');
      const message = input.value.trim();
      if (!message) return;

      const chatbotBody = document.getElementById('chatbot-body');

      // Hiển thị tin nhắn người dùng
      const userMessage = document.createElement('div');
      userMessage.className = 'chatbot-message user';
      userMessage.textContent = message;
      chatbotBody.appendChild(userMessage);

      try {
        // Gửi tin nhắn tới backend FastAPI
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

        // Hiển thị phản hồi từ bot
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        botMessage.textContent = data.reply;
        chatbotBody.appendChild(botMessage);
      } catch (error) {
        // Hiển thị thông báo lỗi
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        botMessage.textContent = 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!';
        chatbotBody.appendChild(botMessage);
      }

      // Cuộn xuống dưới và xóa input
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
      input.value = '';
    }

    document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });