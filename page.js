import Maze from "./mazeGenerator.js";
import parseMaze from "./mazeToSvg.js";
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
    widthInput = document.getElementById("mazeWidthInput");
    heightInput = document.getElementById("mazeHeightInput");
    document.getElementById("step").addEventListener("click", Generate);
}

// Starts maze generation
function Generate(){
    let mazeWidth = widthInput.value;
    let mazeHeight = heightInput.value;
    let mazeObj = new Maze(mazeWidth, mazeHeight);
    let mazeSvg = parseMaze(mazeObj);
    UpdateDisplay(mazeSvg);
}

function UpdateDisplay(svg){
    holder.textContent = '';
    holder.appendChild(svg);
}