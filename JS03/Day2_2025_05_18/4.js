const readline = require('readline');

function kiemTraMatKhau(matkhau) {
    if (matkhau.length < 8) return false;
    if (!/[A-Z]/.test(matkhau)) return false;
    if (!/[a-z]/.test(matkhau)) return false;
    if (!/\d/.test(matkhau)) return false;
    return true;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Nhập mật khẩu cần kiểm tra: ", function(input) {
    if (kiemTraMatKhau(input)) {
        console.log("Mật khẩu mạnh ");
    } else {
        console.log("Mật khẩu yếu (Phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số)");
    }
    rl.close();
});
