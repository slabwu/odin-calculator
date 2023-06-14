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

let operator;
let values = ['', '', ''];
let finishedCalculation = false;





const arithmetic = {   '+': add = (a,b) => +a + +b,
                        '-': subtract = (a,b) => +a - +b,
                        'x': multiply = (a,b) => +a * +b,
                        '/': divide = (a,b) => (!(b == '0'))? `${+a / +b}` : 'LOL',
                        '%': modulus = (a,b) => +a % +b,
}

function operate(a,operator,b) {
    let calculatedValue = arithmetic[operator](a,b);
    textDisplay.textContent = calculatedValue;

    values[0] = `${calculatedValue}`;
    values[1] = '';
    values[2] = '';
    finishedCalculation = true;

    return calculatedValue;
}

function selectNumber() {
     if (!values[1]) {
        if (finishedCalculation) {
            values[0] = this.className.slice(7,8);
            finishedCalculation = false;
        } else {
            values[0] += this.className.slice(7,8);
        }
     } else {
        values[2] += this.className.slice(7,8);
     }
    
    textDisplay.textContent = values.join(' ');
    console.log(values)
}

function selectOperation() {
    values[1] = this.className.slice(7,8);

    textDisplay.textContent = values.join(' ');
    console.log(values)
}





numbers.forEach(number => number.addEventListener('click', selectNumber))
operators.forEach(operator => operator.addEventListener('click', selectOperation))
document.querySelector('.C').addEventListener('click', () => {textDisplay.textContent = ''})
document.querySelector('.equal').addEventListener('click', () => {if (values[0]&&values[1]&&values[2]) operate(values[0], values[1], values[2]);})