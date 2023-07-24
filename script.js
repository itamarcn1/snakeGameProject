const canvas = document.querySelector("canvas#world")
const ctx = canvas.getContext("2d")
let result = document.querySelector("#result")

let initialInterval = 150;
let applesEaten = 0; // Track the number of apples eaten

//creating initial snake values
let snakeSizeWidth = 15
let snakeSizeHeight = 15
let snakeX = canvas.width / 2 - snakeSizeWidth
let snakeY = canvas.height / 2 - snakeSizeHeight
let dx = snakeSizeWidth; // snake's horizontal movement
let dy = 0; // snake's vertical movement

//creating apple values
let appleX = Math.random() * (canvas.width - snakeSizeWidth)
let appleY = Math.random() * (canvas.height - snakeSizeHeight)
let appleSize = 15

//making a counter
let score = 0
function counter(){
    ctx.font = "16px Ariel"
    ctx.fillStyle = "black"
    ctx.fillText(`Score:${score}`,8,20)
    
}
// creating snake
function drawSnake(){
    snakeBody.forEach((snakePart) => {
        ctx.beginPath();
        ctx.rect(snakePart.x, snakePart.y, snakeSizeWidth, snakeSizeHeight);
        ctx.fillStyle = "yellow"
        ctx.fill();
        ctx.closePath();
    })
}
//check if snake hit walls
function snakeHitWall() {
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        clearInterval(interval)
        gameOver()
    }
  }

  
// Check if the snake collides with itself
  function snakeHitItself() {
      for (let i = 1; i < snakeBody.length; i++) {
          if (snakeBody[i].x === snakeX && snakeBody[i].y === snakeY) {
              clearInterval(interval);
              gameOver()
            }
        }
    }


//shows player he lost
function gameOver(){
    canvas.style.display = "none"
    result.innerHTML = `
        <div id="game_over_div">
        <h2>Game Over</h2>
        <p>Your score: ${score}</p>
        <p>want another try?</p>
        <button onclick="anotherGame()">click here!</button>
        </div>
        `
}

//start a new game after losing and clicking on button
function anotherGame(){
    location.reload()
}

//making the keyboard control the game
document.addEventListener("keydown", keyHandler, false)
function keyHandler(e) {
    switch (e.key) {
      case "Right":
      case "ArrowRight":
        if (dx !== -snakeSizeWidth) { // checks the movement direction
          dx = snakeSizeWidth
          dy = 0;
        }
        break;
      case "Left":
      case "ArrowLeft":
        if (dx !== snakeSizeWidth) { 
          dx = -snakeSizeWidth
          dy = 0;
        }
        break;
      case "Up":
      case "ArrowUp":
        if (dy !== snakeSizeHeight) { 
          dx = 0;
          dy = -snakeSizeHeight
        }
        break;
      case "Down":
      case "ArrowDown":
        if (dy !== -snakeSizeHeight) { 
          dx = 0;
          dy = snakeSizeHeight
        }
        break;
    }
}

//draw apple 
function drawApple(){
    ctx.beginPath()
    ctx.rect(appleX,appleY,appleSize, appleSize)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()

}

//creating apple and counting times eaten
function eatApple(){

    if(  snakeX < appleX + appleSize &&
        snakeX + snakeSizeWidth > appleX &&
        snakeY < appleY + appleSize &&
        snakeY + snakeSizeHeight > appleY
      )
    {
        console.log("eat")
        biggerSnake()
        counter(score = score + 10)
        drawApple()
        appleX = Math.random() * (canvas.width - snakeSizeWidth)
        appleY = Math.random() * (canvas.height - snakeSizeHeight)

        // Increase speed after eating 10 apples
        applesEaten++;
        if (applesEaten % 10 === 0) {
          clearInterval(interval)
          initialInterval -= 30;
          interval = setInterval(draw, initialInterval);
        
        }
    }else{
        drawApple()
        counter()

    }
}

// making snake larger when eating an apple
let snakeBody = [{ x: snakeX, y: snakeY }]
function biggerSnake(){
    const snakePart = { x: snakeBody[0].x, y: snakeBody[0].y }
    snakeBody.push(snakePart)

}

//starting game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //update snake position
    snakeX += dx
    snakeY += dy

    snakeHitWall()
    snakeHitItself()
  
    // Move the snake body parts
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i].x = snakeBody[i - 1].x
      snakeBody[i].y = snakeBody[i - 1].y
    }
  
    // Update the position of the the snake head to match new part of snake
    snakeBody[0].x = snakeX
    snakeBody[0].y = snakeY
  
    drawSnake()
    eatApple()
  }



let interval = setInterval(draw, initialInterval)
