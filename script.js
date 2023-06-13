const textDisplay = document.querySelector('.text-display');
const panel = document.querySelector('.panel');
const BUTTONTEXT = ['C', '+/-', '%', '/', '7', '8', '9', 'x', '4', '5', 
                    '6', '-', '1', '2', '3', '+', '0', '.', 'del', '='];

for (i = 0; i <20; i++) {
    let button = document.createElement('div')
    let text = BUTTONTEXT[i];

    button.classList.add('button');
    button.classList.add(text);
    if (/\d/.test(text)) button.classList.add('number');
    if (/[%\/x\-\+]/.test(text)) button.classList.add('operator');
    if (/=/.test(text)) button.classList.add('equal');
    //if (/[%\/x\-\+=]/.test(text)) button.classList.add('operator');

    button.textContent = text;
    panel.appendChild(button);
}

let numbers = [...document.querySelectorAll('.number')];
let operators = [...document.querySelectorAll('.operator')];

let numberA;
let operator;
let numberB;





const arithmetic = {   '+': add = (a,b) => {return +a + +b},
                        '-': subtract = (a,b) => {return +a - +b},
                        'x': multiply = (a,b) => {return +a * +b},
                        '/': divide = (a,b) => {return +a / +b},
                        '%': modulus = (a,b) => {return +a % +b},
}

function operate(a,operator,b) {
    let value = arithmetic[operator](a,b);
    textDisplay.textContent = value;
    return value;
}

function selectNumber() {
    currentNumber = this.className.slice(7,8);
    textDisplay.textContent = currentNumber;
    (!operator) ? numberA = currentNumber: numberB = currentNumber;

    document.querySelector('.numberA').textContent=`numberA: ${numberA}`;
    document.querySelector('.operator1').textContent=`operator: ${operator}`;
    document.querySelector('.numberB').textContent=`numberB: ${numberB}`;
    document.querySelector('.currentNumber').textContent=`currentNumber: ${currentNumber}`;
}

function selectOperation() {
    operator = this.className.slice(7,8)
}





numbers.forEach(number => number.addEventListener('click', selectNumber))
operators.forEach(operator => operator.addEventListener('click', selectOperation))
document.querySelector('.C').addEventListener('click', () => {textDisplay.textContent = ''})
document.querySelector('.equal').addEventListener('click', () => {operate(numberA, operator, numberB)})