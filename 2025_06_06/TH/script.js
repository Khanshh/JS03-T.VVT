// Giả lập tài khoản
const VALID_USER = 'admin';
const VALID_PASS = '123';

// Hàm xử lý login
function login(event) {
  event.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === VALID_USER && pass === VALID_PASS) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'admin.html';
  } else {
    document.getElementById('error').innerText = 'Thông tin không đúng!';
  }
}

// Kiểm tra trạng thái login ở admin.html
function checkLogin() {
  if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
}

// Hàm logout
function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// Nếu đã login mà cố vào login.html thì redirect về admin.html
if (window.location.pathname.endsWith('login.html') && localStorage.getItem('loggedIn') === 'true') {
  window.location.href = 'admin.html';
}
