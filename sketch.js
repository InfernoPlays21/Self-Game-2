function preload(){
  playerimg = loadAnimation("SPRITE1.png","SPRITE2.png","SPRITE3.png","SPRITE4.png");
  enemyimg = loadAnimation("Picture1.png","Picture2.png","Picture3.png","Picture4.png","Picture5.png");

  backgroundimg = loadImage('Picture1.jpg')

  playerstandingimg = loadImage('playerstandingimg.png')

  playerbulletimg = loadImage('PLAYERBULLET.png');
  enemybulletimg = loadImage('ENEMYBULLET.png');

  homeBgimg = loadImage('background-game-style.jpg');

  logoimg = loadImage('Mylogo')

  buttonimg = loadImage('button (2).png')
  
  livesimg = loadImage('lives.png')

  gameoverimg = loadImage('GAMEOVER1.png')
 
  resetbuttonimg = ('resetbutton.png')

  playerdiedimg = loadImage('playerdied.png')

  brownbutton = loadImage('brownbutton.png')

  bluebutton = loadImage('buttonblue.png')

  INSTRUCTIONSIMG = loadImage('i.png')

}
 
function setup(){
  createCanvas(windowWidth,windowHeight);

  enemyGroup = new Group();
  player_Bullet_Grp = new Group();
  ENEMY_Bullet_Grp  = new Group();

  back_ground = createSprite(width/3,height-500,windowWidth,20)
  back_ground.addImage(backgroundimg);
  back_ground.scale = 0.350
  back_ground.x = windowWidth/2;
  back_ground.visible = false;

  player = createSprite(100,620,20,20);
  player.addAnimation("running",playerimg);
player.scale = 550;
player.visible = false;

invisble_ground = createSprite(widtht/2,height-30,windowWidth,5)
invisble_ground.visible = false;

player.collide(invisble_ground);

GAMESTATE = 0;
HOME = 0;
PLAY = 1;
INSTRUCTIONS = 2;
END = 3;

logo  = createSprite(width/2,height-height/1.5);
logo.addImage(logoimg);
logo.scale = 0.7
logo.visible = false;

play_Button = createSprite(width/2,height-height/3.7);
play_Button.addImage(buttonimg);
play_Button.scale = 0.3

playerstanding = createSprite(player.x,player.y+4,20,20);
playerstanding.addImage(playerstandingimg);
playerstanding.scale = 1.1
playerstanding.visible = false;


invisibe_wall1 = createSprite(width/5.3,height-height/2,50,windowHeight);
invisibe_wall2 = createSprite(width/2,height-height/2,50,windowHeight);
invisibe_wall3 = createSprite(windowWidth/1.3,height-height/2,50,windowWidth);

invisibe_wall1.visible = false;
invisibe_wall2.visible =  false;
invisibe_wall3.visible =  false;

invisibe_block = createSprite(windowWidth/1.3,height-height/3.2,50,50);
invisibe_block.shapeColor = "red";
invisibe_block.visible = false;

gameover = createSprite(width/2,height/3,10,10)
gameover.addImage(gameoverimg)
gameover.scale = 0.5;
gameover.visible = false;

reset_button = createSprite(width/2,height/1.7,20,20);
reset_button.addImage(resetbuttonimg);
reset_button.scale = 0.5;
reset_button.visible = false;


playerdied = createSprite(player.x+40,player.y+70,20,20);
playerdied.addImage(playerdiedimg);
playerdied.visible = false;
playerdied.scale = 0.7
 
play_back_button = createSprite(width/1.1,height/10,20,201);
play_back_button.addImage(bluebutton);
play_back_button.scale = 0.1;
play_back_button.visible = false;

INSTRUCTION_BUTTON = createSprite(width/1.2,height/20,20);
INSTRUCTION_BUTTON.addImage(INSTRUCTIONSIMG);
INSTRUCTION_BUTTON.scale = 0.1;
INSTRUCTION_BUTTON.visible = false;

backbutton = createSprite(width/1.2,height/10,20,20);
backbutton.addImage(brownbutton);
backbutton.scale = 0.4;
backbutton.visible = false;

player_Lifes = 10;
score = 0;
PLAYER_SHOOTED = 0;
PLAYER_KILL = 0;

}

