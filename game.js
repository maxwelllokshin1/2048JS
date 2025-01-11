const canvas = document.getElementById('game2048');
const ctx = canvas.getContext('2d');

let count = 0;

let block = 
    {
        x: 0,
        y: 0,
        width: canvas.width/4,
        height: canvas.height/4,
        value: 0,
        dx: canvas.width/4,
        dy: canvas.height/4
    }

let arrayBlocks = [];

let gameLoop;

let gameOver = false;

function draw()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    arrayBlocks.forEach(function(element) {
        switch (element.value) {
            case 2: ctx.fillStyle = '#eee4da'; break;
            case 4: ctx.fillStyle = '#ede0c8'; break;
            case 8: ctx.fillStyle = '#f2b179'; break;
            case 16: ctx.fillStyle = '#f59563'; break;
            case 32: ctx.fillStyle = '#f67c5f'; break;
            case 64: ctx.fillStyle = '#f65e3b'; break;
            case 128: ctx.fillStyle = '#edcf72'; break;
            case 256: ctx.fillStyle = '#edcc61'; break;
            case 512: ctx.fillStyle = '#edc850'; break;
            case 1024: ctx.fillStyle = '#edc53f'; break;
            case 2048: ctx.fillStyle = '#edc22e'; break;
        }
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.fillStyle = 'black';
        ctx.fillText(element.value, element.x + element.width / 2, element.y + element.height / 2);
    });

    if(gameOver)
    {
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }
}

function addBlock()
{

    let newBlock = 
    {
        x: Math.floor(Math.random() * 4) * block.width,
        y: Math.floor(Math.random() * 4) * block.height,
        width: canvas.width/4,
        height: canvas.height/4,    
        value: Math.random() < 0.9 ? 2 : 4
    }

    while (arrayBlocks.some(element => element.x === newBlock.x && element.y === newBlock.y)) {
        newBlock.x = Math.floor(Math.random() * 4) * block.width;
        newBlock.y = Math.floor(Math.random() * 4) * block.height;
    }

    arrayBlocks.push(newBlock);
}

function moveBlock(direction){
    
    let move = false;
    let merged = [];

    arrayBlocks.forEach(function(element) {
        let originalX = element.x;
        let originalY = element.y;

        switch (direction) {
            case 'w':  
                while (element.y > 0 && !checkCollision(element, 'up', merged)) {
                    element.y -= block.dy;
                    move = true;
                }
                break;
            case 'a':  
                while (element.x > 0 && !checkCollision(element, 'left', merged)) {
                    element.x -= block.dx;
                    move = true;
                }
                break;
            case 's': 
                while (element.y < canvas.height - block.height && !checkCollision(element, 'down', merged)) {
                    element.y += block.dy;
                    move = true;
                }
                break;
            case 'd':  
                while (element.x < canvas.width - block.width && !checkCollision(element, 'right', merged)) {
                    element.x += block.dx;
                    move = true;
                }
                break;
        }

    });
    if(move)
    {
        addBlock();
        if(isGameOver()){
            gameOver = true;
        }
    }
}

function isGameOver() {
    if (arrayBlocks.length === 16) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let block1 = arrayBlocks.find(b => b.x / block.width === i && b.y / block.height === j);
                if (i < 3 && block1.value === arrayBlocks.find(b => b.x / block.width === i + 1 && b.y / block.height === j)?.value) return false;
                if (j < 3 && block1.value === arrayBlocks.find(b => b.x / block.width === i && b.y / block.height === j + 1)?.value) return false;
            }
        }
        return true;
    }
    return false;
}


function checkCollision(currentBlock, direction, merged) {
    for (let element of arrayBlocks) {
        if (currentBlock === element) continue;

        switch (direction) {
            case 'up':
                if (currentBlock.x === element.x && currentBlock.y - block.dy === element.y) {
                    if(currentBlock.value === element.value){
                        element.value += currentBlock.value;
                        merged.push(element);
                        arrayBlocks = arrayBlocks.filter(b => b !== currentBlock);
                        return false;
                    }else if (currentBlock.value !== element.value){ return true; }
                }
                break;
            case 'down':
                if (currentBlock.x === element.x && currentBlock.y + block.dy === element.y) {
                    if(currentBlock.value === element.value){
                        element.value += currentBlock.value;
                        merged.push(element);
                        arrayBlocks = arrayBlocks.filter(b => b !== currentBlock);
                        return false;
                    }else if (currentBlock.value !== element.value){ return true; }
                }
                break;
            case 'left':
                if (currentBlock.y === element.y && currentBlock.x - block.dx === element.x) {
                    if(currentBlock.value === element.value){
                        element.value += currentBlock.value;
                        merged.push(element);
                        arrayBlocks = arrayBlocks.filter(b => b !== currentBlock);
                        return false;
                    }else if (currentBlock.value !== element.value){ return true; }
                }
                break;
            case 'right':
                if (currentBlock.y === element.y && currentBlock.x + block.dx === element.x) {
                    if(currentBlock.value === element.value){
                        element.value += currentBlock.value;
                        merged.push(element);
                        arrayBlocks = arrayBlocks.filter(b => b !== currentBlock);
                        return false;
                    }else if (currentBlock.value !== element.value){ return true; }
                }
                break;
        }
    }
    return false;
}

document.addEventListener('keydown', (event) => {
    if (['w', 'a', 's', 'd', ' '].includes(event.key)) {
        event.preventDefault(); 
        moveBlock(event.key);

        if(gameOver){
            if(event.key === ' ') resetGame();
        }
    }
});

function resetGame()
{   
    cancelAnimationFrame(gameLoop);
    arrayBlocks.length = 0;
    gameOver = false;
    startGame();
}


function startGame()
{
    addBlock();
    addBlock();
    function loop()
    {
        gameLoop = requestAnimationFrame(loop);

        if(++count < 1)
        {
            return;
        }
        count = 0;
        draw();
    }
    gameLoop = requestAnimationFrame(loop);
}

startGame();
