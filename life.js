const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resolution = 30;
canvas.width = 600;
canvas.height = 600;
const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = buildGrid();

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[row][col];
            ctx.beginPath();
            //rect ( x , y , width , height)
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'yellow' : 'blue';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function nextGen(grid) {
    //makes a copy of perivious grid 
    const nextGen = grid.map(arr => [...arr])

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbors = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    // if x and ycell is grater than or eqals to zero but less than cols(2) means it is 0 or 1

                    if (xCell >= 0 && yCell >= 0 && xCell < COLS && yCell < ROWS) {
                        numNeighbors += grid[xCell][yCell];
                    }
                }
            }

            //if cell value is 1 and num of neib is less than 2 than the cell dies(0) due to low population
            if (cell === 1 && numNeighbors < 2) {
                nextGen[col][row] = 0;
            }
             //if cell value is 1 and num of neib is less than 2 than the cell dies(0) due to over population
        
            else if (cell === 1 && numNeighbors > 3) {
                nextGen[col][row] = 0;
            }
             // the cell only survives when the neibour population is 3 and cell is at 0
            
            else if (cell === 0 && numNeighbors === 3) {
                nextGen[col][row] = 1;
            }
            else if(cell === 0 && numNeighbors ===4){
                 nextGen[col][row] =1;
            }
        }
    }
    return nextGen;
}
function update() {
    grid = nextGen(grid);
    render(grid);
    setTimeout(update , 150);
}

update();