function draw(){

  if(GAMESTATE === INSTRUCTIONS){
    background(homeBgimg);

    textSize(30)
    stroke("BLACK")
    strokeWeight(8);
    textStyle(BOLDITALIC);
    fill("orange");
    text("YOU ARE THE SOLDIER WHO IS ACTUALLY KILLING ALL YOUR ENEMIES TO SAVE",width/8.8,height/3);
    text("YOUR COUNTRY. IN ORDER TO SHOOT YOU JUST PRESS SPACE BUTTON AND TO",width/8.8,height/2.5);
    text("JUMP PRESS J. YOU ARE GIVEN 10 LIFES AND WHEN YOU DONT HAVE ANY LIFE",width/8.8,height/2.2);
    text("THE GAME IS OVER. DON'T FORGET THAT ENEMIES CAN ALSO SHOOT",width/8.8,height/1.950);
    text("THANK YOU-",width/2.8,height/1.5);
    textSize(50);
    text("INSTRUCTIONS",width/2.8,height/5);
    text("________",width/2.8,height/4.8)

  }

  if(mousePressedOver(INSTRUCTION_BUTTON)){
    GAMESTATE = INSTRUCTIONS;

    playerStanding.visible = false;
    player.visible = false;
    logo.visible = false;
    INSTRUCTION_BUTTON.visible = false;
    play_Button.visible = false;


  }
  if(GAMESTATE === HOME){
    background(homeBgimg);

    backbutton.visible = false;

    INSTRUCTION_BUTTON.visible = true;

    console.log(GAMESTATE);


    player.collide(invisble_ground);
    playerStanding.collide(invisble_ground);

    play_Button.visible = true;

    logo.visible = true;
    if(mousePressedOver(play_Button)){
       GAMESTATE = PLAY;

       logo.visible = false;
       play_button.visible = false;

    }
    if(mouseIsOver(play_Button)){
      play_Button.scale = 0.4
    } else {
play_Button.scale = 0.3

    }
  }
  if(GAMESTATE === END){
    gameover.visible = true;
    reset_button.visible = true;

    player.visible = false;
    playerStanding.visible = false;
    playerdied.visible = true;

    back_ground.velocityX = 0;
    enemyGroup.destroyEach();
    player_Bullet_Grp.destroyEach();
    ENEMY_Bullet_Grp.destroyEach();

    if(mousePressedOver(reset_button)){
      reset_button.visible = false;
      gameover.visible = false;
      GAMESTATE = PLAY;

      playerdied.visible = false;

      invisibe_block.x = windowWidth/1.3;
      invisibe_block.y = height-height/3.2;
      invisibe_block.velocityX = 0;

      enemyGroup.destroyEach();
      player_Bullet_Grp.destroyEach();
      ENEMY_Bullet_Grp.destroyEach();

      score = 0;
      PLAYER_KILL = 0;
      player_Lifes = 10;

    }
    
  }
  if(GAMESTATE === PLAY){
    background("grey")

    spawnEnemies();

    INSTRUCTION_BUTTON.visible = false;

   player.visible = true;
   back_ground.visible = true;
   play_back_button.visible = true;

   if(mousePressedOver(play_back_button)){
play_back_button.visible = false;
GAMESTATE = HOME;
player_Lifes = 10;
PLAYER_KILL = 0;
score = 0;

enemyGroup.destroyEach();
player_Bullet_Grp.destroyEach();
ENEMY_Bullet_Grp.destroyEach();

invisibe_block.x = windowWidth/1.3;
invisibe_block.y = height-height/3.2;
invisibe_block.velocityX = 0;

back_ground.visible = false;

   }
 
    if(keyDown(RIGHT_ARROW)){
    back_ground.velocityX = 0;
    player.visible = true;
    playerStanding.visible = false;
    
    } else {
      back_ground.velocityX = 0;
      player.visible = false;
      playerStanding.visible = true;
      }
     if(player_Lifes === 0){
       GAMESTATE = END;
     }
     if(PLAYER_SHOOTED === 5){
       enemyGroup.destroyEach();
       PLAYER_SHOOTED = 0;
       PLAYER_KILL = PLAYER_KILL+1
     }

     if(enemyGroup.isTouching(invisibe_block)){
       invisibe_block.velocityX = -6;
       ENEMYbullet();
     }

     if(invisibe_block.isTouching(invisibe_wall1)){
       invisibe_block.x = windowWidth/1.3;
       invisibe_block.y = height-height/3.2;
       invisibe_block.velocityX = 0;

     }
     
     if(invisibe_block.velocityX === -6){
       ENEMYbullet();

     }

     if(keyDown("space") && frameCount % 5 === 0){
       spawnPlayerBullet();
     }
     if(ENEMY_Bullet_Grp.isTouching(player)){
       ENEMY_Bullet_Grp.destroyEach()
       player_Lifes = player_Lifes-1
     }
     if(player_Bullet_Grp.isTouching(enemyGroup)){
       player_Bullet_Grp.destroyEach();
       PLAYER_SHOOTED = PLAYER_SHOOTED + 1
       var rand = Math.round(random(1,4))
       switch(rand){
         case 1: Score = Score + 50;
                 break;
         case 2: Score = Score + 25;
                 break;
         case 3: Score = Score + 75;
                 break;
         case 4: Score = Score + 100;
                 break;
                 default: break;                  

       }
     }
     if(back_ground.x < 200){
        back_ground.x = width/2
     }
     player.velocityY = player.velocityY+2
     player.collide(invisble_ground);

     playerStanding.velocityY = player.velocityY+2;
     playerStanding.collide(invisble_ground);

     if(keyDown("j") && player.y >= 610 && player.visible === true){
       player.velocityY = player.velocityY -10;
     }
      
     if(keyDown("j") && player.y >= 610){
       player.velocityY = player.velocityY -30;

     }

  }
  drawSprites();

  if(GAMESTATE === PLAY){
    fill("white")
    textFont('Italic');
    textSize(35)
    text("YOUR LIFE:"+player_Lifes,width/8,height/12);
    text("YOUR SCORE:"+Score,width/2,height/10);
    text("YOU KILLED SOLDIERS: "+PLAYER_KILL,width/2,height/20);
    }
}

