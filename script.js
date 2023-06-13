const textDisplay = document.querySelector('.textDisplay');
const panel = document.querySelector('.panel');
const BUTTONTEXT = ['C', '+/-', '%', '/', '7', '8', '9', 'x', '4', '5', 
                    '6', '-', '1', '2', '3', '+', '0', '.', 'del', '='];

for (i = 0; i <20; i++) {
    let button = document.createElement('div')
    button.classList.add("button");
    button.textContent = BUTTONTEXT[i];
    //div.addEventListener('mouseover', ...);
    panel.appendChild(button);
}