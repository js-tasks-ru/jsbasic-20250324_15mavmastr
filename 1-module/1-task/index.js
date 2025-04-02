function factorial(n) {
  if (n === 0 || n === 1) {return 1;}
  for (i = n - 1; i >= 1; i--) {
    n *= i;
  }
  return n;
}