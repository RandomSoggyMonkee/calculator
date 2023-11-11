const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, e) => a ** e;

let firstNum = 0;
let secondNum = 0;
let opperator;
let total = 0;

const output = document.querySelector('#display');

const numberButtons = document.querySelectorAll('.numberBtn');
numberButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        let value = e.target.textContent;
        if (output.textContent === '0') {
            output.textContent = value;
        }else {
            output.textContent += value; 
        };
    });
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', function() {
    output.textContent = '0';
});

const eraseBtn = document.querySelector('#erase');
eraseBtn.addEventListener('click', function() {
    if (output.textContent === '0') {
        return;
    }else if (output.textContent.length === 1) {
        output.textContent = '0';
    }else {
        output.textContent = output.textContent.slice(0, -1);
    };
});

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