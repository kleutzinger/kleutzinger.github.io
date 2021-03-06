var interactive = true;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('mushroom', 'assets/rus.png');
    game.load.image('road', 'assets/road.png');
    game.load.image('kid', 'assets/kid.png');
    game.load.image('sad', 'assets/warped.jpeg');
    game.load.image('x', 'assets/x.png');
    game.load.audio('honk', 'assets/honk.ogg');
    
}

var s;
var honk;
var road;
var velocity_multiplier;
var velocity_multiplier = 0;
var velocity;
velocity = 0;
var kid;
var leftSprite;
var rightSprite;
var text;
var kidHitbox;

 isIntersecting = function(r1, r2) {
        return !(r2.x > (r1.x + r1.width)  || 
           (r2.x + r2.width ) < r1.x || 
           r2.y > (r1.y + r1.height) ||
           (r2.y + r2.height) < r1.y);
    }




function create() {
    game.input.addPointer();
    game.input.addPointer();
    game.stage.backgroundColor = 0xaaaabb;

    
    
    road = game.add.sprite(250, 0, 'road');
    //road.anchor.setTo(0,0);
    road.scale.setTo(.5,4);
    
    
    kid = game.add.sprite(250,-100,'kid');
    //kid.anchor.setTo(.5,.5);
    kid.scale.setTo(.1,.1);
    
    
    s = game.add.sprite(500, 420, 'mushroom');
    //s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(.5, .5);
    
    
   
        //leftSprite.visible=false;
    
    sad = game.add.sprite(-200,-200, 'sad');
    //s.anchor.setTo(0.5, 0.5);
    sad.scale.setTo(.5, .5);
    
    kidHitbox = game.add.sprite(kid.x,kid.y,'x');
    kidHitbox.visible = false;
    kidHitbox.width = kid.width*.85;
    kidHitbox.height = kid.height*.7;
    
    
    honk = game.add.audio('honk');
    text = game.add.text(0, 0, "",style);

}
var end = false;
var kidspeed = 10;
var start = Date.now();

var leftTouch  = false;
var rightTouch = false;

    var style = { fill: "#FFFFFF"};
function update() {
    
/*
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        velocity_multiplier += -.1;
        s.x -= 4;
    }
    s.x += 2*velocity_multiplier;
    velocity_multiplier+= .0004;
    if (velocity_multiplier > 2){
        velocity_multiplier = 2;
    }
    if (velocity_multiplier <= 0){
        velocity_multiplier = 0;
}
*/
    if(!end){
        kidHitbox.x = kid.x;
        kidHitbox.y = kid.y;
    
    
        
        text.setText("_"+ (Date.now()-start)/1000);
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.pointer1.isDown && game.input.pointer1.worldX <= 400
         ||game.input.pointer2.isDown && game.input.pointer2.worldX <= 400)
        {
            velocity -= .2;
            text.setText("L"+ (Date.now()-start)/1000)
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || 
        game.input.pointer1.isDown && game.input.pointer1.worldX > 400||
        game.input.pointer2.isDown && game.input.pointer2.worldX > 400){
            velocity +=  .2;
        text.setText("R"+ (Date.now()-start)/1000)
        }
        
        velocity += (Math.sin(Date.now())/15);
        

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !honk.isPlaying){
            // honk.play();
        }
        
        if (velocity > 2){
            velocity = 2;
        }
        
        if (velocity < -2){
            velocity = -2;
        }
        s.x += velocity;
        kid.y += kidspeed;
        if (kid.y > 700){
            kid.y = -200;
            kidspeed = Math.random()*5 +5;
            kid.x = 230+ Math.random()*320;
        }
        
        
        
        
    if (isIntersecting(s,kidHitbox) || !isIntersecting(road,s)){
            // honk.play();
            
            end = true;
            sad.x = s.x;
            sad.y = s.y;
            kidHitbox.visible = true;
            kidHitbox.width = kid.width;
            kidHitbox.height = kid.height;
            if (!isIntersecting(road,s)){
                kidHitbox.x = s.x;
                kidHitbox.y = s.y;
                kidHitbox.width = s.width;
                kidHitbox.height = s.height;
            }
            text.setText(" Rus stayed on the road\n without hitting a kid for\n "+(Date.now()-start)/1000 + " seconds \n\n SPACE OR TAP TO RESTART");
            
        }    
        
    }
    
    
    else{//IS ENDED
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || (!honk.isPlaying && game.input.pointer1.isDown)){
            sad.x = -200;
            sad.y = -200;
            s.x = 500;
            s.y = 420;
            velocity =0;
            kid.x = 250;
            kid.y = 0;
            kidHitbox.visible = false;
            kidHitbox.width = kid.width*.85;
            kidHitbox.height = kid.height*.7;
            kidHitbox.visible = false;
            end = false;
            start = Date.now();
            text.setText("");
        
    }
}
}

function gameEND(){
    
    
}
function render() {
        //game.debug.pointer(game.input.pointer1);
        

}
