var mazeSize;
var holder, sizeInput;
var cellPixelSize;
var sets = {};
window.onload = () => {
    holder = document.getElementById("holder");
    sizeInput = document.getElementById("mazeSizeInput");
    document.getElementById("step").addEventListener("click", Start);
}

// starts maze generation
function Start(){
    // resets the cell array and the set dictionary
    mazeSize = sizeInput.value;
    sets = {};
    maze = null;
    GenMazeArr();
    GenMazeDisplay();
    while(!BreakWalls()){
        continue;
    }
    Render();
}

// creates the cell array and the set dictionary
var maze;
function GenMazeArr(){
    maze = new Array(mazeSize);
    let i = 0;
    for(let y = 0; y < mazeSize; y++){
        maze[y] = new Array(mazeSize);
        for(let x = 0; x < mazeSize; x++){
            maze[y][x] = new mazeCell;
            maze[y][x].y = y;
            maze[y][x].x = x;
            maze[y][x].set = i.toString();
            sets[i.toString()] = [maze[y][x]];
            i++;
        }
    }
}

// chooses random cell and an adjacent cell to merge 
function BreakWalls(){
    let dictLen = Object.keys(sets).length; // gets ammount of sets
    if(dictLen == 1){return true;} // stops if only on set remains
    let chosenSet = Object.keys(sets)[Math.floor(Math.random() * dictLen)]; // chooses a random set
    let chosenCell = sets[chosenSet][Math.floor(Math.random() * sets[chosenSet].length)]; // chooses random cell from set
    // get cell position
    let x = chosenCell.x;
    let y = chosenCell.y;
    let directions = AvailableDirections(x,y);
    if(directions.length == 0){return false;}
    let dir = directions[Math.floor(Math.random() * directions.length)]; // chooses random direction
    // other cell position
    let nX = x;
    let nY = y;
    switch(dir){
        case "up":
            maze[y][x].top = false;
            maze[y - 1][x].bottom = false;
            nY--;
            break;
        case "down":
            maze[y][x].bottom = false;
            maze[y + 1][x].top = false;
            nY++;
            break;
        case "left":
            maze[y][x - 1].right= false;
            maze[y][x].left= false;
            nX--;
            break;
        case "right":
            maze[y][x].right= false;
            maze[y][x + 1].left= false;
            nX++;
            break;
    }
    if(nX == x && nY == y){return false;}
    DeleteSet(maze[y][x].set,maze[nY][nX].set);
    return false;
}

// creates all maze cell html elements
function GenMazeDisplay(){
    cellPixelSize = (holder.width / mazeSize);
    let ctx = holder.getContext("2d");
    ctx.clearRect(0,0,holder.width,holder.height);
}

// returns all available directions for a given cell
function AvailableDirections(x,y){
    let dirs = [];
    if(x > 0){
        if(maze[y][x].set != maze[y][x - 1].set){dirs.push("left");}
    }
    if(x < mazeSize - 1){
        if(maze[y][x].set != maze[y][x + 1].set){dirs.push("right");}
    }
    if(y > 0){
        if(maze[y][x].set != maze[y - 1][x].set){dirs.push("up");}
    }
    if(y < mazeSize - 1){
        if(maze[y][x].set != maze[y + 1][x].set){dirs.push("down");}
    }
    return dirs;
}

// changes all cells sets for another
function DeleteSet(keptSet,delSet){
    sets[delSet].forEach(element => {
        element.set = keptSet;
    });
    sets[keptSet] = sets[keptSet].concat(sets[delSet]);
    delete sets[delSet];
}

function Render(){
    let ctx = holder.getContext("2d");
    for(let y = 0; y < mazeSize; y++){
        for(let x = 0; x < mazeSize; x++){
            if(maze[y][x].top){
                ctx.beginPath();
                ctx.moveTo(x * cellPixelSize, y * cellPixelSize);
                ctx.lineTo((x + 1) * cellPixelSize, y * cellPixelSize);
                ctx.stroke();
            }
            if(maze[y][x].bottom){
                ctx.beginPath();
                ctx.moveTo(x * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.lineTo((x + 1) * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.stroke();
            }
            if(maze[y][x].left){
                ctx.beginPath();
                ctx.moveTo(x * cellPixelSize, y * cellPixelSize);
                ctx.lineTo(x * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.stroke();
            }
            if(maze[y][x].right){
                ctx.beginPath();
                ctx.moveTo((x + 1) * cellPixelSize, y * cellPixelSize);
                ctx.lineTo((x + 1) * cellPixelSize, (y + 1) * cellPixelSize);
                ctx.stroke();
            }
        }
    }
}
// maze cell data class
class mazeCell{
    constructor(x,y){
        // position
        this.x = x;
        this.y = y;
        // walls
        this.bottom = true;
        this.top = true;
        this.left = true;
        this.right = true;
        this.set = "";
    }
}
