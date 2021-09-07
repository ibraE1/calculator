const calculator = (() => {
  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  const evaluateExpression = (expression) => {
    let operator = ["+", "-", "x", "÷"].find((sign) =>
      expression.includes(sign)
    );
    let firstOperand = Number(
      expression.substring(0, expression.indexOf(operator))
    );
    let secondOperand = Number(
      expression.substring(expression.indexOf(operator) + 1)
    );

    if (!operator) return expression;
    if (expression.substring(expression.length - 1) == operator)
      return expression.slice(0, -1);
    return operate(firstOperand, secondOperand, operator);
  };

  const operate = (firstOperand, secondOperand, operator) => {
    let solution;

    switch (operator) {
      case "+":
        solution = add(firstOperand, secondOperand);
        break;
      case "-":
        solution = subtract(firstOperand, secondOperand);
        break;
      case "÷":
        solution = divide(firstOperand, secondOperand);
        break;
      case "x":
        solution = multiply(firstOperand, secondOperand);
        break;
    }

    return solution;
  };

  return { evaluateExpression };
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
    updateDisplay(expression.textContent.slice(0, -1));
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
  const checkDots = () => {
    const expression = displayController.getDisplay();
    const containsOperator = ["+", "-", "x", "÷"].some((sign) =>
      expression.includes(sign)
    );
    const operatorIndex = ["+", "-", "x", "÷"].findIndex((sign) =>
      expression.includes(sign)
    );
    const secondOperand = expression.substring(operatorIndex + 1);
    if (expression.indexOf(".") != expression.lastIndexOf(".")) return true;
    if (containsOperator && secondOperand.includes(".")) return true;
    if (!containsOperator && expression.includes(".")) return true;

    return false;
  };

  const pressButton = (button) => {
    switch (button.id) {
      case "clear":
        displayController.clearDisplay();
        break;
      case "delete":
        displayController.deleteCharacter();
        break;
      case "equal":
        displayController.updateDisplay(
          calculator.evaluateExpression(displayController.getDisplay())
        );
        break;
      case "dot":
        if (checkDots()) break;
      default:
        if (displayController.getDisplay().length > 17) break;
        if (button.className == "operator") {
          if (
            ["+", "-", "x", "÷"].some((sign) =>
              displayController.getDisplay().includes(sign)
            )
          )
            displayController.updateDisplay(
              calculator.evaluateExpression(displayController.getDisplay())
            );
        }
        displayController.addToDisplay(button);
    }
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
