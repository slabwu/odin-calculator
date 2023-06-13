const textDisplay = document.querySelector('.textDisplay');
const panel = document.querySelector('.panel');

for (i = 0; i <20; i++) {
    let button = document.createElement('div')
    button.classList.add("button");
    button.textContent = 'test';
    //div.addEventListener('mouseover', ...);
    panel.appendChild(button);
}