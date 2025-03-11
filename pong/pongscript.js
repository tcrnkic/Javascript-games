let canvas;
let canvasWidth = 300;
let canvasHeight = 540;
let ctx;


let end = false;

let sliderWidth = canvasWidth / 3.5 ;
let sliderHeight = 20;

let playeroneX = canvasWidth / 2 - sliderWidth / 2;
let playeroneY = canvasHeight - 30;

let playertwoX = canvasWidth / 2 - sliderWidth / 2;
let playertwoY = 15;

let sliderSpeedOne = 0;
let sliderSpeedTwo = 0;

let playerOneScore = 0;
let playerTwoScore = 0;

let playerone = {
    x: playeroneX,
    y: playeroneY,
    width: sliderWidth,
    height: sliderHeight
  };
let playertwo = {
    x: playertwoX,
    y: playertwoY,
    width: sliderWidth,
    height: sliderHeight
  };

let ballradius = 10;
let ballX = canvasWidth / 2;
let ballY = canvasHeight /2;
let ballSpeedY = -8;
let ballSpeedX = 0;
  
let ball = {
    x: ballX,
    y: ballY,
    radius: ballradius
  };
setInterval(() => {
  if(window.innerWidth <= 800){
    document.getElementById("tutor").innerHTML= "Sadly this game isnt availabe for mobile.";
    document.getElementById("handle").innerHTML= "";
    end = true;
  }else{
    document.getElementById("tutor").innerHTML = "Player one use W and A to move. <br> Player two use the left and right arrow keys to move.";
    document.getElementById("handle").innerHTML= "First to 5 Wins!";
    end = false;
  }

}, 100);
function drawPlayers(){
    ctx.fillStyle = "blue";
    ctx.fillRect(playerone.x, playerone.y, playerone.width, playerone.height);

    ctx.fillStyle = "red";
    ctx.fillRect(playertwo.x, playertwo.y, playertwo.width, playertwo.height);
}

window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    ctx = canvas.getContext("2d");

    //draw players
    drawPlayers();

    //draw ball
    ctx.fillStyle ="white";
    ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveSliderOne);
    document.addEventListener("keyup", stopSliderOne);
    document.addEventListener("keydown", moveSliderTwo);
    document.addEventListener("keyup", stopSliderTwo);
    
};

function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawScore();
    checkWinner();
    if (end){
      return;
    }
    


    playerone.x = Math.min(Math.max(playerone.x + sliderSpeedOne, 0), canvasWidth - sliderWidth);
    playertwo.x = Math.min(Math.max(playertwo.x + sliderSpeedTwo, 0), canvasWidth - sliderWidth);

      //draw players
      drawPlayers();

      ball.y = Math.max(ball.y + ballSpeedY, 0 + ballradius);
      ball.x = Math.min(Math.max(ball.x + ballSpeedX, 0 + ballradius), canvasWidth - ballradius);
      //draw ball
      ctx.fillStyle ="white";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      ctx.fill();    
    
      //score
      drawScore();
    //collisions
    checkCollisionX(ball.x);
    checkPlayerCol(ball.y, ball.x)
    checkForScore();
    
};
let exists = false;
function checkWinner(){
    if(playerOneScore >= 5 && playerTwoScore <5){
      ctx.fillStyle = "blue";
      ctx.font="32px sans-serif"
      ctx.fillText("Winner!", canvasWidth /2 - 60 , canvasHeight/2);
      end = true;
      if (!exists){
        resetButton();
        exists = true;
      }
    }else if(playerTwoScore >= 5 && playerOneScore <5){
      ctx.fillStyle = "red";
      ctx.font="32px sans-serif"
      ctx.fillText("Winner!", canvasWidth /2 - 60 , canvasHeight/2);
      end = true;
      if (!exists){
        resetButton();
        exists = true;
      }
    } 
};
function resetButton(){
    let resetbtn = document.createElement('button');
    resetbtn.id = 'resetButton';
    resetbtn.innerHTML = 'Play again!';
    resetbtn.addEventListener('click', resetGame);
    resetbtn.classList.add('btn', 'btn-main', 'py-2' , 'px-4')
    document.querySelector('.col-2').appendChild(resetbtn);
}

function resetGame(){
  end = false;
  playerOneScore = 0;
  playerTwoScore = 0;
  resetBall();
  document.getElementById('resetButton').remove();
}

function moveSliderOne(event) {
    if (event.code == "ArrowLeft") {
      sliderSpeedOne = -5;
      
     
  
    } else if (event.code == "ArrowRight") {
      sliderSpeedOne = 5;
     
    }
  };

  function stopSliderOne(event) {
    if (event.code == "ArrowLeft") {
      sliderSpeedOne = 0;
      console.log("arrow")
    } else if (event.code == "ArrowRight") {
      sliderSpeedOne = 0;
    }
  };

  function moveSliderTwo(event) {
    if (event.key == "a" ||event.key == "A") {
      sliderSpeedTwo = -5;
      console.log("A press");
    } else if (event.key == "D" || event.key =="d") {
      sliderSpeedTwo = 5;
     
    }
  };

  function stopSliderTwo(event) {
    if (event.key == "a" ||event.key == "A") {
      sliderSpeedTwo = 0;
    } else if (event.key == "D" || event.key =="d") {
      sliderSpeedTwo = 0;
    }
  };

  function checkCollisionX(x) {
    if (x == 0 + ballradius) {
      ballSpeedX = 7;
      return ballSpeedX;
    } else if (x == canvasWidth - ballradius) {
      ballSpeedX = -7;
      return ballSpeedX;
    }
  };
  function checkPlayerCol(y, x) {
    if (y + ballradius >= playerone.y && x + ballradius >= playerone.x && x - ballradius <= playerone.x + playerone.width) {
        const sliderPosition = (x - playerone.x) / playerone.width;
        ballSpeedX = 7 * (2 * sliderPosition - 1);
        ballSpeedY = -8;
        return ballSpeedY;
    } else if (y - ballradius <= playertwo.y + playertwo.height && x + ballradius >= playertwo.x && x - ballradius <= playertwo.x + playertwo.width) {
        const sliderPosition = (x - playertwo.x) / playertwo.width;
        ballSpeedX = 7 * (2 * sliderPosition - 1);
        ballSpeedY = 8;  
        return ballSpeedY;
    }
};
    function resetBall(){
        ball.x = canvasWidth/2;
        ball.y = canvasHeight/2;
        ballSpeedX = 0;
        ballSpeedY = 8;
      
    };
    function checkForScore(){
        if(ball.y - ball.radius <= 0 ){
            playerOneScore++;
            ballSpeedX = 0;
            ballSpeedY = 0;
            ball.x = ballX;
            ball.y = ballY;
            setTimeout(resetBall, 600);
        }else if(ball.y + ball.radius >= canvasHeight){
            playerTwoScore++;
            ballSpeedX = 0;
            ballSpeedY = 0;
            ball.x = ballX;
            ball.y = ballY;
            setTimeout(resetBall, 600);
        }
    };

    function drawScore(){
      ctx.font="20px sans-serif"
      ctx.fillStyle="blue";
      ctx.fillText(playerOneScore, 15, canvasHeight/2+40)

      ctx.fillStyle="red";
      ctx.fillText(playerTwoScore, 15, canvasHeight/2-35)
    }