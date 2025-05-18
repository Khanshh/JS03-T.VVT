const readline = require('readline');

function laNamNhuan(nam) {
    return (nam % 4 === 0 && nam % 100 !== 0) || (nam % 400 === 0);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Nhập một năm: ", function(input) {
    const nam = parseInt(input);
    if (!isNaN(nam)) {
        if (laNamNhuan(nam)) {
            console.log(nam + " là năm nhuận.");
        } else {
            console.log(nam + " không phải là năm nhuận.");
        }
    } else {
        console.log("Vui lòng nhập một số hợp lệ.");
    }
    rl.close();
});
