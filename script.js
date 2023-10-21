
const canvasContainer = document.getElementById('sketch');
const inputBox = document.getElementById('inputBox');
const resetButton = document.getElementById('resetBtn');
const eraseButton = document.getElementById('eraseBtn');
const blackButton = document.getElementById('blackBtn');
const rainbowButton = document.getElementById('rainbowBtn');
const message = document.getElementById('messageText');
const square = document.getElementsByClassName('canvas-square')

let isMousedown = false;
let color = 'black';


inputBox.addEventListener('input', () => {
    grid = inputBox.value;
})

eraseButton.addEventListener('click', () => {
    color = 'white';
})

blackButton.addEventListener('click', () => {
    color = 'black';
})

rainbowButton.addEventListener('click', () => {
    color = 'rainbow'
})
// Catch mouseup event outside the canvas
document.addEventListener('mouseup', () => {
    isMousedown = false;
})

//  New grid from user input // 
resetButton.addEventListener('click', () => {
    let gridNum = Number(inputBox.value);
    if (isNaN(gridNum)) {
        message.textContent ='The input must be a number';
        inputBox.value = '';
    }
    else if (gridNum <= 3 || gridNum > 100) {
        message.textContent ='Only values between 4 and 100';
        inputBox.value = '';
    }
    else {
        message.textContent = `New canvas size:\n${gridNum} x ${gridNum}`;
        inputBox.value = '';
        clearCanvas(sketch);
        createCanvas(gridNum);
    }
});

function clearCanvas(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Canvas generation  functions//

function createRows (container,num) {
    for (let i = num; i > 0; i--) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
    }
}

function createSquares (container,num) {
    for (let i = num; i > 0; i--) {
        const square = document.createElement('div');
        square.classList.add('canvas-square');
        container.appendChild(square);
        selector = 0;
        initDraw(square);
    }
}

function createCanvas(num) {
    createRows(canvasContainer,num);
    const rowsCreated = document.getElementsByClassName('row');
    for(let i = 0; i < rowsCreated.length; i++) {
        createSquares(rowsCreated[i], num);
    }        
 }

// Initialization of the drawing mechanism

function initDraw (element) {
    element.addEventListener('mousedown', changeColor);
    element.addEventListener('mouseup', () => {
        isMousedown = false;
    });
    element.addEventListener('mousemove', changeColorMove);
}

function changeColor () {
    isMousedown = true;
    if (color === 'rainbow') {
        this.style.backgroundColor = '#' + (Math.random().toString(16) + "000000").substring(2,8).toUpperCase();
    }
    else {
        this.style.backgroundColor = color;
    }
} 
function changeColorMove () {
    if (color === 'rainbow') {
        if (isMousedown) {
            this.style.backgroundColor = '#' + (Math.random().toString(16) + "000000").substring(2,8).toUpperCase();
            // Prevents the conflict with the browser drag behaviour
            element.ondragstart = () => false;
        }
    }
    else {
        if (isMousedown) {
            this.style.backgroundColor = color;
            // Prevents the conflict with the browser drag behaviour
            element.ondragstart = () => false;
        }
    }
} 

createCanvas(16);