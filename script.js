
const canvasContainer = document.getElementById('sketch');
const inputBox = document.getElementById('inputBox');
const resetButton = document.getElementById('resetBtn');
const message = document.getElementById('messageText');
const square = document.getElementsByClassName('canvas-square')

let isMousedown = false;

inputBox.addEventListener('input', () => {
    grid = inputBox.value;
})

document.addEventListener('mouseup', () => {
    isMousedown = false;
})

//  New grid from user input // 
resetButton.addEventListener('click', () => {
    let gridNum = Number(inputBox.value);
    if (isNaN(gridNum)) {
        message.textContent ='The input must be a number';
        clearCanvas(sketch);
        inputBox.value = '';
        createCanvas(16);
    }
    else if (gridNum <= 3 || gridNum > 100) {
        message.textContent ='Only values between 4 and 100';
        clearCanvas(sketch);
        inputBox.value = '';
        createCanvas(16);
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
        square.addEventListener('mousedown', () => {
            isMousedown = true;
            square.classList.add('draw');
        });
        square.addEventListener('mouseup', () => {
            isMousedown = false;
        });
        container.appendChild(square);
        mouseDraw(square);
    }
}

function createCanvas(num) {
    createRows(canvasContainer,num);
    const rowsCreated = document.getElementsByClassName('row');
    for(let i = 0; i < rowsCreated.length; i++) {
        createSquares(rowsCreated[i], num);
    }        
 }

function mouseDraw (element) {
        element.addEventListener('mousemove', () => {
            if (isMousedown) {
                element.classList.add('draw');
            }
        });
    }

createCanvas(16);