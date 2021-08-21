let operator = "";
let firstOperand = 0;
let secondOperand = 0;
let result = 0;
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

function clear() {
  input.textContent = "0";
  operator = "";
  firstOperand = 0;
  secondOperand = 0;
  result = 0;
  autoClear = false;
}

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (autoClear && !operator) {
      clear();
      autoClear = false;
    }
    if (input.textContent == "0") {
      input.textContent = button.textContent;
    } else {
      input.textContent += button.textContent;
    }
    if (!operator) {
      firstOperand = Number(firstOperand + button.textContent);
    } else {
      secondOperand = Number(secondOperand + button.textContent);
    }
  })
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (input.textContent == "🤡") input.textContent = "0";
    if (!firstOperand && !secondOperand) {
      firstOperand = result;
    }
    operator = button.textContent;
    input.textContent += button.textContent;
  })
);

equalButton.addEventListener("click", () => {
  if (operator == "") {
    result = Number(input.textContent);
  } else {
    result = operate(operator, firstOperand, secondOperand);
  }
  if (result == Infinity) {
    input.textContent = "🤡";
    result = 0;
  } else {
    input.textContent = result;
  }
  operator = "";
  firstOperand = 0;
  secondOperand = 0;
  autoClear = true;
});

clearButton.addEventListener("click", clear);
