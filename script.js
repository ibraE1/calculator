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
    button.addEventListener("touchmove", (e) => {
      e.preventDefault();
      e.target.click();
    });
    button.addEventListener("click", () =>
      buttonController.pressButton(button)
    );
  });

  const getDisplay = () => expression.textContent;

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
    const sliced = expression.textContent.slice(-1);
    updateDisplay(expression.textContent.slice(0, -1));
    return sliced;
  };

  updateDisplay();

  return {
    getDisplay,
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
        let lastCharacter = displayController.deleteCharacter();
        switch (lastCharacter) {
          case "+":
          case "-":
          case "x":
          case "÷":
            operator = "";
            break;
          default:
            if (operator) {
              secondOperand = secondOperand.slice(0, -1);
            } else {
              firstOperand = firstOperand.slice(0, -1);
            }
        }
        break;
      case "equal":
        if (secondOperand) operate(firstOperand, secondOperand, operator);
        else {
          solution = firstOperand;
          displayController.updateDisplay(solution);
        }
        break;
      case "dot":
        if (displayController.getDisplay().length > 17) break;
        if (displayController.getDisplay().includes(".")) {
          if (
            ["+", "-", "x", "÷"].some((operator) =>
              displayController.getDisplay().includes(operator)
            )
          ) {
            if (
              displayController
                .getDisplay()
                .substring(displayController.getDisplay().indexOf(operator) + 1)
                .includes(".")
            ) {
              break;
            }
          } else break;
        }
      default:
        if (displayController.getDisplay().length > 17) break;
        if (button.className == "operator") {
          if (secondOperand) {
            operate(firstOperand, secondOperand, operator);
            firstOperand = "" + solution;
            secondOperand = "";
          }
          operator = button.textContent;
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
      case "÷":
        solution = calculator.divide(firstOperand, secondOperand);
        break;
      case "x":
        solution = calculator.multiply(firstOperand, secondOperand);
        break;
    }

    if (solution.toString().length >= 18)
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
