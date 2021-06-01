
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_0.png");

}



function setup() {
  createCanvas(600,365);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;

  ground = createSprite(600,350,1200,10);
  ground.velocityX = -10;
  ground.x=ground.width/2;
  console.log(ground.x);

   obstacleGroup = createGroup();
  bananaGroup = createGroup();

  
}


function draw() {

  background("white")
  
  monkey .collide(ground);
  
  if(gameState===PLAY){
   
    if(keyDown("SPACE")){
      
      monkey.velocityY=-13;
    }
    
    monkey.velocityY=monkey.velocityY+0.5;
    
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }

    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score=score+1;
    }
  
  
    food();
    obstacles();
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
          }
    
    survivalTime=survivalTime+Math.random(getFrameRate()/60)
           survivalTime=Math.ceil(frameCount/frameRate())

  
  }else if(gameState===END){
    bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      ground.velocityX = 0;
      monkey.changeAnimation("collided",monkey_collided);
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      monkey.velocityY = 0;

    stroke("red")
    textSize(30)
     fill("red")
     text("GAME OVER" ,210,200);
      
       }
    
    
    stroke("black")
    textSize(15);
    fill("black");
    text("SCORE:"+score,500,50)
         
    stroke("blue")
    textSize(15);
    fill("blue");
    text("SurvivalTime:"+survivalTime,100,50)
  
  
  drawSprites();
}
function food()
{
  if (frameCount % 150 === 0)
  {
    var banana = createSprite(600,40,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -3
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  } 
}

function obstacles()
{
  if (frameCount % 300 === 0)
    {
      var obstacle = createSprite(600,330,10,40);
      obstacle.velocityX = -3;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.lifetime = 200;
      obstacleGroup.add(obstacle);
      
    }         

}




