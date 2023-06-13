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
    if (/[%\/x\-\+=]/.test(text)) button.classList.add('operator');

    button.textContent = text;
    panel.appendChild(button);
}

let numberA;
let operator;
let numberB;






function addToDisplay() {
    textDisplay.textContent = `${this.className.slice(7,8)}`;
}

const arithmetic = {   '+': add = (a,b) => {return +a + +b},
                        '-': subtract = (a,b) => {return +a - +b},
                        '*': multiply = (a,b) => {return +a * +b},
                        '/': divide = (a,b) => {return +a / +b},
}

function operate(a,operator,b) {
    return arithmetic[operator](a,b);
}





let numbers = [...document.querySelectorAll('.number')];
let operators = [...document.querySelectorAll('.operator')];

numbers.forEach(number => number.addEventListener('click', addToDisplay))