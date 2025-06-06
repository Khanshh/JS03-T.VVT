function bangcuuchuong(n) {
	if (n < 2 || n > 9){
		console.log("Vui lòng nhap so (2-9)");
		return;
	}

	console.log("bang cuu chuong ${n}:");

	for (let i = 1; i <= 10; i++){
		console.log('${n} x ${i} = ${n * i}');
	}
}