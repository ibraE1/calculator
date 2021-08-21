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

const display = document.querySelector("#display");

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => button.addEventListener("click", () => {
    const input = document.createElement("h1");
    input.textContent += button.textContent;
    input.classList.add("input");
    display.appendChild(input);
}));
