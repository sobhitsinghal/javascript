document.addEventListener("DOMContentLoaded", () => {
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};
    let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];  
    let dx = cellSize; // displacement on x axis
    let dy = 0; // displacement on y axis
    let gameSpeed = 200;


    function drawScoreboard() {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`; 
    }

    function drawDiv(x, y, className) {
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = ''; // if previously something is drawn remove it 

        snake.forEach((snakeCell) => {
            const element = drawDiv(snakeCell.x, snakeCell.y,'snake');
            gameArena.appendChild(element);
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);

    }

    function movefood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize))*cellSize;
            newY = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize))*cellSize;
        } while(snake.some((cell) => cell.x === newX && cell.y === newY));

        food = {x: newX, y: newY};
    }
    
    function updateSnake() {
        console.log('updating snake');
        // 1. Calculate new coordinate the snake head will go
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead); // add the new head to the snake
        if(newHead.x === food.x && newHead.y === food.y) {
            // collision
            console.log("Collided");
            score += 10;
            if(gameSpeed > 30)
                gameSpeed -= 10;
            // dont pop the tail
            // move the food
        }else {
        snake.pop(); // remove the last element of the snake
    }
}

    function isGameOver() {
        // check snake collision with itself
        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true; // game over
            }

        // check snake collision with the walls
        const isHittingLeftWall = snake[0].x < 0;
        const isHittingTopWall = snake[0].y < 0;
        const isHittingRightWall = snake[0].x >= arenaSize;
        const isHittingBottomWall = snake[0].x >= arenaSize;

        return isHittingLeftWall || isHittingTopWall || isHittingRightWall || isHittingBottomWall;
    }

    function gameLoop() {
        setInterval(() => {
            if(!gameStarted) return;
            // check if the game is over
            if(isGameOver()) {
                gameStarted = false;
                alert(`Game Over, Score = ${score}`);
                window.location.reload();
                return;
            }
            updateSnake();
            drawScoreboard();
            drawFoodAndSnake();

        }, gameSpeed);
    }

    function changeDirection(event) {
        console.log(event.keyCode);
        // get the key pressed
        const LEFT_KEY = 37;
        const UP_KEY = 38;
        const RIGHT_KEY = 39;
        const DOWN_KEY = 40;

        const keyPressed = event.keyCode;

        const isGoingUp = dy === -cellSize;
        const isGoingDown = dy === cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        if(keyPressed === LEFT_KEY && !isGoingRight) {dy = 0; dx = -cellSize;}

        if(keyPressed === RIGHT_KEY && !isGoingLeft) {dy = 0; dx = cellSize;}

        if(keyPressed === UP_KEY && !isGoingDown) {dx = 0; dy = -cellSize;}

        if(keyPressed === DOWN_KEY && !isGoingUp) {dx = 0; dy = cellSize;}
    }


    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            gameLoop();
            document.addEventListener('keydown', changeDirection);
        }

    }


    function initiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard, gameArena);


        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            runGame();
        })
    }


    initiateGame(); // this is the first function to be executed so that we prepare the ui
});