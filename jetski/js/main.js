// create an new instance of a pixi stage

//CONSTANTS
var GRAVITY = .001;
var BUOYANCY_FORCE = -GRAVITY * 2;
var DOWNWARD_FORCE = GRAVITY * 1.8;
var AIR_FRICTION = .98;
var SURFACE_FRICTION = .9;
var WATER_FRICTION = .98;
var HEIGHT = 600;
var WIDTH = 800;
var WATER_LEVEL = HEIGHT /2;

//GLOBALS
var deltaTime = 0;
var time1 = Date.now();
var water_accel=0;
var down_accel=0;
var clickDown = false;
var submerged = true;
var bubbles = [];

//var assetLoader = new PIXI.AssetLoader("assets/jetski.png", false);

var interactive = true;
var stage = new PIXI.Stage(0xAACCFF, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

// add the renderer view element to the DOM
console.log(renderer);
document.body.appendChild(renderer.view);



/*
$(renderer.view).mousedown(function(){
    clickDown= true;
});

$(renderer.view).mouseup(function(){
    clickDown = false;
})
*/

requestAnimFrame( animate );

var jetskiTexture = PIXI.Texture.fromImage("assets/jetski.png");
var waterLineTexture = PIXI.Texture.fromImage("assets/waterline.png");
var bubbleTexture = new PIXI.Texture.fromImage("assets/bubble.png")

// create a new Sprite using the texture
var jetski = new PIXI.Sprite(jetskiTexture);
var waterLine = new PIXI.Sprite(waterLineTexture);
var text = new PIXI.Text("hi there");

// center the sprites anchor point
jetski.anchor.x = 0.5;
jetski.anchor.y = 0.5;

// move the sprite t the center of the screen
jetski.position.x = WIDTH/2;
jetski.position.y = HEIGHT/2;
jetski.xVel = 0;
jetski.yVel = 0;
jetski.yAcc = 0;

//TEST ZONE
testObject = new PIXI.DisplayObject();
console.log(testObject.hellothere);
testObject.setPosition();
console.log(testObject.hellothere);
var fullScreenSprite = new PIXI.Sprite(PIXI.Texture.fromImage("assets/transparent.png"));
fullScreenSprite.width = WIDTH;
fullScreenSprite.height = HEIGHT;
fullScreenSprite.interactive = 1;
stage.addChild(fullScreenSprite)

//END OF TEST ZONE

fullScreenSprite.touchstart = function(mouseData){
   clickDown = true;
}

fullScreenSprite.touchend = function(mouseData){
   clickDown = false;
}
fullScreenSprite.mousedown = function(mouseData){
   clickDown = true;
}
fullScreenSprite.mouseup = function(mouseData){
   clickDown = false;
}

waterLine.worldX = 0;
waterLine.worldY = WATER_LEVEL;
/*
var graphics = new PIXI.Graphics();
graphics.beginFill(0x000673);
graphics.drawRect(0, WATER_LEVEL, WIDTH, HEIGHT - WATER_LEVEL);
stage.addChild(graphics);
*/

stage.addChild(jetski);
stage.addChild(text);
container = new PIXI.SpriteBatch();
stage.addChild(container);
stage.addChild(waterLine);

function getDeltaTime(){
    deltaTime = Date.now() - time1;
    time1 = Date.now();
    if (deltaTime > 300){
        deltaTime = 300;
    }
}

function checkSurfaceBreak(){
    surfaceBreak = false
    current = jetski.y >= WATER_LEVEL;
    if (current != submerged){
        surfaceBreak = true;
    }
    submerged = current;
    return surfaceBreak;
}

function pastScreen(x){
    return x.x < 0;
}

function spawn_bubbles(){
    if (Math.random() > .7){
        var bubble = new PIXI.Sprite(bubbleTexture);
        bubble.worldX = WIDTH;
        bubble.worldY = Math.random() * WATER_LEVEL + WATER_LEVEL*1.1;
       
        
        size = Math.random() * 20 + 5;
        bubble.height = size;
        bubble.width = size;
        //bubble.xVel = - Math.random() * 2 - size/2;
        bubble.xVel = - 5;
        bubble.yVel = 0;
        bubble.anchor.x = 0.5;
        bubble.anchor.y = 0.5;
        bubbles.push(bubble);

        container.addChild(bubble);
    }
}
function update_bubbles(){ //Cap at 200 bubble. got to be a better way
    while (container.children.length > 200){
        container.removeChild(container.getChildAt(0));
    }
    for (var i = 0; i < container.children.length; i++){
        bubble = container.getChildAt(i);
        bubble.worldX += bubble.xVel;
        bubble.setPosition();
    }
}
function run_bubbles(){
    spawn_bubbles();
    update_bubbles();
}
function setYAccel(){
    accel = GRAVITY;
    if (clickDown){ //pushing down
        accel += DOWNWARD_FORCE
    };
    if (jetski.worldY >= WATER_LEVEL){ //underwater
        accel += BUOYANCY_FORCE;
        jetski.yVel *= WATER_FRICTION;
    }
    else{//in air
        jetski.Yvel *= AIR_FRICTION;
    }
    if (jetski.worldY >= HEIGHT || jetski.y <= 0){ // for some reason, never fires
        //accel = 0;
        console.log("OUT OF BOUNDS");
    }
    
    if (checkSurfaceBreak()){
        jetski.yVel *= SURFACE_FRICTION;
    }
    jetski.yAcc = accel;
}

jetski.worldX = 100;
jetski.worldY = 0;

function positionJetski(){
// temp = acc*dt
// pos = pos + dt*(vel + temp/2)
// vel = vel + temp
    setYAccel();
    dt = deltaTime;
    temp = jetski.yAcc*dt
    y = jetski.worldY;
    y += dt*(jetski.yVel + temp/2)
    jetski.yVel = jetski.yVel + jetski.yAcc*dt
    jetski.worldY = y;
    //if (jetski.y <=0){jetski.y = 10;}
    //if (jetski.y >= HEIGHT){jetski.world = HEIGHT-10;}
    jetski.setPosition();
    text.setText("depth: " + Math.floor(jetski.worldY));
}

function rotateJetski(){
    jetski.rotation = jetski.yVel ;
}

function positionCamera(){
    if(jetski.worldY > 200 && jetski.worldY < 400){
        cam.y = (300 - HEIGHT/2 + cam.y) / 4;
    }
    else{
        cam.y = (jetski.worldY - 300 + cam.y ) / 4;
    }
    //cam.x = jetski.worldX - WIDTH/2;
    //cam.y = jetski.worldY - HEIGHT/2;
}

function animate() {
    //cam.x +=.001;
    //cam.y += .001;
    getDeltaTime();
    requestAnimFrame( animate );
    positionJetski();
    positionCamera();
    waterLine.setPosition();
    rotateJetski();
    run_bubbles();
    //parallax();
    renderer.render(stage);
}
