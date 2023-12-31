const Directions = {
    "top": {
        "deltaX": 0,
        "deltaY": -1,
        "opposite": "bottom"
    },
    "bottom": {
        "deltaX": 0,
        "deltaY": 1,
        "opposite": "top"
    },
    "left": {
        "deltaX": -1,
        "deltaY": 0,
        "opposite": "right"
    },
    "right": {
        "deltaX": 1,
        "deltaY": 0,
        "opposite": "left"
    }
}
class Cell{
    constructor(x,y,set){
        this.x = x;
        this.y = y;
        this.set = set;
        this.choosable = true;
        this.walls = {
            "top": true,
            "bottom": true,
            "left": true,
            "right": true
        }
        this.sides = [];
    }
    UpdateSides(mazeWidth,mazeHeight){
        if(this.x > 0) this.sides.push("left");
        if(this.x < mazeWidth - 1) this.sides.push("right");
        if(this.y > 0) this.sides.push("top");
        if(this.y < mazeHeight - 1) this.sides.push("bottom");
    }
}
class Maze{
    constructor(width, height){
        let startTime = Date.now();
        this.sets = {};
        this.maze = [];
        this.width = width;
        this.height = height;
        let i = 0;
        for(let y = 0; y < this.height; y++){
            let row = new Array();
            for(let x = 0; x < this.width; x++){
                let cell = new Cell(x,y,i);
                cell.UpdateSides(this.width,this.height)
                row.push(cell);
                this.sets[i] = [cell];
                i++;
            }
            this.maze.push(row);
        }
        while(Object.keys(this.sets).length > 1){
            this.BreakWall();
        }
        console.log("Time: ", Date.now() - startTime);
    }
    CellFromDir(cell,dir){
        let deltaX = Directions[dir]["deltaX"];
        let deltaY = Directions[dir]["deltaY"];
        return this.maze[cell.y + deltaY][cell.x + deltaX];
    }
    BreakWall(){
        let chosenKey = RandomChoice(Object.keys(this.sets));
        let chosenSet = this.sets[chosenKey]; // Chooses a random set
        chosenSet = chosenSet.filter(cell => cell.choosable);
        let chosenCell = RandomChoice(chosenSet); // Chooses random cell from set

        // Get cell position
        let x = chosenCell.x;
        let y = chosenCell.y;

        let directionOptions = this.AvailableDirections(chosenCell);
        if(directionOptions.length == 0) return true;
        let dir = RandomChoice(directionOptions); // Chooses random direction

        let nX = x + Directions[dir]["deltaX"];
        let nY = y + Directions[dir]["deltaY"];
        
        this.maze[y][x].walls[dir] = false;
        this.maze[nY][nX].walls[Directions[dir]["opposite"]] = false;

        this.DeleteSet(this.maze[y][x].set,this.maze[nY][nX].set);
    }
    AvailableDirections(cell){
        let dirs = [];
        cell.sides.forEach(side => {
            if(cell.set != this.CellFromDir(cell,side).set) dirs.push(side);
        });
        return dirs;
    }
    DeleteSet(keptSet,delSet){
        this.sets[delSet].forEach((element,i) => {
            element.set = keptSet;
            this.sets[keptSet].push(element);
            if(this.AvailableDirections(element).length == 0) element.choosable = false;
        });
        this.sets[keptSet].forEach((element,i) => {
            if(this.AvailableDirections(element).length == 0) element.choosable = false;
        });
        //this.sets[keptSet].push(...this.sets[delSet]);
        delete this.sets[delSet];
    }
}


function RandomChoice(obj){
    let index = Math.random() * obj.length;
    index = Math.floor(index);
    return obj[index];
}

export default Maze;
