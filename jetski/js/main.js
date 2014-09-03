// create an new instance of a pixi stage

//CONSTANTS
var GRAVITY = .001;
var BUOYANCY_FORCE = -GRAVITY * 2;
var DOWNWARD_FORCE = GRAVITY * 1.8;
var AIR_FRICTION = .98;
var SURFACE_FRICTION = .8;
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
graphics.beginFill(0x000673)
graphics.drawRect(0, WATER_LEVEL, WIDTH, HEIGHT - WATER_LEVEL);
stage.addChild(graphics);


stage.addChild(jetski);
stage.addChild(text);


function getDeltaTime(){
    deltaTime = Date.now() - time1;
    time1 = Date.now();
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
    
    if (jetski.y >= HEIGHT || jetski.y <= 0){ //stay in bounds (kinda)
        accel = 0;
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
    renderer.render(stage);
}
