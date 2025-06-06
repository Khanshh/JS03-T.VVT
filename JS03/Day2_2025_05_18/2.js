const readline = require('readline');

function daoNguocChuoi(str) {
    let ketQua = "";
    for (let i = str.length - 1; i >= 0; i--) {
        ketQua += str[i];
    }
    return ketQua;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Nhập chuỗi cần đảo ngược: ", function(input) {
    const ketQua = daoNguocChuoi(input);
    console.log("Chuỗi sau khi đảo ngược là:", ketQua);
    rl.close();
});
