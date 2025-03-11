let canvas;
let canvasWidth = 360;
let canvasHeight = 560;
let ctx;
let end = true;
let level= 1;
let currentLevel="";
//slider
let sliderWidth = canvasWidth / 4 ;
let sliderHeight = 20;
let sliderX = canvasWidth / 2 - sliderWidth / 2;
let sliderY = canvasHeight - 30;
let sliderSpeedX = 0;

let slider = {
  x: sliderX,
  y: sliderY,
  width: sliderWidth,
  height: sliderHeight
};

//ball
let ballradius = 10;
let ballX = canvasWidth / 2;
let ballY = canvasHeight - 70;
let ballSpeedY = -6;
let ballSpeedX = 0;

let ball = {
  x: ballX,
  y: ballY,
  radius: ballradius
};

//blocks
let blocks = [];

function makeBlocks() {
  blocks = [];
  const minNumCol = 3;
  const minNumRows = 2;

  const numCol = Math.max(minNumCol, Math.floor(Math.random() * 8) + 1);
  const numRows = Math.max(minNumRows, Math.min(4, Math.floor(Math.random() * 5)));

  const blockWidth = (canvasWidth - 10) / numCol - 10;
  const blockHeight = 20;
  const gap = 10;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCol; col++) {
      const blockX = col * (gap + blockWidth) + gap;
      const blockY = row * (gap + blockHeight) + gap;
      blocks.push({
        x: blockX,
        y: blockY,
        width: blockWidth,
        height: blockHeight
      });
    }
  }
}

// #364099
window.onload = function () {
  canvas = document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  ctx = canvas.getContext("2d");

  if(window.innerWidth<700 && end==true){
    document.getElementById("mobile").innerHTML = "<button class='btn btn-main' id='startbtn'>Započni igru</button>";
    document.getElementById("startbtn").addEventListener("click", StartGame);
  }

  //draw first slider
  ctx.fillStyle = "#364099";
  ctx.fillRect(slider.x, slider.y, slider.width, slider.height);

  //draw the first ball
 
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
  
  //make blocks
  makeBlocks();

  requestAnimationFrame(update);
  //events for the slider
  document.addEventListener("keydown", moveSlider);
  document.addEventListener("keyup", stopSlider);
  document.addEventListener("keypress", ResetGame);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchmove", handleTouchMove);
  canvas.addEventListener("touchend", handleTouchEnd);
};

function update() {
  requestAnimationFrame(update);
  if(end){  
    
    return;
}
if (!end){
  document.getElementById("mobile").innerHTML = "";

}
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  slider.x = Math.min(Math.max(slider.x + sliderSpeedX, 0), canvasWidth - sliderWidth);

  ball.y = Math.max(ball.y + ballSpeedY, 0 + ballradius);
  ball.x = Math.min(Math.max(ball.x + ballSpeedX, 0 + ballradius), canvasWidth - ballradius);
  //draw slider per frame
  ctx.fillRect(slider.x, slider.y, slider.width, slider.height);

  //draw ball per frame
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();

  //Collisions
  checkCollisionX(ball.x);
  checkCollisionY(ball.y, ball.x);
  checkBlockCollision();

  //draw Blocks
  drawBlocks();
  if(blocks.length==0){
    level++;
    makeBlocks();
    drawBlocks();
    resetBall();
  }
  //level
    currentLevel = "Level " + level;
    ctx.font = "20px sans-serif";
    ctx.fillText(currentLevel, 15, canvasHeight/2)

    //game over
    if(end){
        ctx.font="32px sans-serif";
        ctx.fillText("IZGUBILI STE", 80, canvasHeight/2+50);
    }
};

function drawBlocks() {
  for (const block of blocks) {
    ctx.fillRect(block.x, block.y, block.width, block.height);
  }
}

function moveSlider(event) {
  if (event.code == "ArrowLeft") {
    sliderSpeedX = -5;
    
   

  } else if (event.code == "ArrowRight") {
    sliderSpeedX = 5;
   
  }
}
function ResetGame(event){
    if (event && event.code == "Space"){
        ballSpeedX = 0;
        ballSpeedY = -5;
        ball.x = ballX;
        ball.y = ballY;
        slider.x = sliderX;
        slider.y = sliderY;
        sliderSpeedX = 0;
        level = 1;
        end = false;
        makeBlocks();
    }
}
function StartGame(){
  document.getElementById("mobile").innerHTML = "";
      ballSpeedX = 0;
      ballSpeedY = -5;
      ball.x = ballX;
      ball.y = ballY;
      slider.x = sliderX;
      slider.y = sliderY;
      sliderSpeedX = 0;
      level = 1;
      end = false;
      makeBlocks();
  
}
function stopSlider(event) {
  if (event.code == "ArrowLeft") {
    sliderSpeedX = 0;
  } else if (event.code == "ArrowRight") {
    sliderSpeedX = 0;
  }
}

function checkCollisionX(x) {
  if (x == 0 + ballradius) {
    ballSpeedX = 5;
    return ballSpeedX;
  } else if (x == canvasWidth - ballradius) {
    ballSpeedX = -5;
    return ballSpeedX;
  }
}

function checkCollisionY(y, x) {
  if (y == 0 + ballradius) {
    ballSpeedY = 5;
    return ballSpeedY;
  } else if (y + ballradius >= slider.y && x + ballradius >= slider.x && x - ballradius <= slider.x + slider.width) {
    const sliderPosition = (x - slider.x) / sliderWidth;
    ballSpeedX = 5 * (2 * sliderPosition - 1);

    ballSpeedY = -5;
    return ballSpeedY;
  } else if (y > canvasHeight) {
    end= true;
    document.getElementById("mobile").innerHTML = "<button class='btn btn-main' id='startbtn' onclick='StartGame()'>Započni igru</button>";
  }
}

function checkBlockCollision() {
  let collidedBlockIndex = -1;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (
      ball.x + ball.radius > block.x &&
      ball.x - ball.radius < block.x + block.width &&
      ball.y + ball.radius > block.y &&
      ball.y - ball.radius < block.y + block.height
    ) {
      
      collidedBlockIndex = i;
      break; 
    }
  }

  if (collidedBlockIndex !== -1) {
    // Remove block
    blocks.splice(collidedBlockIndex, 1);
    ballSpeedY = -ballSpeedY; 
   
  }
}

function resetBall() {
  ballSpeedX = 0;
  ballSpeedY = -5;
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight - 70;
}

let touchStartX = 0;
function handleTouchStart(event) {
  canvas.scrollIntoView();
  event.preventDefault();
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  event.preventDefault();
  const touchX = event.touches[0].clientX;
  const deltaX = touchX - touchStartX;
  canvas.scrollIntoView();
 
  const sensitivity = 0.8;

  
  slider.x = Math.min(Math.max(slider.x + deltaX * sensitivity, 0), canvasWidth - sliderWidth);

  
  touchStartX = touchX;
}

