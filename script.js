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

const operate = function(a, o, b) {
    if (o === '+') {
        return add(a, b);
    }else if (o === '-') {
        return subtract(a, b);
    }else if (o === '*') {
        return multiply(a, b);
    }else if (o === '/') {
        return divide(a, b);
    }else if  (o === 'Pow' || o === '^') {
        return power(a, b);
    };
};

const num = function(e) {
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

const numKeyInput = function(e) {
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

const decimal = function() {
    if (output.textContent.includes('.')) {
        return;
    }else if (firstNum === null && currentNum === null) {
        currentNum += '0' + '.';
        output.textContent = currentNum;
    }else if (firstNum && currentNum === null) {
        currentNum += '0' + '.';
        output.textContent = currentNum;
    }else {
        currentNum += '.';
        output.textContent = currentNum;
    };
}

const opp = function(e) {
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
        if (!Number.isInteger(total)) {
            output.textContent = +total.toFixed(10);
        }else output.textContent = total;
        firstNum = total
        secondNum = null;
        currentNum = null;
        opperator = e.target.textContent;
    };
  }

  const oppKeyInput = function(e) {
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
        if (!Number.isInteger(total)) {
            output.textContent = +total.toFixed(10);
        }else output.textContent = total;
        firstNum = total
        secondNum = null;
        currentNum = null;
        opperator = e;
    };
  }

  const del = function() {
    if (output.textContent === '0') {
        return;
    }else if (output.textContent.length === 1) {
        output.textContent = '0';
        currentNum = 0;
    }else {
        output.textContent = output.textContent.slice(0, -1);
        currentNum = currentNum.slice(0, -1);
    };
}

const clear = function() {
    output.textContent = '0';
    outputUpper.textContent = '';
    total = 0;
    firstNum = null;
    secondNum = null;
    currentNum = null;
    opperator = null;
};

const equals = function() {
    if (firstNum === null && currentNum === null) return;
    if (opperator === null) return;
    if (currentNum === null) {
        outputUpper.textContent += '0' + '=';
    }else outputUpper.textContent += currentNum + '=';
    console.log(+firstNum + opperator + +currentNum);
    total = operate(+firstNum, opperator, +currentNum);
    console.log(total);
    if (!Number.isInteger(total)) {
        output.textContent = +total.toFixed(104);
    }else output.textContent = total;
    firstNum = null
    secondNum = null;
    currentNum = total;
    opperator = null;
}

    
    
    // ISSUES TO FIX
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
    btn.addEventListener('click', num);
});

const opperatorBtns = document.querySelectorAll('.opperator')
opperatorBtns.forEach(function(btn) {
    btn.addEventListener('click', opp);
});

const deciBtn = document.querySelector('#dec')
deciBtn.addEventListener('click', decimal);

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', equals);

const eraseBtn = document.querySelector('#erase');
eraseBtn.addEventListener('click', del);

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clear);


document.addEventListener('keydown', function(e) {
    let name = e.key;
    const opps = ['+', '-', '*', '/', '^'];
    if (Number.isInteger(+name)) {
        numKeyInput(name);
    }else if (opps.includes(name)) {
        oppKeyInput(name);
    }else if (name === '.') {
        decimal();
    }else if (name === 'Backspace') {
        del();
    }else if (name === 'Enter') {
        equals();
    };
});



