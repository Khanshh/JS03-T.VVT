function veTamGiac(n) {
  for (let i = 1; i <= n; i++) {
    let dong = "";
    for (let j = 1; j <= i; j++) {
      dong += "*";
    }
    console.log(dong);
  }
}

veTamGiac(3);