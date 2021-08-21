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

let operator = "";
let num1 = 0;
let num2 = 0;

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    input.textContent += button.textContent;
    if (num1 == 0) {
      num1 = parseInt(num1+button.textContent);
    } else {
      num2 = parseInt(num2+button.textContent);
    }
  })
);

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => (input.textContent = ""));

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    operator = button.textContent;
    input.textContent += button.textContent;
  })
);

const equalButton = document.querySelector("#equal");

equalButton.addEventListener("click", () => {
  input.textContent = operate(operator, num1, num2);
  num1 = 0;
  num2 = 0;
});
