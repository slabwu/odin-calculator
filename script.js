const textDisplay = document.querySelector('.text-display');
const panel = document.querySelector('.panel');
const BUTTONTEXT = ['clear', 'changeSign', '%', '/', '7', '8', '9', '*', '4', '5', 
                    '6', '-', '1', '2', '3', '+', '0', 'decimal', 'delete', 'equal'];
const REPLACETEXT = {clear: 'C', changeSign: '+/-', decimal: '.', delete: '⌫', equal: '=', '*': '×', '/': '÷'};                    

for (i = 0; i <20; i++) {
    let button = document.createElement('div')
    let text = BUTTONTEXT[i];

    button.classList.add('button');
    button.classList.add(text);
    if (/\d/.test(text)) button.classList.add('number');
    if (/[%/*\-\+]/.test(text)) button.classList.add('operator');
    if (/\b(?:clear|changeSign|decimal|delete)\b/.test(text)) button.classList.add('misc');
    if (REPLACETEXT[text]) text = REPLACETEXT[text];
    

    button.textContent = text;
    panel.appendChild(button);
}

let numbers = [...document.querySelectorAll('.number')];
let operators = [...document.querySelectorAll('.operator')];

let operator;
let values = ['', '', ''];
let finishedCalculation = false;





const arithmetic = {   '+': add = (a,b) => +a + +b,
                        '-': subtract = (a,b) => +a - +b,
                        '*': multiply = (a,b) => +a * +b,
                        '/': divide = (a,b) => (!(b === '0'))? +a / +b : 'LOL',
                        '%': modulus = (a,b) => +a % +b,
}

function operate(a,operator,b) {
    if (isNaN(a) || isNaN(b)) {
        textDisplay.textContent = 'NaN';
        values = ['', '', '']
    } else {
    let calculatedValue = arithmetic[operator](a,b);

    if (!isNaN(calculatedValue) && countDecimals(calculatedValue)>2) {
        calculatedValue = Math.round((calculatedValue) * 100) / 100;
    }

    textDisplay.textContent = calculatedValue;
    values[0] = `${calculatedValue}`;
    values[1] = '';
    values[2] = '';
    finishedCalculation = true;

    updateDisplay()
}
}

function selectNumber() {
     if (!values[1]) {
        if (finishedCalculation) {
            values[0] = this.className.slice(7,8);
            finishedCalculation = false;
        } else {
            if ((values[0].length)<11) values[0] += this.className.slice(7,8);
        }
     } else {
        if ((values[2].length)<11) values[2] += this.className.slice(7,8);
     }
     updateDisplay();
}

function selectOperation() {
    if (values[0]) values[1] = this.className.slice(7,8);
    updateDisplay();
}

function countDecimals(number) {
    if(Math.floor(number) === number) return 0;
    return number.toString().split(".")[1].length || 0; 
}

function updateDisplay() {
    console.log(values)
    textDisplay.textContent = values.join(' ');}






numbers.forEach(number => number.addEventListener('click', selectNumber))
operators.forEach(operator => operator.addEventListener('click', selectOperation))

document.querySelector('.clear').addEventListener('click', () => {
    values = ['', '', ''];
    updateDisplay();
})

document.querySelector('.decimal').addEventListener('click', () => {
    if (!values[1]) {
        if (!values[0].includes('.')) values[0] += `.`;
    } else {
        if (!values[2].includes('.')) values[2] += `.`;
    }
    updateDisplay();
})

document.querySelector('.changeSign').addEventListener('click', () => {
    if (!values[1]) {
        (values[0]>0)?  values[0] = `${-Math.abs(values[0])}`:
                        values[0] = `${Math.abs(values[0])}`;
    } else {
        (values[2]>0)?  values[2] = `${-Math.abs(values[2])}`:
                        values[2] = `${Math.abs(values[2])}`;
    }
    updateDisplay();
})

document.querySelector('.delete').addEventListener('click', () => {
    for (i=2; i>=0; i--) {
        if (!(values[i] === '')) { 
            values[i] = values[i].slice(0, values[i].length-1);
            break;
        }
    }
    updateDisplay();
})

document.querySelector('.equal').addEventListener('click', () => {
    if (values[0]&&values[1]&&values[2]) operate(values[0], values[1], values[2]);})