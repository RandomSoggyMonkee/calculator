let currentNum = null;
let firstNum = null;
let secondNum = null;
let opperator = null;
let total = null;

const output = document.querySelector('#displayLower');
const outputUpper = document.querySelector('#displayUpper');


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const power = (a, e) => a ** e;
const divide = function(a, b) {
    if (b === 0) {
        clear();
        return output.textContent = 'Dividing by zero, seriously?';
    }else return a / b;
};

const operate = (a, o, b) => {
    if (o === '+') return add(a, b);
    if (o === '-') return subtract(a, b);
    if (o === '*') return multiply(a, b);
    if (o === '/') return divide(a, b);
    if  (o === 'Pow' || o === '^') return power(a, b);
};

const num = (e) => {
    if (outputUpper.textContent.includes('=')) {
        outputUpper.textContent = '';
        currentNum = e.target.textContent;
        output.textContent = currentNum;
        return;
    };
    if (currentNum === null || currentNum === 0) {
        currentNum = e.target.textContent;
        output.textContent = currentNum;
    }else { 
        currentNum += e.target.textContent;
        output.textContent = currentNum;
    };
};

const numKeyInput = (e) => {
    if (outputUpper.textContent.includes('=')) {
        outputUpper.textContent = '';
        currentNum = e;
        output.textContent = currentNum;
        return;
    };
    if (currentNum === null || currentNum === 0) {
        currentNum = e;
        output.textContent = currentNum;
    }else { 
        currentNum += e;
        output.textContent = currentNum;
    };
};

const decimal = () => {
    if (output.textContent.includes('.')) return;
    if (firstNum === null && currentNum === null) {
        currentNum = '0.';
        output.textContent = currentNum;
    }else if (firstNum && currentNum === null) {
        currentNum = '0.';
        output.textContent = currentNum;
    }else {
        currentNum += '.';
        output.textContent = currentNum;
    };
};

const opp = (e) => {
    if (currentNum === null) return;
    if (outputUpper.textContent.includes('=')) {
        outputUpper.textContent = '';
    };
    outputUpper.textContent += currentNum + e.target.textContent;
    if (firstNum === null) {
        firstNum = currentNum;
    }else secondNum = currentNum;
    if (secondNum === null) {
        currentNum = null;
        opperator = e.target.textContent;
    }else {
        total = operate(+firstNum, opperator, +secondNum);
        output.textContent = Number.isInteger(total) ? total : +total.toFixed(10);
        firstNum = total
        secondNum = null;
        currentNum = null;
        opperator = e.target.textContent;
    };
  };

  const oppKeyInput = (e) => {
    if (currentNum === null) return;
    if (outputUpper.textContent.includes('=')) {
        outputUpper.textContent = '';
    };
    outputUpper.textContent += currentNum + e;
    if (firstNum === null) {
        firstNum = currentNum;
    }else secondNum = currentNum;
    if (secondNum === null) {
        currentNum = null;
        opperator = e;
    }else {
        total = operate(+firstNum, opperator, +secondNum);
        output.textContent = Number.isInteger(total) ? total : +total.toFixed(10);
        firstNum = total
        secondNum = null;
        currentNum = null;
        opperator = e;
    };
  };

  const del = () => {
    if (output.textContent === '0') return;
    if (output.textContent.length === 1) {
        output.textContent = '0';
        currentNum = 0;
    }else {
        output.textContent = output.textContent.slice(0, -1);
        currentNum = currentNum.slice(0, -1);
    };
};

const clear = () => {
    output.textContent = '0';
    outputUpper.textContent = '';
    total = 0;
    firstNum = null;
    secondNum = null;
    currentNum = null;
    opperator = null;
};

const equals = () => {
    if (firstNum === null && currentNum === null) return;
    if (opperator === null) return;
    if (currentNum === null) {
        outputUpper.textContent += '0' + '=';
    }else outputUpper.textContent += currentNum + '=';
    total = operate(+firstNum, opperator, +currentNum);
    output.textContent = Number.isInteger(total) ? total : +total.toFixed(10);
    firstNum = null
    secondNum = null;
    currentNum = total;
    opperator = null;
};


const numberBtns = document.querySelectorAll('.numberBtn');
const opperatorBtns = document.querySelectorAll('.opperator')
const deciBtn = document.querySelector('#dec')
const equalsBtn = document.querySelector('#equals');
const eraseBtn = document.querySelector('#erase');
const clearBtn = document.querySelector('#clear');

numberBtns.forEach(btn => {
    btn.addEventListener('click', num);
});
opperatorBtns.forEach((btn) => {
    btn.addEventListener('click', opp);
});
deciBtn.addEventListener('click', decimal);
equalsBtn.addEventListener('click', equals);
eraseBtn.addEventListener('click', del);
clearBtn.addEventListener('click', clear);

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    let name = e.key;
    const ops = ['+', '-', '*', '/', '^'];
    if (Number.isInteger(+name)) numKeyInput(name);
    if (ops.includes(name)) oppKeyInput(name);
    if (name === '.') decimal();
    if (name === 'Backspace') del();
    if (name === 'Enter' || name === '=') equals();
});