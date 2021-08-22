let currentOperator = "";
let firstOperand = 0;
let secondOperand = 0;
let displayValue = "";

const allButtons = document.querySelectorAll("button");
const display = document.querySelector("#input");

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

function updateScreen() {
  displayValue = displayValue.toString().replace("Infinity", "🤡");
  display.textContent = displayValue == "" ? "0" : displayValue;
}

function pressNumber(value) {
  if (displayValue == "🤡") clear();
  if (!currentOperator) firstOperand = Number(firstOperand + value);
  else secondOperand = Number(secondOperand + value);
  displayValue += value;
}

function pressOperator(value) {
  if (firstOperand || secondOperand) {
    pressEqual();
  }
  currentOperator = value == "÷" ? "/" : value == "X" ? "*" : value;
  displayValue += value;
}

function pressEqual() {
  if (currentOperator) {
    firstOperand = operate(currentOperator, firstOperand, secondOperand);
    secondOperand = 0;
    currentOperator = "";
    displayValue = firstOperand;
  } else {
    displayValue = firstOperand;
  }
}

function clear() {
  currentOperator = "";
  firstOperand = 0;
  secondOperand = 0;
  displayValue = "";
}

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id == "clear") {
      clear();
    } else if (button.id == "equal") {
      pressEqual();
    } else if (button.className == "operator") {
      pressOperator(button.textContent);
    } else {
      pressNumber(button.textContent);
    }
    updateScreen();
  });
});
