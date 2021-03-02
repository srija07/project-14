var play=1;
var end=0;
var gameState=1;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver,gameOverImage;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImage =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale= 0.5;
  gameOver.visible = false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordG=new Group();

}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === 1){
  path.velocityY = 4;
    boy.x = World.mouseX;
  
  if(path.y > 400 ){
    path.y = height/2;
  }
    if(swordG.isTouching(boy)){
        gameState = 0;
    }
  }
  
   else if (gameState === 0) {
   path.velocityY = 0;
  diamondsG.destroyEach();
     diamondsG.setVelocityYEach(0);
  jwelleryG.destroyEach();
     jwelleryG.setVelocityYEach(0);
  cashG.destroyEach();
     cashG.setVelocityYEach(0);
     swordG.destroyEach();
  swordG.setVelocityYEach(0);
     cashG.setLifetimeEach (-1);
     diamondsG.setLifetimeEach (-1);
     jwelleryG.setLifetimeEach (-1);
     swordG.setLifetimeEach (-1);
     boy.setvelocityYEach=(0);
     gameOver.visible=true;
   }
  //code to reset the background
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }else{
      if(swordG.isTouching(boy)) {
        swordG.destroyEach();
    }
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordG.add(sword);
  }
}