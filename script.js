
const canvasContainer = document.getElementById('sketch');
const inputBox = document.getElementById('inputBox');
const resetButton = document.getElementById('resetBtn');
const eraseButton = document.getElementById('eraseBtn');
const blackButton = document.getElementById('blackBtn');
const shadeButton = document.getElementById('shadeBtn');
const rainbowButton = document.getElementById('rainbowBtn');
const message = document.getElementById('messageText');
const square = document.getElementsByClassName('canvas-square')

let isMousedown = false;
let color = 'black';
let opacityStatus = 0;

// inputBox.addEventListener('input', () => {
//     grid = inputBox.value;
// })

eraseButton.addEventListener('click', () => {
    color = 'white';
})

blackButton.addEventListener('click', () => {
    color = 'black';
})

rainbowButton.addEventListener('click', () => {
    color = 'rainbow'
})

shadeButton.addEventListener('click', () => {
    color = 'shade'
    console.log(opacityStatus);
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
        inputBox.value = '16';
    }
    else if (gridNum <= 3 || gridNum > 100) {
        message.textContent ='Only values between 4 and 100';
        inputBox.value = '16';
    }
    else {
        message.textContent = `New canvas size:\n${gridNum} x ${gridNum}`;
        inputBox.value = '16';
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
    element.addEventListener('mouseenter', changeColorMove);
}

function changeColor () {
    isMousedown = true;
    if (color === 'rainbow') {
        this.style.backgroundColor = '#' + (Math.random().toString(16) + "000000").substring(2,8).toUpperCase();
    }
    else if (color === 'shade') {
        if (opacityStatus < 1) {
            opacityStatus += 0.1;
            this.style.cssText = `background-color: rgba(0,0,0,${opacityStatus})`;
        }
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
            this.ondragstart = () => false;
        }
    }
    else if (color === 'shade') {
        if (isMousedown) {
        if (opacityStatus < 1) {
            opacityStatus += 0.1;
            this.style.cssText = `background-color: rgba(0,0,0,${opacityStatus})`;
            this.ondragstart = () => false;
        }
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
