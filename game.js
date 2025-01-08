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
    arrayBlocks.forEach(function(element){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.fillStyle = 'black';
        ctx.fillText(element.value, element.x+element.width/2, element.y+element.height / 2);
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
        value: Math.floor(Math.random()*2) ? 2 : 4
    }

    for(let element of arrayBlocks)
    {
        while(newBlock.x === element.x && newBlock.y === element.y)
        {
            newBlock.x =  Math.floor(Math.random() * 4) * block.width;
            newBlock.y =  Math.floor(Math.random() * 4) * block.height;
        }
    }

    arrayBlocks.push(newBlock);
}

function checkCollsion(currentBlock)
{
    for(let element of arrayBlocks)
    {
        if(currentBlock === element) continue;
        if( currentBlock !== element && 
            currentBlock.x < element.x+element.width && 
            currentBlock.x+currentBlock.width > element.x &&
            currentBlock.y < element.y+element.height && 
            currentBlock.y+currentBlock.height > element.y && 
            currentBlock.value !== element.value){
            console.log('touch');
            return true;
        }

        if( currentBlock !== element &&
            currentBlock.x === element.x &&
            currentBlock.y === element.y &&
            currentBlock.value === element.value){
                element.value += currentBlock.value;
                arrayBlocks.splice(currentBlock, 1);
                console.log('currentBlock.value' + element.value);
        }
    }
    return false;
}


// project block check if collision
// If collision stop at current



document.addEventListener('keydown', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) {
        event.preventDefault(); 

        arrayBlocks.forEach(function (element) {
            let originalX = element.x;
            let originalY = element.y;
            switch (event.key) {
                case 'w':

                    if (element.y > 0 && !checkCollsion(element)) {
                        element.y -= block.dy;
                    }
                    
                    break;
                case 'a':
                    if (element.x > 0 && !checkCollsion(element)) {
                        element.x -= block.dx;
                    }
                    break;
                case 's':
                    if (element.y < canvas.height - block.height && !checkCollsion(element)) {
                
                        element.y += block.dy;
                    }
                    break;
                case 'd':
                    if (element.x < canvas.width - block.width && !checkCollsion(element)) {
                        element.x += block.dx;
                    }
                    break;
            }

            if (checkCollsion(element)) {
                element.x = originalX;
                element.y = originalY;
            }
        });
        addBlock();
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

        if(++count < 20)
        {
            return;
        }
        count = 0;
        draw();
    }
    gameLoop = requestAnimationFrame(loop);
}

startGame();