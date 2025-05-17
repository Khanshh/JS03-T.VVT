function tongChuSo(n) {
  if (n < 0) return "Vui lòng nhập số nguyên dương";

  let tong = 0;
  while (n > 0) {
    tong += n % 10;     
    n = Math.floor(n / 10); 
  }
  return tong;
}

console.log(tongChuSo(1234));
