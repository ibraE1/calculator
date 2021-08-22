let currentOperator = null;
let firstOperand = null;
let secondOperand = null;
let result = null;
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
  display.textContent = displayValue;
}

function pressNumber(value) {
  if (!currentOperator) firstOperand = Number(value);
  else secondOperand = Number(value);
  displayValue += value;
}

function pressOperator(value) {
  if (firstOperand) pressEqual();
  if (result) firstOperand = result;
  currentOperator = value;
  displayValue += value;
}

function pressEqual() {
  if (currentOperator) {
    result = operate(currentOperator, firstOperand, secondOperand);
    displayValue = result;
  } else {
    displayValue = firstOperand;
  }
}

function clear() {
  currentOperator = null;
  firstOperand = null;
  secondOperand = null;
  result = null;
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
