const textDisplay = document.querySelector('.text-display');
const answerDisplay = document.querySelector('.answer-display');
const panel = document.querySelector('.panel');
const BUTTONTEXT = ['clear', 'changeSign', '%', '/', '7', '8', '9', '*', '4', '5', 
                    '6', '-', '1', '2', '3', '+', '0', 'decimal', 'delete', 'equal'];
const REPLACETEXT = {clear: 'C', changeSign: '+/-', decimal: '.', delete: '⌫', equal: '=', '*': '×', '/': '÷'};                    

for (i = 0; i <20; i++) {
    let button = document.createElement('div')
    let text = BUTTONTEXT[i];

    button.classList.add('button');
    button.classList.add(text);
    button.setAttribute('id', text)
    if (/\d/.test(text)) button.classList.add('number');
    if (/[%/*\-\+]/.test(text)) button.classList.add('operator');
    if (/\b(?:clear|changeSign|decimal|delete)\b/.test(text)) button.classList.add('misc');
    if (REPLACETEXT[text]) text = REPLACETEXT[text];
    

    button.textContent = text;
    panel.appendChild(button);
}

let numbers = [...document.querySelectorAll('.number')];
let operators = [...document.querySelectorAll('.operator')];
let buttons = [...document.querySelectorAll('.button')];

let operator;
let values = ['', '', ''];
let finishedCalculation = false;
let sound = new Audio('button-sound.mp3')





const arithmetic = {    '+': add = (a,b) => +a + +b,
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
        calculatedValue = Math.round((calculatedValue) * 100000) / 100000;
    }

    answerDisplay.textContent = calculatedValue;
    updateDisplay()
    textDisplay.textContent += ' =';
    values[0] = `${calculatedValue}`;
    values[1] = '';
    values[2] = '';
    finishedCalculation = true;
}
}

function selectNumber(number) {
    if (typeof number === 'object') number = this.className.slice(7,8);
    if (!values[1]) {
    if (finishedCalculation) {
            values[0] = number;
            finishedCalculation = false;
        } else {
            if ((values[0].length)<11) values[0] += number;
        }
    } else {
        if ((values[2].length)<11) values[2] += number;
    }
     updateDisplay();
}

function selectOperation(operator) {
    if (typeof operator === 'object') operator = this.className.slice(7,8);
    if (values[0]) { 
        if (values[2]) {
            operate(values[0], values[1], values[2]);
            values[1] = operator;
        } else {
            values[1] = operator;
        }
    }
    updateDisplay();
}

function countDecimals(number) {
    if(Math.floor(number) === number) return 0;
    return number.toString().split(".")[1].length || 0; 
}

function updateDisplay() {
    console.log(values)
    textDisplay.textContent = values.join(' ');}

function clear() {
    values = ['', '', ''];
    answerDisplay.textContent = '';
    updateDisplay();
}

function addDecimalPoint() {
    if (!values[1]) {
        if (!values[0].includes('.')) values[0] += `.`;
    } else {
        if (!values[2].includes('.')) values[2] += `.`;
    }
    updateDisplay();
}

function deleteDisplay() {
    for (i=2; i>=0; i--) {
        if (!(values[i] === '')) { 
            values[i] = values[i].slice(0, values[i].length-1);
            break;
        }
    }
    if (!values[0]&&!values[1]&&!values[2]) answerDisplay.textContent = '';
    updateDisplay();
}

function operateEqual() {
    if (values[0]&&values[1]&&values[2]) operate(values[0], values[1], values[2]);
}

function changeSign() {
    if (!values[1]) {
        (values[0]>0)?  values[0] = `${-Math.abs(values[0])}`:
                        values[0] = `${Math.abs(values[0])}`;
    } else {
        (values[2]>0)?  values[2] = `${-Math.abs(values[2])}`:
                        values[2] = `${Math.abs(values[2])}`;
    }
    updateDisplay();
}

function playSound() {
    sound.currentTime = 0;
    sound.play();
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}






numbers.forEach(number => number.addEventListener('click', selectNumber))
operators.forEach(operator => operator.addEventListener('click', selectOperation))
buttons.forEach(button => button.addEventListener('click', playSound))
buttons.forEach(button => button.addEventListener('transitionend', removeTransition))

document.querySelector('.clear').addEventListener('click', clear)
document.querySelector('.decimal').addEventListener('click', addDecimalPoint)
document.querySelector('.delete').addEventListener('click', deleteDisplay)
document.querySelector('.equal').addEventListener('click', operateEqual)
document.querySelector('.changeSign').addEventListener('click', changeSign)

document.addEventListener('keydown', (e) => {
    let currentButton = document.getElementById(`${e.key}`)
    if (currentButton === null) switch (e.key) {
        case 'c':
            currentButton = document.querySelector('.clear');
            break;
        case '.':
            currentButton = document.querySelector('.decimal');
            break;
        case 'Backspace':
            currentButton = document.querySelector('.delete');
            break;
        case '=':
            currentButton = document.querySelector('.equal');
            break;
        case '=':
            currentButton = document.querySelector('.changeSign');
            break;
    }
    if (!(currentButton === null)) {
        buttons.forEach(button => button.classList.remove('pressed'));
        playSound();
        currentButton.classList.add('pressed');
    }

    if (/\d/.test(e.key)) selectNumber(e.key);
    if (/[%/*\-\+]/.test(e.key)) selectOperation(e.key);
    switch (e.key) {
        case '=':
            operateEqual();
            break;
        case 'c':
            clear();
            break;
        case '.':
            addDecimalPoint();
            break;
        case 'Backspace':
            deleteDisplay();
            break;
    }
})