function spawnEnemies(){
  if(frameCount % 500 === 0)
  {
         enemy = createSprite(2000,620,20,20);
         enemy.addAnimation("running",enemyimg);
         enemy.velocityX = -6;
         enemyGroup.add(enemy);
      
  }
}

function spawnPlayerBullet(){
  var bullet = createSprite(player.x+10,player.y-35,20,20);
  bullet.addImage(playerbulletimg);
  bullet.scale = 0.075;
  bullet.velocityX = 8;
  bullet.lifetime = 300;
  player.depth > bullet.depth;
  player_Bullet_Grp.add(bullet);
}

function ENEMYbullet(){
  if(frameCount % 20 === 0){
    var bullet = createSprite(invisibe_block.x+30,invisibe_block.y+80,20,20);
    bullet.addImage(enemybulletimg);
    bullet.scale = 0.075;
    bullet.velocityX = -8
    ENEMY_Bullet_Grp.add(bullet);
  }
}
function reset(){
  GAMESTATE = PLAY;

  invisibe_block.x = windowWidth/1.3;
  invisibe_block.y = height-height/3.2
  invisibe_block.velocityX = 0;
  enemyGroup.destroyEach();
  player_Bullet_Grp.destroyEach();
  ENEMY_Bullet_Grp.destroyEach();

  score = 0;
  PLAYER_KILL = 0;
  player_Lifes = 0;
  
}