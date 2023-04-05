// Initial Variables for the events
let operator = '';
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let mustResetScreen = false;

// Grab elements from the DOM, pass them to constant variables
const numberButtons = document.querySelectorAll('.btn');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const evaluateButton = document.getElementById('evaluate');
const lastOperationScreen = document.getElementById('previousScreen');
const currentOperationScreen = document.getElementById('mainScreen');
const operatorScreen = document.getElementById('operatorScreen');
const deleteButton = document.getElementById('delete');
const decimalButton = document.getElementById('decimal');

// Events that happen on each button click
numberButtons.forEach((button) => button.addEventListener('click', () => addNumberToScreen(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener('click', () => setOperator(button.textContent)));
evaluateButton.addEventListener('click', () => determineOperation(operator, true));
clearButton.addEventListener('click', () => resetAllParameters());
deleteButton.addEventListener('click', () => removeNumberFromScreen());
decimalButton.addEventListener('click', () => checkDecimal());

// Resets to initial state, with no variable values and empty strings.
function resetAllParameters() {
  currentOperation = null;
  operator = '';
  mainScreen.textContent = '';
  previousScreen.textContent = '';
  operatorScreen.textContent = '';
}

// Removes the last number from the screen
function removeNumberFromScreen() {
  const { length } = currentOperationScreen.textContent;
  const newString = currentOperationScreen.textContent.slice(0, length - 1);
  return (currentOperationScreen.textContent = newString);
}

// Adds/Appends the number chosen to the screen.
function addNumberToScreen(number) {
  if (currentOperationScreen.textContent === 'ERR') {
    previousScreen.textContent = '';
    currentOperation = null;
    operator = '';
  }

  if (currentOperationScreen.textContent === '0' || mustResetScreen) {
    resetScreen();
  }

  currentOperationScreen.textContent += number;
}

function checkDecimal() {
  const checkerScreen = currentOperationScreen.textContent;
  for (const c of checkerScreen) {
    if (c === '.') {
      return;
    }
  }
  addNumberToScreen('.');
}

// Sets the Operator value globally
function setOperator(op) {
  return (operator = op) && determineOperation(operator, false);
}

// Determines how to handle the operation, and passes on the equivalent values.
// Also stores the currentOperation
function determineOperation(op, equal) {
  if (currentOperation !== ('' || null)) {
    evaluate(op);
  }

  if (equal === true) {
    updateLastOperationScreen('=');
  } else {
    updateLastOperationScreen(op);
  }
  storeOperand();
  currentOperation = `${firstOperand}`;
}

// Stores the 1st Operand
function storeOperand() {
  firstOperand = currentOperationScreen.textContent;
}

// Updates the Operator screen and the Previous Operation Screen
function updateLastOperationScreen(op) {
  if (op == '=') {
    lastOperationScreen.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    operatorScreen.textContent = op;
  } else {
    lastOperationScreen.textContent = currentOperationScreen.textContent;
    operatorScreen.textContent = operator;
  }
  mustResetScreen = true;
}

// Resets the mainScreen content
function resetScreen() {
  mainScreen.textContent = '';
  mustResetScreen = false;
}

// Evaluater function
// Evaluates what to do once an operator is chosen.
function evaluate(operator) {
  if (currentOperation === null || mustResetScreen) {
    return;
  }

  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = `${operate(
    firstOperand,
    operator,
    secondOperand,
  )}`;
  previousScreen.textContent = currentOperationScreen.textContent;
}

// Main operation function.
// Receives the full parameters and return the value depending on the operation.
function operate(firstOperand, operator, secondOperand) {
  a = Number(firstOperand);
  b = Number(secondOperand);
  if (operator === '+') {
    return add(a, b);
  } if (operator === '-') {
    return subtract(a, b);
  } if (operator === 'x') {
    return multiply(a, b);
  } if (operator === '/') {
    if (b === 0 || null || undefined) return 'ERR';
    return divide(a, b).toFixed(5);
  } return 'ERR';
}

// Smaller Operations
const add = function (a, b) {
  return a + b;
};
const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  return a / b;
};

// Keystroke Functions
// Registers keystrokes accordingly to each button

document.addEventListener('keydown', (e) => {
  numberButtons.forEach((button) => {
    if (e.key === button.textContent) {
      addNumberToScreen(button.textContent);
    }
  });
});

document.addEventListener('keydown', (e) => {
  operatorButtons.forEach((button) => {
    if (e.key === button.textContent) {
      setOperator(button.textContent);
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === '*') {
    setOperator('x');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    resetAllParameters();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    removeNumberFromScreen();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === '.') {
    checkDecimal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === '=' || e.key === 'Enter') {
    determineOperation(operator, true);
  }
});
