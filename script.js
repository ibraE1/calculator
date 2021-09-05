const calculator = (() => {
  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  return { add, subtract, multiply, divide };
})();

const displayController = (() => {
  const display = document.querySelector("#display");
  const input = document.createElement("h1");
  input.id = "input";
  input.textContent = "";

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      buttonController.pressButton(button)
    );
  });

  const updateDisplay = (value) => {
    input.textContent = value;
    display.appendChild(input);
  };

  const clearDisplay = () => {
    updateDisplay("");
  };

  const addToDisplay = (button) => {
    updateDisplay((input.textContent += button.textContent));
  };

  const deleteCharacter = () => {
    updateDisplay(input.textContent.slice(0, -1));
  };

  updateDisplay();

  return {
    updateDisplay,
    clearDisplay,
    addToDisplay,
    deleteCharacter,
  };
})();

const buttonController = (() => {
  let firstOperand = "";
  let secondOperand = "";
  let operator = "";
  let solution = "";

  const pressButton = (button) => {
    switch (button.id) {
      case "clear":
        displayController.clearDisplay();
        firstOperand = "";
        secondOperand = "";
        operator = "";
        solution = "";
        break;
      case "delete":
        displayController.deleteCharacter();
        break;
      case "equal":
        operate(firstOperand, secondOperand, operator);
        break;
      default:
        if (button.className == "operator") {
          if (secondOperand) {
            operate(firstOperand, secondOperand, operator);
            firstOperand = "" + solution;
            secondOperand = "";
          }
          operator =
            button.textContent == "÷"
              ? "/"
              : button.textContent == "x"
              ? "*"
              : button.textContent;
        } else {
          if (operator) {
            secondOperand += button.textContent;
          } else {
            firstOperand += button.textContent;
          }
        }
        displayController.addToDisplay(button);
    }
  };

  const operate = (firstOperand, secondOperand, operator) => {
    displayController.clearDisplay();
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);

    switch (operator) {
      case "+":
        solution = calculator.add(firstOperand, secondOperand);
        break;
      case "-":
        solution = calculator.subtract(firstOperand, secondOperand);
        break;
      case "/":
        solution = calculator.divide(firstOperand, secondOperand);
        break;
      case "*":
        solution = calculator.multiply(firstOperand, secondOperand);
        break;
    }

    displayController.updateDisplay(solution.toFixed(17));
  };

  return { pressButton };
})();
