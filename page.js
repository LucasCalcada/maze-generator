import Maze from "./mazeGenerator.js";
var widthInput, heightInput;
var holder, sizeInput;
var canvasCtx;
var cellPixelSize;
const LINE_WIDTH = 10;

const wallCorners = {
    "top": [0,0,1,0],
    "bottom": [0,1,1,1],
    "right": [1,0,1,1],
    "left": [0,0,0,1]
}

window.onload = () => {
    holder = document.getElementById("holder");
    canvasCtx = holder.getContext("2d");
    widthInput = document.getElementById("mazeWidthInput");
    heightInput = document.getElementById("mazeHeightInput");
    document.getElementById("step").addEventListener("click", Generate);
}

// Starts maze generation
function Generate(){
    let mazeWidth = widthInput.value;
    let mazeHeight = heightInput.value;
    let mazeObj = new Maze(mazeWidth, mazeHeight);
    Render(mazeObj.maze);
}

// Render maze on web page
function Render(maze){
    cellPixelSize = 20;
    canvasCtx.clearRect(0,0,holder.width,holder.height);
    // Flattens 2D array
    maze = [].concat(...maze);
    maze.forEach(cell => {
        // Draws line if wall exists
        Object.keys(cell.walls).forEach(wall => {
            if(cell.walls[wall]) drawLine(cell.x,cell.y,wall);
        });
    });
}
function drawLine(x,y,side){
    let fromX = x + wallCorners[side][0];
    let fromY = y + wallCorners[side][1];
    let toX = x + wallCorners[side][2];
    let toY = y + wallCorners[side][3];

    canvasCtx.beginPath();
    canvasCtx.moveTo(fromX * cellPixelSize, fromY * cellPixelSize);
    canvasCtx.lineTo(toX * cellPixelSize, toY * cellPixelSize);
    canvasCtx.lineWidth = LINE_WIDTH;
    canvasCtx.stroke();
}