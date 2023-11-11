const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, e) => a ** e;

let firstNum = 0;
let secondNum = 0;
let opperator;
let total = 0;

const outputLower = document.querySelector('#displayLower');
const outputUpper = document.querySelector('#displayUpper');

const numberButtons = document.querySelectorAll('.numberBtn');
numberButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        let value = e.target.textContent;
        if (outputUpper.textContent.includes('=')) {
            outputUpper.textContent = '';
            outputLower.textContent = '0';
        };
        if (outputLower.textContent === '0') {
            outputLower.textContent = value;
        }else {
            outputLower.textContent += value; 
        };
    });
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', function() {
    outputLower.textContent = '0';
    outputUpper.textContent = '';
});

const eraseBtn = document.querySelector('#erase');
eraseBtn.addEventListener('click', function() {
    if (outputLower.textContent === '0') {
        return;
    }else if (outputLower.textContent.length === 1) {
        outputLower.textContent = '0';
    }else {
        outputLower.textContent = outputLower.textContent.slice(0, -1);
    };
});

const opperatorBtns = document.querySelectorAll('.opperator')
opperatorBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
      firstNum = +outputLower.textContent;
      opperator = e.target.textContent;
      outputUpper.textContent = `${outputLower.textContent}${e.target.textContent}`;
      outputLower.textContent = '0';
    })
});

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', function(e) {
    secondNum = +outputLower.textContent;
    outputUpper.textContent += outputLower.textContent + '=';
    outputLower.textContent = operate(firstNum, opperator, secondNum);
    firstNum = 0;
    secondNum = 0;
    opperator = 0;
})

const operate = function(a, o, b) {
    if (o === '+') {
        return add(a,b);
    }else if (o === '-') {
        return subtract(a,b);
    }else if (o === '*') {
        return multiply(a,b);
    }else if (o === '/') {
        return divide(a,b);
    }else if  (o === '**') {
        return power(a, b);
    };
};