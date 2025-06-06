function tongsole(n) {
	let tong = 0;
	for (let i = 1; i<n; i += 2){
		tong += i;
	}
	return tong;
}

console.log(tongsole(10)); 

//neu ko sai thi kha nang la dap an ra 25 (1+3+5+7+9)