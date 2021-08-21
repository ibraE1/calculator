let operator = "";
let firstOperand = 0;
let secondOperand = 0;

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

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    input.textContent += button.textContent;
    if (operator == "") {
      firstOperand = parseInt(firstOperand + button.textContent);
    } else {
      secondOperand = parseInt(secondOperand + button.textContent);
    }
  })
);

clearButton.addEventListener("click", () => {
  input.textContent = "";
  operator = "";
  firstOperand = 0;
  secondOperand = 0;
});

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    operator = button.textContent;
    input.textContent += button.textContent;
  })
);

equalButton.addEventListener("click", () => {
  input.textContent = operate(operator, firstOperand, secondOperand);
  firstOperand = 0;
  secondOperand = 0;
});
