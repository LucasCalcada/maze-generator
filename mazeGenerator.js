class Maze{
    constructor(sizeX, sizeY){
        this.sets = {};
        this.maze = [];
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        let i = 0;
        for(let y = 0; y < sizeY; y++){
            let row = new Array();
            for(let x = 0; x < sizeX; x++){
                let cell = new Cell(x,y,i);
                row.push(cell);
                this.sets[i] = [cell];
                i++;
            }
            this.maze.push(row);
        }
        while(Object.keys(this.sets).length > 1){
            this.BreakWall();
        }
    }
    BreakWall(){
        let chosenKey = RandomChoice(Object.keys(this.sets));
        let chosenSet = this.sets[chosenKey]// chooses a random set
        let chosenCell = RandomChoice(chosenSet); // chooses random cell from set
        // get cell position
        let x = chosenCell.x;
        let y = chosenCell.y;
        let directions = this.AvailableDirections(x,y);
        if(directions.length == 0){return;}
        let dir = RandomChoice(directions); // chooses random direction
        let nX = x;
        let nY = y;
        switch(dir){
            case "up":
                this.maze[y][x].walls["top"]= false;
                this.maze[y - 1][x].walls["bottom"]= false;
                nY--;
                break;
            case "down":
                this.maze[y][x].walls["bottom"]= false;
                this.maze[y + 1][x].walls["top"]= false;
                nY++;
                break;
            case "left":
                this.maze[y][x - 1].walls["right"] = false;
                this.maze[y][x].walls["left"] = false;
                nX--;
                break;
            case "right":
                this.maze[y][x].walls["right"] = false;
                this.maze[y][x + 1].walls["left"] = false;
                nX++;
                break;
        }
        if(nX == x && nY == y){return;}
        this.DeleteSet(this.maze[y][x].set,this.maze[nY][nX].set);
    }
    AvailableDirections(x,y){
        let dirs = [];
        if(x > 0){
            if(this.CanBreak(x,y,x-1,y)) dirs.push("left");
        }
        if(x < this.sizeX - 1){
            if(this.CanBreak(x,y,x+1,y)) dirs.push("right");
        }
        if(y > 0){
            if(this.CanBreak(x,y,x,y-1)) dirs.push("up");
        }
        if(y < this.sizeY - 1){
            if(this.CanBreak(x,y,x,y+1)) dirs.push("down");
        }
        return dirs;
    }
    CanBreak(x,y,nX,nY){
        return this.maze[y][x].set != this.maze[nY][nX].set
    }
    DeleteSet(keptSet,delSet){
        this.sets[delSet].forEach((element,i) => {
            element.set = keptSet;
        });
        this.sets[keptSet] = this.sets[keptSet].concat(this.sets[delSet]);
        delete this.sets[delSet];
    }
}
class Cell{
    constructor(x,y,set){
        this.x = x;
        this.y = y;
        this.set = set;
        this.walls = {
            "top": true,
            "bottom": true,
            "left": true,
            "right": true
        }
    }
}

function RandomChoice(obj){
    let index = Math.random() * obj.length;
    index = Math.floor(index);
    return obj[index];
}

export default Maze;
