
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivaltime;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,500);
  
  // creating trex
  monkey = createSprite(50,450,20,50);
  monkey.addAnimation("running", monkey_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  monkey.scale = 0.1;
  monkey.x = 100;
  
  //creating ground
  ground = createSprite(200,480,1200,20);
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
 

  
}


function draw() {
  background("cyan")
  
  monkey.collide(ground);
  
  console.log (monkey.y);
  
  //jump when space key is pressed
  if(keyDown("space")&& monkey.y>=439){
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;//to add gravity
  
  //stop trex from falling down
  monkey.collide(ground);
  ground.velocityX = -2;//making ground move left side
  
  if(ground.x < 0){
    ground.x =ground.width/2 ;//reset the ground so that it run infinitely
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  spawnFood();
 
  spawnobstacle();

  drawSprites();
  
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount/frameRate())
  text("SURVIVAL TIME:  "+survivaltime,100,50)
}

function spawnFood(){
  if(frameCount%80===0){
    
  
  var Food = createSprite(600,100,40,10)
   Food.velocityX = -2;
   Food.addImage(bananaImage);
     Food.scale = 0.1;
     Food.y = Math.round(random(320,400));
     Food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
 // write your code here 
    FoodGroup.add(Food);
}
}

function spawnobstacle(){
  if(frameCount%200===0){
    
  
  var obstacle = createSprite(600,450,40,10)
   obstacle.velocityX = -2;
   obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
 // write your code here 
    obstacleGroup.add(obstacle);
    
    
}
}





