var bird1,bird1Img,bird2,bird2,bird2Img,bird3,bird3Img,bird4,birdImg;
var uppipe,uppipeImg,downpipe,downpipeImg;
var upPipesGroup,downPipesGroup;
var start,startImg;
var logo,logoImg;
var reset,resetImg;
var gameover,gameoverImg;
var bg,bgImg;
var score;
var ground;
var gameState=PLAY;
var PLAY=1;
var END=0;
localStorage = ["HighestScore"];
localStorage[0] = 0;

function preload(){
bird1Img= loadImage("bird.png");
bird2Img= loadImage("bird2.png");
bird3Img= loadImage("bird3.png");
bird4Img= loadImage("bird4.png");
uppipeImg=loadImage("pipeup.png");
downpipeImg=loadImage("pipedown.png");
logoImg=loadImage("intro.png");
startImg=loadImage("start.png");
resetImg=loadImage("reset.png");
gameoverImg=loadImage("gameover.png");
bgImg=loadImage("background.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(0,0,windowWidth,windowHeight);
bg.addImage(bgImg);
bg.scale=1.8;
bg.velocityX=-3;

bird1=createSprite(200,350,30,30);
bird1.addImage(bird4Img);
bird1.scale=0.5;

ground=createSprite(width/2,height,width,5);
ground.visible=false;
ground.x=ground.width/2;

logo=createSprite(width/2,height/2-100,50,50);
logo.addImage(logoImg);
logo.scale=0.9;

start=createSprite(width/2,height/2+100,50,50);
start.addImage(startImg);
start.scale=0.6;

gameover=createSprite(width/2,height/2,50,50);
gameover.addImage(gameoverImg);
gameover.scale=0.4;

reset=createSprite(width/2,height/2+150,50,50);
reset.addImage(resetImg);
reset.scale=0.5;
gameover.visible=false;
reset.visible=false;

upPipesGroup=new Group();
downPipesGroup=new Group();

fill("green");
textSize(25);
score=0;

}


function draw(){
drawSprites();
text("SCORE: "+score,width-250,40);
text("HIGHSCORE: "+localStorage[0],width/20,height/10);
if(mousePressedOver(start)){
gameState=PLAY;
start.visible=false;
logo.visible=false;
bird1.velocityY=-10;
}
if(bg.x<0){
bg.x=bg.width/2;    
}
if(gameState===PLAY){
//bg.velocityX=-5;
score=score+Math.round(getFrameRate()/60);
if(highscore=score){
highscore=score    
}

if(touches.length>0||keyDown("space")){
bird1.velocityY=-10;
}
bird1.velocityY=bird1.velocityY+1.5;
touches=[];


obsUp();
obsDown();
if(bird1.isTouching(upPipesGroup)||bird1.isTouching(downPipesGroup)||bird1.isTouching(ground)){
gameState=END;    
}
}
else if(gameState===END){
bird1.velocityX=0;
bg.velocityX=0;
ground.velocityX=0;
gameover.visible=true;
reset.visible=true;
bird1.x=200;
bird1.y=150;
upPipesGroup.setVelocityXEach(0);
downPipesGroup.setVelocityXEach(0);
upPipesGroup.destroyEach();
downPipesGroup.destroyEach();
upPipesGroup.setLifetimeEach(-1);
downPipesGroup.setLifetimeEach(-1);
}
if(touches.length>0 ||mousePressedOver(reset)){
restart();    
}
}

function restart(){
gameState=PLAY;
gameover.visible=false;
reset.visible=false;
if(localStorage[0]<score){
    localStorage[0]=score;
    }
    console.log(localStorage[0]);
score=0;
bird1.x=200;
bird1.y=150;
upPipesGroup.destroyEach();
downPipesGroup.destroyEach();

}

function obsUp(){
if (frameCount%70===0)
{
uppipe=createSprite(width-20,10,30,60);    
uppipe.y=Math.round(random(0,80));
uppipe.addImage(uppipeImg);
uppipe.scale=0.4;
uppipe.velocityX=-6;
upPipesGroup.add(uppipe);
}
}
function obsDown(){
    if (frameCount%70===0)
    {
    downpipe=createSprite(width-20,720,80,60);    
    downpipe.y=Math.round(random(650,720));
    downpipe.addImage(downpipeImg);
    downpipe.scale=1.5;
    downpipe.velocityX=-6;
    downPipesGroup.add(downpipe);
    }
    }