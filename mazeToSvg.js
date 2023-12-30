function parseMaze(mazeObj){
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttributeNS(null,"viewBox", `0 0 ${mazeObj.width} ${mazeObj.height}`)

    let maze = [].concat(...mazeObj.maze);
    maze.forEach(cell => {
        // Draws line if wall exists
        Object.keys(cell.walls).forEach(wall => {
            if(cell.walls[wall]){
                let line = CreateLine(cell.x,cell.y,wall);
                svg.appendChild(line);
            }
        });
    });

    return svg;
}

const wallCorners = {
    "top": [0,0,1,0],
    "bottom": [0,1,1,1],
    "right": [1,0,1,1],
    "left": [0,0,0,1]
};
function CreateLine(x,y,side){
    let newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newLine.setAttribute("stroke", "black");
    newLine.setAttribute("stroke-width", .1);
    newLine.setAttribute("x1", (x + wallCorners[side][0]));
    newLine.setAttribute("y1", (y + wallCorners[side][1]));
    newLine.setAttribute("x2", (x + wallCorners[side][2]));
    newLine.setAttribute("y2", (y + wallCorners[side][3]));
    return newLine;
}

export default parseMaze;