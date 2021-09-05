const calculator = (() => {
  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  return { add, subtract, multiply, divide };
})();

const displayController = (() => {
  const display = document.querySelector("#display");
  const expression = document.createElement("h1");
  expression.id = "expression";
  expression.textContent = "";

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      buttonController.pressButton(button)
    );
  });

  const updateDisplay = (value) => {
    expression.textContent = value;
    display.appendChild(expression);
  };

  const clearDisplay = () => {
    updateDisplay("");
  };

  const addToDisplay = (button) => {
    updateDisplay((expression.textContent += button.textContent));
  };

  const deleteCharacter = () => {
    updateDisplay(expression.textContent.slice(0, -1));
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
        if (operator) operate(firstOperand, secondOperand, operator);
        else {
          solution = firstOperand;
          displayController.updateDisplay(solution);
        }
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

    if (solution.length >= 18)
      solution = Math.round(solution * 10 ** 17) / 10 ** 17;

    displayController.updateDisplay(solution);
  };

  return { pressButton };
})();

const keyboardController = (() => {
  document.addEventListener("keydown", (e) => {
    const pressedKey =
      e.key == "Enter"
        ? "="
        : e.key == "Backspace"
        ? "DEL"
        : e.key == "Escape"
        ? "AC"
        : e.key == "/"
        ? "÷"
        : e.key == "*"
        ? "x"
        : e.key;
    Array.from(document.querySelectorAll("button")).forEach((button) => {
      if (button.textContent == pressedKey) {
        buttonController.pressButton(button);
      }
    });
  });
})();
