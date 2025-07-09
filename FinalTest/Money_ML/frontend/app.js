function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  if (!chatbot) {
    console.error('Không tìm thấy phần tử chatbot!');
    return;
  }
  chatbot.classList.toggle('active');
}

// Hàm định dạng tin nhắn
function formatMessage(text) {
  // Thêm <br> trước mỗi mục bắt đầu bằng số (1., 2., v.v.)
  return text.replace(/(\d+\.\s)/g, '<br>$1');
}

function typeWriter(text, targetElement, chatbotBody, speed = 20) {
  if (!text || !targetElement || !chatbotBody) {
    console.error('Thiếu tham số trong typeWriter!');
    return;
  }
  let i = 0;
  targetElement.innerHTML = ''; // Xóa nội dung cũ, dùng innerHTML để hỗ trợ HTML
  function write() {
    if (i < text.length) {
      targetElement.innerHTML = text.substr(0, i + 1); // Dùng innerHTML để render <br>
      i++;
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
      setTimeout(write, speed);
    }
  }
  write();
}

async function sendMessage() {
  const input = document.getElementById('chatbot-input');
  if (!input) {
    console.error('Không tìm thấy chatbot-input!');
    return;
  }
  const message = input.value.trim();
  if (!message) {
    alert('Vui lòng nhập tin nhắn!');
    return;
  }
  input.value = '';

  const chatbotBody = document.getElementById('chatbot-body');
  if (!chatbotBody) {
    console.error('Không tìm thấy chatbot-body!');
    return;
  }

  // Hiển thị tin nhắn người dùng
  const userMessage = document.createElement('div');
  userMessage.className = 'chatbot-message user';
  userMessage.textContent = message; // Dùng textContent cho tin nhắn người dùng để tránh XSS
  chatbotBody.appendChild(userMessage);
  chatbotBody.scrollTop = chatbotBody.scrollHeight; // Cuộn xuống sau tin nhắn người dùng

  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();
    if (data.detail) {
      throw new Error(data.detail);
    }

    const botMessage = document.createElement('div');
    botMessage.className = 'chatbot-message bot';
    chatbotBody.appendChild(botMessage);

    // Định dạng tin nhắn trước khi hiển thị
    const formattedReply = formatMessage(data.reply);
    typeWriter(formattedReply, botMessage, chatbotBody);

  } catch (error) {
    const botMessage = document.createElement('div');
    botMessage.className = 'chatbot-message bot';
    chatbotBody.appendChild(botMessage);

    const errorText = 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!';
    typeWriter(errorText, botMessage, chatbotBody);
  }
}

const input = document.getElementById('chatbot-input');
if (input) {
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
} else {
  console.error('Không tìm thấy phần tử chatbot-input!');
}