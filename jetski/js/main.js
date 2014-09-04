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

var stage = new PIXI.Stage(0xAACCFF);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

// add the renderer view element to the DOM
console.log(renderer);
document.body.appendChild(renderer.view);




$(renderer.view).mousedown(function(){
    clickDown= true;
});

$(renderer.view).mouseup(function(){
    clickDown = false;
})


requestAnimFrame( animate );

var texture = PIXI.Texture.fromImage("assets/jetski.png");
var bubbleTexture = new PIXI.Texture.fromImage("assets/bubble.png")

// create a new Sprite using the texture
var jetski = new PIXI.Sprite(texture);
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


var graphics = new PIXI.Graphics();
graphics.beginFill(0x000673);
graphics.drawRect(0, WATER_LEVEL, WIDTH, HEIGHT - WATER_LEVEL);
stage.addChild(graphics);


stage.addChild(jetski);
stage.addChild(text);
container = new PIXI.SpriteBatch();
stage.addChild(container);


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
        bubble.position.x = WIDTH;
        bubble.position.y = Math.random() * WATER_LEVEL + WATER_LEVEL*1.1;
        size = Math.random() * 20 + 5;
        bubble.height = size;
        bubble.width = size;
        bubble.xVel = - Math.random() * 2 - size/2;
        bubble.yVel = 0;
        bubble.anchor.x = 0.5;
        bubble.anchor.y = 0.5;
        bubbles.push(bubble);

        container.addChild(bubble);
        console.log("ADDED BUBLE");
    }
}
function update_bubbles(){
    for (var i = 0; i < bubbles.length; i++){
        bubble = bubbles[i];
        bubble.position.x += bubble.xVel
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
    if (jetski.y >= WATER_LEVEL){ //underwater
        accel += BUOYANCY_FORCE;
        jetski.yVel *= WATER_FRICTION;
    }
    else{//in air
        jetski.Yvel *= AIR_FRICTION;
    }
    if (jetski.y >= HEIGHT || jetski.y <= 0){ // for some reason, never fires
        accel = 0;
        console.log("OUT OF BOUNDS");
    }
    
    if (checkSurfaceBreak()){
        jetski.yVel *= SURFACE_FRICTION;
        console.log("BROKE");
    }
    jetski.yAcc = accel;
}

function positionJetski(){
// temp = acc*dt
// pos = pos + dt*(vel + temp/2)
// vel = vel + temp
    setYAccel();
    dt = deltaTime;
    temp = jetski.yAcc*dt
    y = jetski.y;
    y += dt*(jetski.yVel + temp/2)
    jetski.yVel = jetski.yVel + jetski.yAcc*dt
    jetski.y = y;
    if (jetski.y <=0){jetski.y = 10;}
    if (jetski.y >= HEIGHT){jetski.y = HEIGHT-10;}
    text.setText(jetski.yAcc);
}

function rotateJetski(){
    jetski.rotation = jetski.yVel ;
}

function animate() {
    getDeltaTime();
    requestAnimFrame( animate );
    positionJetski();
    rotateJetski();
    run_bubbles();
    //parallax();
    renderer.render(stage);
}
