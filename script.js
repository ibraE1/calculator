let operator = "";
let firstOperand = 0;
let secondOperand = 0;
let autoClear = false;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) return "🤡";
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function clearScreen() {
  input.textContent = "";
  operator = "";
  firstOperand = 0;
  secondOperand = 0;
}

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (autoClear) {
      clearScreen();
      autoClear = false;
    }
    input.textContent += button.textContent;
    if (operator == "") {
      firstOperand = parseInt(firstOperand + button.textContent);
    } else {
      secondOperand = parseInt(secondOperand + button.textContent);
    }
  })
);

clearButton.addEventListener("click", clearScreen);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    operator = button.textContent;
    input.textContent += button.textContent;
  })
);

equalButton.addEventListener("click", () => {
  input.textContent = operate(operator, firstOperand, secondOperand);
  operator = 0;
  firstOperand = 0;
  secondOperand = 0;
  autoClear = true;
});
