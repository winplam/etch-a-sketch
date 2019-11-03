// Color Mode Normal, Colorize or Shader
let colorMode = "Normal";

// Initialize the grid
function initializeGrid(gridSize) {
    changeColor(createGrid(gridSize));
}

// Create the main square and fill it with small cubes
function createGrid(gridSize) {
    const cointainer = document.getElementById('container')
    cointainer.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
    cointainer.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
    let boxes = [];
    for (i = 1; i <= gridSize * gridSize; i++) {
        box = document.createElement('div');
        box.className = 'box';
        box.id = `box${i}`;
        box.style.backgroundColor = 'rgb(255,255,255)';
        cointainer.appendChild(box);
        boxes.push(box);
    }
    return boxes;
}

// Change cube color on mouseover. Erase on mouse down
function changeColor(squares) {
    for (i = 0; i < squares.length; i++) {
        squares[i].addEventListener('mouseover', addColor);
        squares[i].addEventListener('mousedown', eraseColor);

        function addColor(sqr) {
            switch (colorMode) {
                case "Normal":
                    sqr.target.style.backgroundColor = 'rgb(0, 128, 0)'; // green
                    break;
                case "Colorize":
                    sqr.target.style.backgroundColor = randomColor();
                    break;
                case "Shader":
                    const gradientAmount = -25;
                    sqr.target.style.backgroundColor = shaderColor(sqr.target.style.backgroundColor, gradientAmount);
                    break;
                default:
                    sqr.target.style.backgroundColor = 'rgb(0,0,0)'; // black
                    break;
            }
        }

        function eraseColor(sqr) {
            sqr.target.style.backgroundColor = 'white';
        }
    }
}

// Erase all squares
function clearGrid() {
    const gridDivs = document.getElementById("container");
    while (gridDivs.firstChild) {
        gridDivs.removeChild(gridDivs.firstChild);
    }
}

// Button for clearing grid and creating new canvas
function clearButton() {
    document.getElementById("clearBtn").addEventListener("click", function () {
        const input = prompt("How many squares per side for new grid? (Default is 16)");
        if (parseInt(input) > 0) {
            colorMode = "Normal";
            clearGrid();
            initializeGrid(input)
        } else if (input === null) {
            return;
        } else {
            colorMode = "Normal";
            clearGrid();
            const defaultGridSize = 16;
            initializeGrid(defaultGridSize);
        }
    });
}

// Button for setting colorize flag
function colorizeButton() {
    document.getElementById("colorizeBtn").addEventListener("click", function () {
        colorMode == "Colorize" ? colorMode = "Normal" : colorMode = "Colorize";
    });
}

// Generate rainbow of colors
function randomColor() {
    let color = '';
    while (color.length < 6) {
        color += Math.random().toString(16).substr(-1)
    }
    return '#' + color;
}

// Button for setting shader color flag
function shaderButton() {
    document.getElementById("shaderBtn").addEventListener("click", function () {
        colorMode == "Shader" ? colorMode = "Normal" : colorMode = "Shader";
    });
}

// Make color darker by gradient amount
function shaderColor(currentColor, gradientAmount) {
    const colors = currentColor.split(',');
    let red = parseInt(colors[0].slice(4)) + gradientAmount;
    let green = parseInt(colors[1]) + gradientAmount;
    let blue = parseInt(colors[2]) + gradientAmount;
    (red < 0) ? red = 0 : red;
    (green < 0) ? green = 0 : green;
    (blue < 0) ? blue = 0 : blue;
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

// Load functions
window.onload = initializeGrid(16);
window.onload = clearButton();
window.onload = colorizeButton();
window.onload = shaderButton();
