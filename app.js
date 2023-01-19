const numericalDisplay = document.querySelector('#numerical-display');
const calculationDisplay = document.querySelector('#calculation-display');
const numBtnEl = [...document.querySelectorAll('.num-btn')];
const opBtnEl = [...document.querySelectorAll('.op-btn')];
const eqBtnEl = document.querySelector('.eq-btn');
const decimalBtnEl = document.querySelector('.decimal-btn');
const allClearBtn = document.querySelector('.all-clear-btn');
const clearBtn = document.querySelector('.clear-btn');

let currentCalculation = '';
let numberOne;
let numberTwo;
let operator;
let result = 0;
let gotResult = false;
let canEquate = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    return divide(num1, num2);
  }
}

function numericalInput(e) {
  if (e.key) {
    if (numericalDisplay.innerText.length === 10) {
      return;
    }
    if (numericalDisplay.innerText === '0') {
      numericalDisplay.innerText = e.key;
    } else if (gotResult) {
      if (numericalDisplay.innerText === String(result))
        numericalDisplay.innerText = '';
      numericalDisplay.innerText += e.key;
    } else {
      numericalDisplay.innerText += e.key;
    }
  } else {
    if (numericalDisplay.innerText.length === 10) {
      return;
    }
    if (numericalDisplay.innerText === '0') {
      numericalDisplay.innerText = e.target.innerText;
    } else if (gotResult) {
      if (numericalDisplay.innerText === String(result))
        numericalDisplay.innerText = '';
      numericalDisplay.innerText += e.target.innerText;
    } else {
      numericalDisplay.innerText += e.target.innerText;
    }
  }
}

function operatorCalculation(e) {
  if (e.key) {
    if (numberOne === 0 && numericalDisplay.innerText === '0' && operator) {
      numberOne = 0;
      numericalDisplay.innerText = '0';
      operator = e.key;
      calculationDisplay.innerText = `${numberOne} ${operator}`;
      return;
    }
    if (operator) {
      numberTwo = parseFloat(numericalDisplay.innerText);
      result = operate(operator, numberOne, numberTwo);

      numericalDisplay.innerText = String(result);
      numberOne = result;
      operator = e.key;
      calculationDisplay.innerText = `${result} ${operator}`;
      gotResult = true;
      canEquate = true;
    } else {
      numberOne = parseFloat(numericalDisplay.innerText);
      operator = e.key;
      calculationDisplay.innerText = `${numberOne} ${operator}`;
      numericalDisplay.innerText = 0;
      canEquate = true;
    }
  } else {
    if (numberOne === 0 && numericalDisplay.innerText === '0' && operator) {
      numberOne = 0;
      numericalDisplay.innerText = '0';
      operator = e.target.innerText;
      calculationDisplay.innerText = `${numberOne} ${operator}`;
      return;
    }
    if (operator) {
      numberTwo = parseFloat(numericalDisplay.innerText);
      result = operate(operator, numberOne, numberTwo);

      numericalDisplay.innerText = String(result);
      numberOne = result;
      operator = e.target.innerText;
      calculationDisplay.innerText = `${result} ${operator}`;
      gotResult = true;
      canEquate = true;
    } else {
      numberOne = parseFloat(numericalDisplay.innerText);
      operator = e.target.innerText;
      calculationDisplay.innerText = `${numberOne} ${operator}`;
      numericalDisplay.innerText = 0;
      canEquate = true;
    }
  }
}

function equalsCalculation() {
  if (canEquate === true) {
    numberTwo = parseFloat(numericalDisplay.innerText);
    result = operate(operator, numberOne, numberTwo);
    calculationDisplay.innerText = `${numberOne} ${operator} ${numberTwo} = `;
    numericalDisplay.innerText = String(result);
    numberOne = result;
    numberTwo = null;

    operator = '';

    gotResult = true;
    canEquate = false;
  }
}

function decimalCalc() {
  if (
    !numericalDisplay.innerText.includes('.') &&
    numericalDisplay.innerText.length < 10
  ) {
    numericalDisplay.innerText += '.';
  }
}

function allClear() {
  numberOne = 0;
  numberTwo = 0;
  operator = '';
  result = 0;
  numericalDisplay.innerText = '0';
  calculationDisplay.innerText = '0';
}

function clear() {
  numericalDisplay.innerText = numericalDisplay.innerText.slice(
    0,
    numericalDisplay.innerText.length - 1
  );
  if (numericalDisplay.innerText.length === 0) {
    numericalDisplay.innerText = '0';
  }
}

function keyboardInputs(e) {
  if (e.key >= 0 && e.key <= 9) {
    numericalInput(e);
  }

  if (e.key === '.') {
    decimalCalc();
  }

  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    operatorCalculation(e);
  }

  if (e.key === 'Enter' || e.key === '=') {
    equalsCalculation();
  }

  if (e.key === 'Backspace') {
    clear();
  }

  if (e.key === 'Shift') {
    allClear();
  }

  if (e.key === '/') {
    e.preventDefault();
  }
}

numBtnEl.forEach((button) => {
  button.addEventListener('click', numericalInput);
});

opBtnEl.forEach((button) => {
  button.addEventListener('click', operatorCalculation);
});

eqBtnEl.addEventListener('click', equalsCalculation);

decimalBtnEl.addEventListener('click', decimalCalc);

allClearBtn.addEventListener('click', allClear);

clearBtn.addEventListener('click', clear);

window.addEventListener('keydown', keyboardInputs);
