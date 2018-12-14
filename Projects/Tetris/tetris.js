
const canvas = document.getElementById('tetris');
const contex = canvas.getContext('2d');
//Scale the context because pieces appear small
contex.scale(20,20);

//to take control over the time that the piece
//should take to go down one step
let dropCounter = 0;
//If we want the piece drop faster, 
//just decrease the interval
let dropInterval = 1000;

let lastTime = 0;

//this is the space of work
//where the pieces will be stored
const arena = createMatrix(12, 20);
console.log(arena);
console.table(arena);

//This is the T figure
const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0], 
];

const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
}

function collide(arena, player){
    //m for matrix
    //o for offset
    const [m , o] = [player.matrix, player.pos];
    for(let y = 0; y < m.length; y++){
        for(let x = 0; x < m[y].length; x++){
            if(m[y][x] !== 0 && 
                (arena[y + o.y] && 
                arena[y + o.y][x + o.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

//create the matrix to store the pieces
function createMatrix(width, height){
    const matrix = [];
    while(height--){
        matrix.push(new Array(width).fill(0));
    }

    return matrix;
}

function draw(){
    contex.fillStyle = '#000' ;
    contex.fillRect(0,0, canvas.clientWidth, canvas.height);

    //draw the arena to see the previous pieces
    drawMatrix(arena, {x: 0, y: 0});
    //draw the player matrix to see the current piece
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                contex.fillStyle = 'red';
                contex.fillRect(x + offset.x,
                                y + offset.y,
                                1, 1);
            }
        });
    });
}

function update(time = 0){
    //get actual time - last time
    const deltaTime = time - lastTime;
    lastTime = time;
    //add the difference between times
    dropCounter += deltaTime;
    //if dropCounter > 1000 ms the piece will go down 1+
    if(dropCounter > dropInterval){
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

//copy the final position of the piece into to the space of work
function merge(arena, player){
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerMove(direction){
    player.pos.x += direction;
    //check if it collide with the lateral walls
    if(collide(arena, player)){
        player.pos.x -= direction;
    }
}

//Make the piece down a step
function playerDrop(){
    player.pos.y++;
    //check if it collide agains any other 
    //already set piece or again the bottom wall
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

//Rotate the piece to the left
function rotateLeft(matrix){
    var copy = createMatrix(matrix.length, matrix[0].length);
    for(let j = 0; j < matrix.length; j++){
        var height = copy.length - 1;
        for(let i = 0; i < matrix[j].length; i++){
            let value = matrix[j][i];
            copy[height][j] = value;
            height--;
        }
    } 
    return copy;
}

//Rotate the piece to the right
function rotateRight(matrix){
    var copy = createMatrix(matrix.length, matrix[0].length);
    var width = copy.length - 1;
    for(let j = 0; j < matrix.length; j++){
        for(let i = 0; i < matrix[j].length; i++){
            let value = matrix[j][i];
            copy[i][width] = value;
        }
        width--;
    } 
    
    return copy;
}

document.addEventListener('keydown', event => {
    if(event.keyCode === 37){
        //The number 37 represents the arrow left
        playerMove(-1);
    }
    else if(event.keyCode === 39){
        //The number 39 represents the right arrow
        playerMove(1);
    }
    else if(event.keyCode === 40){
        //The number 40 represents the down arrow
        playerDrop();
    }
    else if(event.keyCode === 82){
        //The number 82 represents the letter R -> Right
        let offset = 1;
        player.matrix = rotateRight(player.matrix);
        while(collide(arena, matrix)){
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : - 1));

            if(offset > player.matrix[0].length){
                
            }
        }

    }
    else if(event.keyCode === 76){
        //The number 79 represents the letter L -> Left
        player.matrix = rotateLeft(player.matrix);
    }
});

update();