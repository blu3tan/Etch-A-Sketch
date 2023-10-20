
const canvasContainer = document.getElementById('sketch');
const inputBox = document.getElementById('inputBox');
const resetButton = document.getElementById('resetBtn');
const eraseButton = document.getElementById('eraseBtn');
const blackButton = document.getElementById('blackBtn');
const message = document.getElementById('messageText');
const square = document.getElementsByClassName('canvas-square')

let isMousedown = false;
const colors = ['black', 'erase'];
let selector = 0;

inputBox.addEventListener('input', () => {
    grid = inputBox.value;
})

eraseButton.addEventListener('click', () => {
    selector = 1;
})

blackButton.addEventListener('click', () => {
    selector = 0;
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

// Canvas generation //

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
    element.addEventListener('mousedown', () => {
        isMousedown = true;
        clearClasses(element);
        element.classList.add(colors[selector]);
    });
    element.addEventListener('mouseup', () => {
        isMousedown = false;
    });
    element.addEventListener('mousemove', () => {
        if (isMousedown) {
            clearClasses(element);
            element.classList.add(colors[selector]);
        }
    });
}

function clearClasses (element) {
    for (let i = 0; i < colors.length; i++) {
        element.classList.remove(colors[i]);
    }
}


createCanvas(16);
