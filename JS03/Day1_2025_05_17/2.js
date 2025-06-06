function tichgiaithua(n) {
	if (n < 0) {
		return "Ko hop le";
	}
	let giaithua = 1;
	for (let i = 2; i<= n; i++) {
		giaithua *= i;
	}
	return giaithua;
}
