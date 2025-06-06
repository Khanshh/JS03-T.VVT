
const readline = require('readline');


function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Nhập số nguyên n: ", function(input) {
    const n = parseInt(input);
    if (!isNaN(n) && n >= 0) {
        console.log(`Số Fibonacci thứ ${n} là: ${fibonacci(n)}`);
    } else {
        console.log("Vui lòng nhập một số nguyên không âm.");
    }
    rl.close();
});
