//--------Score--------//
let pointP = 0;
let pointIA = 0;

//---------Ball--------//
let xBall = 300;
let yBall = 200;
let diamBall = 20
let radiusBall = diamBall / 2;
let xspeedBall = 5;
let yspeedBall = 5;

//----------Racket---------//
let widthRacket = 10;
let lengthRacket = 90;

let xRacket = 5;
let yRacket = 150;

let xORacket = 585;
let yORacket = 150;

let speedRacketIA = 5;
let precision = (1,2,3,4,9);

let hit = false;

//-------Sounds---------//

let ping; 
let pong;
let ost;



function preload(){
  ost = loadSound("trilha.mp3");
  ping = loadSound("raquetada.mp3");
  pong = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  ost.loop();
  ost.setVolume(0.1);
}

function draw() {
  background(0);
  frameRate(75);
  circle(xBall,yBall,diamBall);
  racket(xRacket,yRacket);
  racket(xORacket,yORacket);
  speedBall();
  movBall();
  //hitRacket(xRacket,yRacket);
  hitRacketLibrary(xRacket,yRacket);
  hitRacketLibrary(xORacket,yORacket);

//-------------Playes--------// 
  movRacket();
  //mov2Racket();
  movIA();
  score();
   
}

function speedBall(){
  xBall += xspeedBall;
  yBall += yspeedBall;
}

function hitRacket(){
  if (xBall - radiusBall < xRacket + widthRacket && 
     yBall - radiusBall < yRacket + lengthRacket &&
     yBall + radiusBall > yRacket){
    xspeedBall *= -1 
  }
}

function movBall(){
  //hit on Axis X
  if( xBall + radiusBall > width || xBall - radiusBall < 0){
    xspeedBall *= -1.3;
    
    speedRacketIA = random(precision);
  }
  //hit on Axis y
  if(yBall + radiusBall > height ||
    yBall - radiusBall < 0){
     yspeedBall *= -1;
    speedRacketIA = random(precision);
     }
  
}

function racket(x,y){
//create Racket
  stroke(255);
  fill(0);
rect(x,y,widthRacket,lengthRacket,3);
}

function movRacket(){
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 5;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRacket +=5;
  }
}

function movIA(){
  if(yORacket + lengthRacket/2 > yBall ){
    yORacket -= speedRacketIA;  
  }
   if(yORacket + lengthRacket/2< yBall ){
    yORacket += speedRacketIA;
    
  }
}

function mov2Racket(){
  
  if (keyIsDown(87)) {
    yORacket -= 5;
  }
  if(keyIsDown(83)){
    yORacket +=5;
  }
  
}

function hitRacketLibrary(x,y){
  hit = collideRectCircle(x, y, widthRacket, lengthRacket, xBall, yBall, radiusBall);
  
  if(hit){
    xspeedBall *= -1.02;
    ping.play();
    ping.setVolume(0.15);
    speedRacketIA = random(precision);
  }
  }

function score(){
  textAlign(CENTER);
  textSize(32);
  
  
  stroke(255)
  fill(color(0));
  rect(125,13,48,32,5);
  fill(255);
  text(pointP, 150, 40);
     
  fill(color(0));
  rect(425,13,48,32,5);
  fill(255);
  text(pointIA, 450, 40);
  
  if(xBall + radiusBall > width){
     pointP += 1;
     xBall = 300;
    yBall = 200;
    xspeedBall = 5;
    yspeedBall = 5;
    speedRacketIA = 5;
    pong.play();
    pong.setVolume(0.015);
  }
  if(xBall - radiusBall < 0){
     pointIA += 1;
    xBall = 300;
    yBall = 200 ;
    xspeedBall = 5;
    yspeedBall = 5;
    speedRacketIA = 5;
    pong.play();
    pong.setVolume(0.015);
     }
}