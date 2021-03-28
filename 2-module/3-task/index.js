let calculator = {
  // ваш код
  firstNumber: null, 
  secondNumber: null,
  read (a, b) {
    this.firstNumber = a;
    this.secondNumber = b;
  },
  sum () {
    return this.firstNumber + this.secondNumber;
  },
  mul () {
    return this.firstNumber * this.secondNumber;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
