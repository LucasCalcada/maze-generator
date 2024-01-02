import Maze from "./mazeGenerator.js";
import parseMaze from "./mazeToSvg.js";
var widthInput, heightInput;
var holder;

window.onload = () => {
    holder = document.getElementById("holder");
    widthInput = document.getElementById("mazeWidthInput");
    heightInput = document.getElementById("mazeHeightInput");
    document.getElementById("generateBtn").addEventListener("click", Generate);
}

function Generate(){
    let mazeWidth = widthInput.value;
    let mazeHeight = heightInput.value;

    let mazeObj = new Maze(mazeWidth, mazeHeight);
    let mazeSvg = parseMaze(mazeObj);

    holder.textContent = '';
    holder.appendChild(mazeSvg);
}