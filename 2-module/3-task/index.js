let calculator = {
  read(n, m) {
    this.a = n;
    this.b = m;
  },
  sum() {
    return this.a + this.b;
  },
  mul (n, m) {
    return this.a * this.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
