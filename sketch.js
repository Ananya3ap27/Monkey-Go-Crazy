

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGrou,lives=3;
var score=0,gameState="play";
var invisibleGround , lowerPart , lowerPartImg;
var steps,stepGroup,a,energy=0;

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  lowerPartImg=loadImage("ground-clipart-1.jpg");
 
}

function setup() {
  
  createCanvas(600,600);
  
  lowerPart=createSprite(300,500);
  lowerPart.addImage(lowerPartImg);
  lowerPart.scale=0.2;
  lowerPart.velocityX=-4;

  //creatng monkey
  monkey=createSprite(200,460,10,10);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.2;
  
  //ground for running
  invisibleGround=createSprite(300,460,600,10);
  invisibleGround.visible=false;
    
  //sprites into groups
  banana=new Group();
  obstacle=new Group();
  stepGroup=new Group();
    
  //setting monkey collider
  monkey.setCollider("circle",0,0,250);
}

function draw() {
  
  if(lowerPart.x<100){
    lowerPart.x=300 
  }
  //sky
  background("skyBlue");
  monkey.velocityX=0;
  if(gameState==="play"){
      //scores
      if(frameCount%3===0){
          energy=energy+1;
      }
      //gravity
      monkey.velocityY=monkey.velocityY+0.7;
      //jumping
      jump();
      //making bananas
      bananas();
      //incoming obstacles
      obstacles();
      //steps
      step();
      //eating bananas
      eat();
    
      //subtraction of lives
      if(monkey.isTouching(obstacle)&&(lives==2||lives==3)){
          lives=lives-1;
          obstacle.destroy();
          banana.destroy();
          steps.destroy();
      }
      //gameover
      if(monkey.isTouching(obstacle)&&lives===1){
          gameState="end";
      }
  }
  if(gameState==="end"){
      //game end
      lives=0;
      banana.velocityX=0;
      obstacle.velocityX=0;
      monkey.velocityX=0;
      steps.velocityX=0;
      lowerPart.velocityX=0;
    }
  //monkey standing on ground
  monkey.collide(invisibleGround);
  //monkey standing on steps
  monkey.collide(stepGroup);
  
  drawSprites();
  //score
  text("score : "+energy,300,40);
  //energy
  text("energy : "+score,500,40);
  //lives left
  text("lives : "+lives,200,40);

}
//making bananas
function bananas(){
  if(frameCount%120===0){
    banana=createSprite(600,200,10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
  }
}
//making obstacles
function obstacles(){
  if(frameCount%220===0){
    obstacle=createSprite(600,440,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4.5;
    obstacle.scale=0.2;
    obstacle.setCollider("circle",0,0,200);
  }
}
//jumping the monkey
function jump(){
  if(keyDown("space")&&(monkey.collide(invisibleGround)||monkey.collide(stepGroup))){
  monkey.velocityY=-18;
  }
}
//eat banana
function eat(){
  if(monkey.isTouching(banana)){
  banana.destroy();
  score=score+10;
  }
}
//making steps
function step(){
  if(frameCount%100===0){
  steps=createSprite(600,Math.round(random(280,350)),100,10);
  steps.shapeColor="chocolate";
  steps.velocityX=-4;
  steps.setCollider("rectangle",10,0,steps.width+20,steps.height)
  stepGroup.add(steps)
  }
}












