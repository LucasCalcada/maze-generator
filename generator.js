import Maze from "./maze.js";
var mazeSize;
var holder, sizeInput;

window.onload = () => {
    holder = document.getElementById("holder");
    sizeInput = document.getElementById("mazeSizeInput");
    document.getElementById("step").addEventListener("click", Generate);
}

// starts maze generation
function Generate(){
    mazeSize = sizeInput.value;
    let mazeObj = new Maze(mazeSize);
    Render(mazeObj.maze);
}

function Render(maze){
    let ctx = holder.getContext("2d");
    let cellPixelSize = (holder.width / mazeSize);
    ctx.clearRect(0,0,holder.width,holder.height);
    for(let y = 0; y < mazeSize; y++){
        for(let x = 0; x < mazeSize; x++){
            if(maze[y][x].walls["top"]){
                ctx.beginPath();
                ctx.moveTo(x * cellPixelSize, y * cellPixelSize);
                ctx.lineTo((x + 1) * cellPixelSize, y * cellPixelSize);
                ctx.stroke();
            }
            if(maze[y][x].walls["bottom"]){
                ctx.beginPath();
                ctx.moveTo(x * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.lineTo((x + 1) * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.stroke();
            }
            if(maze[y][x].walls["left"]){
                ctx.beginPath();
                ctx.moveTo(x * cellPixelSize, y * cellPixelSize);
                ctx.lineTo(x * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.stroke();
            }
            if(maze[y][x].walls["right"]){
                ctx.beginPath();
                ctx.moveTo((x + 1) * cellPixelSize, y * cellPixelSize);
                ctx.lineTo((x + 1) * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.stroke();
            }
        }
    }
}
