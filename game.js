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

function checkCollsion()
{
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

    arrayBlocks.push(newBlock);
}

document.addEventListener('keydown', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) {
        event.preventDefault(); 

        arrayBlocks.forEach(function (element) {
            let curX = element.x;
            let curY = element.y;
            
            switch (event.key) {
                case 'w':
                    while (element.y > 0) {
                        
                        element.y -= block.dy;
                    }
                    break;
                case 'a':
                    while (element.x > 0) {
                        element.x -= block.dx;
                    }
                    break;
                case 's':
                    while (element.y < canvas.height - block.height) {
                        element.y += block.dy;
                    }
                    break;
                case 'd':
                    while (element.x < canvas.width - block.width) {
                        element.x += block.dx;
                    }
                    break;
            }
        });
    }
});


function startGame()
{

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

addBlock();
addBlock();
startGame();