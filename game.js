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

function draw()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    arrayBlocks.forEach(function(element) {
        switch (element.value) {
            case 2:
                ctx.fillStyle = '#eee4da';
                break;
            case 4:
                ctx.fillStyle = '#ede0c8';
                break;
            case 8:
                ctx.fillStyle = '#f2b179';
                break;
            case 16:
                ctx.fillStyle = '#f59563';
                break;
            case 32:
                ctx.fillStyle = '#f67c5f';
                break;
            case 64:
                ctx.fillStyle = '#f65e3b';
                break;
            case 128:
                ctx.fillStyle = '#edcf72';
                break;
            case 256:
                ctx.fillStyle = '#edcc61';
                break;
            case 512:
                ctx.fillStyle = '#edc850';
                break;
            case 1024:
                ctx.fillStyle = '#edc53f';
                break;
            case 2048:
                ctx.fillStyle = '#edc22e';
                break;
        }
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.fillStyle = 'black';
        ctx.fillText(element.value, element.x + element.width / 2, element.y + element.height / 2);
    });
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
            case 'w':  // Move up
                while (element.y > 0 && !checkCollision(element, 'up', merged)) {
                    element.y -= block.dy;
                    move = true;
                }
                break;
            case 'a':  // Move left
                while (element.x > 0 && !checkCollision(element, 'left', merged)) {
                    element.x -= block.dx;
                    move = true;
                }
                break;
            case 's':  // Move down
                while (element.y < canvas.height - block.height && !checkCollision(element, 'down', merged)) {
                    element.y += block.dy;
                    move = true;
                }
                break;
            case 'd':  // Move right
                while (element.x < canvas.width - block.width && !checkCollision(element, 'right', merged)) {
                    element.x += block.dx;
                    move = true;
                }
                break;
        }

        // If the block moved, add a new block to the board
    });
    if(move)
    {
        addBlock();
    }
    // addBlock();
}

// function checkCollision(currentBlock)
// {
//     for(let element of arrayBlocks)
//     {
//         if(currentBlock === element) continue;
//         if( currentBlock !== element && 
//             currentBlock.x < element.x+element.width && 
//             currentBlock.x+currentBlock.width > element.x &&
//             currentBlock.y < element.y+element.height && 
//             currentBlock.y+currentBlock.height > element.y && 
//             currentBlock.value !== element.value){
//             console.log('touch');
//             return true;
//         }

//         if( currentBlock !== element &&
//             currentBlock.x === element.x &&
//             currentBlock.y === element.y &&
//             currentBlock.value === element.value){
//                 element.value += currentBlock.value;
//                 console.log('currentBlock.value' + element.value);
//         }
//     }
//     return false;
// }

function checkCollision(currentBlock, direction, merged) {
    for (let element of arrayBlocks) {
        if (currentBlock === element) continue;

        // Check for possible merging or collisions in each direction
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


// project block check if collision
// If collision stop at current



document.addEventListener('keydown', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) {
        event.preventDefault(); 
        moveBlock(event.key);
        // arrayBlocks.forEach(function (element) {
        //     let originalX = element.x;
        //     let originalY = element.y;
        //     switch (event.key) {
        //         case 'w':

        //             if (element.y > 0 && !checkCollsion(element)) {
        //                 element.y -= block.dy;
        //             }
                    
        //             break;
        //         case 'a':
        //             if (element.x > 0 && !checkCollsion(element)) {
        //                 element.x -= block.dx;
        //             }
        //             break;
        //         case 's':
        //             if (element.y < canvas.height - block.height && !checkCollsion(element)) {
                
        //                 element.y += block.dy;
        //             }
        //             break;
        //         case 'd':
        //             if (element.x < canvas.width - block.width && !checkCollsion(element)) {
        //                 element.x += block.dx;
        //             }
        //             break;
        //     }

        //     if (checkCollsion(element)) {
        //         element.x = originalX;
        //         element.y = originalY;
        //     }
        // });
        // addBlock();
        console.log('arrayBlocks.length' + arrayBlocks.length);
    }
});


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