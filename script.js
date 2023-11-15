const clear = function() {
    output.textContent = '0';
    outputUpper.textContent = '';
    total = 0;
    firstNum = null;
    secondNum = null;
    currentNum = null;
    opperator = null;
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const power = (a, e) => a ** e;
const divide = function(a, b) {
    if (b === 0) {
        clear();
        return output.textContent = 'Dividing by zero, seriously? >.>';
    }else a / b;
};

const operate = function(a, o, b) {
    if (o === '+') {
        return add(a, b);
    }else if (o === '-') {
        return subtract(a, b);
    }else if (o === '*') {
        return multiply(a, b);
    }else if (o === '/') {
        return divide(a, b);
    }else if  (o === 'Pow') {
        return power(a, b);
    };
};
    
    //
    // ISSUES
    //
    // NEED TO PREVENT OVERFLOW ON TOP DISPLAY
    // NEED TO ROUND TOTAL TO A CERTAIN NO. OF DECIMAL PLACES, TO PREVENT OVERFLOW
    //
    //
    //

let currentNum = null;
let firstNum = null;
let secondNum = null;
let opperator = null;
let total = null;

const output = document.querySelector('#displayLower');
const outputUpper = document.querySelector('#displayUpper');


const numberBtns = document.querySelectorAll('.numberBtn');
numberBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        if (outputUpper.textContent.includes('=')) {
            outputUpper.textContent = '';
        };
        if (currentNum === null) {
            currentNum = e.target.textContent;
            output.textContent = currentNum;
        }else { 
            currentNum += e.target.textContent;
            output.textContent = currentNum;
        };
    });
});

const opperatorBtns = document.querySelectorAll('.opperator')
opperatorBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
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
            output.textContent = total;
            firstNum = total
            secondNum = null;
            currentNum = null;
            opperator = e.target.textContent;
        };
      });
});


const deciBtn = document.querySelector('#dec')
deciBtn.addEventListener('click', function(e) {
    if (output.textContent.includes('.')) {
        return;
    }else if (firstNum === null && currentNum === null) {
        currentNum += '0' + e.target.textContent;
        output.textContent = currentNum;
    }else if (firstNum && currentNum === null) {
        currentNum += '0' + e.target.textContent;
        output.textContent = currentNum;
    }else {
        currentNum += e.target.textContent;
        output.textContent = currentNum;
    };
});

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', function() {
    if (firstNum === null && currentNum === null) return;
    if (opperator === null) return;
    if (currentNum === null) {
        outputUpper.textContent += '0' + '=';
    }else outputUpper.textContent += currentNum + '=';
    total = operate(+firstNum, opperator, +currentNum);
    output.textContent = total;
    firstNum = null
    secondNum = null;
    currentNum = total;
    opperator = null;
});

const eraseBtn = document.querySelector('#erase');
eraseBtn.addEventListener('click', function() {
    if (output.textContent === '0') {
        return;
    }else if (output.textContent.length === 1) {
        output.textContent = '0';
        currentNum = 0;
    }else {
        output.textContent = output.textContent.slice(0, -1);
        currentNum = currentNum.slice(0, -1);
    };
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clear);