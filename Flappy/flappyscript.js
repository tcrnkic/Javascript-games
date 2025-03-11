let canvas;
let canvasWidth = 360;
let canvasHeight = 640;
let ctx;

let birdWidth = 34;
let birdHeight = 24;
let birdX = canvasWidth / 8;
let birdY = canvasHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
};

let pipeAr = [];
let pipeWidth= 64;
let pipeHeight= 512;
let pipeX = canvasWidth;
let pipeY = 0;

let speedX= -2;
let speedY = 0;
let gravity = 0.5;

let rezultat=0;

let kraj= false;

let topPipeImg;
let bottomPipeImg;

window.onload = function () {
    canvas = document.getElementById("canvas"); 
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    ctx = canvas.getContext("2d");

    
   
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };
    
    
    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);

    setInterval(placePipes, 1500);

    document.addEventListener("keydown", birdJump);
    canvas.addEventListener("touchstart", birdJump);
};

function update(){
    requestAnimationFrame(update);
    if (kraj){
        return;
    }  
   
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //ptica
    speedY += gravity;
    bird.y = Math.max(bird.y + speedY, 0)
   
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > canvas.height){
        kraj = true;
    }
    //pipes
    for( let i= 0; i<pipeAr.length; i++ ){
        let pipe = pipeAr[i];
        pipe.x += speedX;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.pass && bird.x > pipe.x + pipe.width){
            rezultat +=0.5;
            pipe.pass = true;
        }

        if (Collission(bird, pipe)){
            kraj = true;
        }
    }
 

    //rezultat
    ctx.fillStyle = "white";
    ctx.font = "45px sans-serif";
    ctx.fillText(rezultat, 15, 55)
    if(kraj){
        ctx.fillText("IZGUBILI STE", 30, canvasHeight/2)
    }
    
    while (pipeAr.length > 0 && pipeAr[0].x < (0 - pipe.width)){
        pipeAr.shift();
    }

   
};

function placePipes(){
    if(kraj){
        return;
    }
    let randPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let gap = canvas.height/5;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randPipeY,
        width : pipeWidth,
        height : pipeHeight,
        pass : false
    }
    
    pipeAr.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randPipeY + pipeHeight + gap,
        width: pipeWidth,
        height: pipeHeight,
        pass : false
    }
    
    pipeAr.push(bottomPipe);
}
function birdJump(event){
    if(event.code == "Space" ||event.type === "touchstart" ){
        event.preventDefault();
        speedY = -6; 
        canvas.scrollIntoView();
        if(kraj){
            bird.y = birdY;
            pipeAr = [];
            rezultat = 0;
            kraj = false;
        }
    }
}

function Collission(a, b){
  

    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}
