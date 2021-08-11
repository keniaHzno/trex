var PLAYING=0;
var END=1;
var estadodejuego=PLAYING;
var grupodenubes;
var grupodecactus;

var trex, trex_running,edges;
var groundImage;
var suelo;
var sueloInvisible;
var nubes;
var nubeImg;
var cactus,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var numero;
var puntaje=0;
var gameover;
var restart;
var salto;
var choca;
var puntoxCien;

function preload(){
  //cargar imagen
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadAnimation("ground2.png");
  nubeImg= loadAnimation("cloud.png");
  cactus1= loadAnimation("obstacle1.png");
   cactus2= loadAnimation("obstacle2.png");
   cactus3= loadAnimation("obstacle3.png");
  cactus4= loadAnimation("obstacle4.png");
  cactus5= loadAnimation("obstacle5.png");
  cactus6= loadAnimation("obstacle6.png");
  tirex= loadAnimation("trex_collided.png");
  gameoverImg= loadAnimation("gameOver.png");
  restartImg= loadAnimation("restart.png");
  //cargar sonidos
  salto = loadSound("jump.mp3");
  choca = loadSound("die.mp3") ; 
  puntoxCien= loadSound ("checkPoint.mp3");
  
}
//configurar animacion con sprite
function setup(){
  createCanvas(600,200);
 
  //creacion de trex
 
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("tirex",tirex);
  edges = createEdgeSprites();
  //radio de mi trex
  trex.debug=false;
  trex.setCollider("circle",0,0,40);
  //trex.setCollider("rectangle",0,0,trex.width,trex.height);
  
//creacion de suelo
  suelo= createSprite(200,180,600,20);
  suelo.addAnimation("suelo",groundImage);
   suelo.x=suelo.width/2;
  
  gameover= createSprite(300,60,20,20);
  gameover.addAnimation("gameover",gameoverImg);
  restart= createSprite(300,120,10,10);
  restart.addAnimation("restart",restartImg);

  //escala y posicion de trex
  trex.scale = 0.5;
  trex.x = 50;
  gameover.scale = 0.7;
  restart.scale= 0.7;
  
  //creacion de suelo invisible
  sueloInvisible=createSprite(200,190,400,10);
  sueloInvisible.visible=false;
  
  //grupos
  grupodenubes= new Group();
  grupodecactus= new Group();
}


//dibujar los sprites
function draw(){
  // console.error("texto");
  //color del area de juego 
  background("white");
  text("puntaje:"+puntaje,490,20);
  
  
 
  if (estadodejuego=== PLAYING){
    //movimiento de el suelo y 
      suelo.velocityX=-(6+3*puntaje/100);
    //suelo repetitivo
     if(suelo.x<0){
        suelo.x=suelo.width/2;
        }
    //salto de trex
     if(keyDown("space") && trex.y>=150){
        trex.velocityY = -10;
       //soonido al saltar
        salto.play();
    }
    //grebedad
    trex.velocityY = trex.velocityY + 0.5;
    //puntaje
    puntaje=puntaje+Math.round(getFrameRate()/60);
    
    if(puntaje>0 && puntaje%100==0){
      //sonido al llegar a multiplo de 100
       puntoxCien.play();
       }
    
    crearNubes();
    createCactus();
    //cambio de juego
    if (grupodecactus.isTouching(trex)){
        estadodejuego=END;
     choca.play();
      //salto auto
      //trex.velocityY=-10;
      //salto.play();
        }
    //visivilidad de gameover y restart
    gameover.visible=false;
      restart.visible=false;
    //fin
    }else if(estadodejuego=== END){
      //velocidad de sprites
        suelo.velocityX=0; 
      grupodecactus.setVelocityXEach(0);
      grupodenubes.setVelocityXEach(0);
      //tirex no salte cuando choca
      trex.velocityY=0;
      //cambio de animachion del trex
      trex.changeAnimation("tirex",tirex);
      
      //visivilidad de gameover y restart
      gameover.visible=true;
      restart.visible=true;

      if(mousePressedOver(restart)){
    reiniciar();
        }
               }
  
   
  
  //console.warn("advertencia");
  //logging the y position of the trex
 // console.log(trex.y)
  
  
  //console.info("texto");
  //cambio de tiempo de vida a cactus y nubes
  grupodenubes.setLifetimeEach(-1);
  grupodecactus.setLifetimeEach(-1);

  
  //colicion de trex con el suelo
  trex.collide(sueloInvisible);
  
  
  drawSprites();
  
//console.log(trex.depth);
 // console.log(nubes.depth);
}

function crearNubes(){
  
  if(frameCount%50===4){
    
  
  nubes=  createSprite(610,20,20,20);
     // console.log(nubes.depth);
    nubes.addAnimation("nubes",nubeImg);
    nubes.scale=0.6;
    nubes.y=Math.round(random(10,100));
  nubes.velocityX=-5;
    nubes.lifetime=130;
    nubes.depth=trex.depth;
    trex.depth=trex.depth+1;
    grupodenubes.add(nubes);
  }

}
 function createCactus(){

  if(frameCount%50===4){
   cactus=createSprite(600,165,10,15);
    //acelerar velocidad de cactus
   cactus.velocityX=-(6+puntaje/100);
  numero=Math.round(random(1,6));
    grupodecactus.add(cactus);
    
    switch(numero){
      case 1:cactus.addAnimation("cactus",cactus1);
        break;
        case 2:cactus.addAnimation("cactus",cactus2);
        break;
        case 3:cactus.addAnimation("cactus",cactus3);
        break;
        case 4:cactus.addAnimation("cactus",cactus4);
        break;
        case 5:cactus.addAnimation("cactus",cactus5);
        break;
        case 6:cactus.addAnimation("cactus",cactus6);
        break;
        default:break;
        
    }
    cactus.scale=0.5;
    cactus.lifetime=110;
  }
 } 

function reiniciar(){
  
  estadodejuego=PLAYING;
  gameover.visible=false;
  restart.visible=false;
  
  grupodecactus.destroyEach();
  grupodenubes.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  puntaje=0;
  
  
}