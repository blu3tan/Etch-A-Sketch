
const canvasContainer = document.getElementById('sketch');
const inputBox = document.getElementById('inputBox');
const resetButton = document.getElementById('resetBtn');
const message = document.getElementById('messageText');

inputBox.addEventListener('input', () => {
    grid = inputBox.value;
})

//  New grid from user input // 
resetButton.addEventListener('click', () => {
    let gridNum = Number(inputBox.value);
    if (isNaN(gridNum)) {
        message.textContent ='# Must be a number';
        clearCanvas(sketch);
        inputBox.value = '';
        createCanvas(16);
    }
    else if (gridNum <= 3 || gridNum > 100) {
        message.textContent ='# Values from 4 to 100';
        clearCanvas(sketch);
        inputBox.value = '';
        createCanvas(16);
    }
    else {
        message.textContent ='# Insert a number';
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
    }
}

function createCanvas(num) {
    createRows(canvasContainer,num);
    const rowsCreated = document.getElementsByClassName('row');
    for(let i = 0; i < rowsCreated.length; i++) {
        createSquares(rowsCreated[i], num);
    }        
 }

createCanvas(16);