var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('mushroom', 'assets/bus.png');
    game.load.audio('honk', 'assets/honk.ogg');
    
}

var s;
var honk;
var velocity_multiplier;
var velocity_multiplier = 0;
var velocity;
velocity = 0;

function create() {
    game.stage.backgroundColor = 0xaaaabb;

    s = game.add.sprite(200, 200, 'mushroom');
    s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(.1, .1);
    
    honk = game.add.audio('honk');

}

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

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        velocity += -.001;
    }
    else{
        velocity += .001;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        honk.play();
    }
    
    if (velocity > 2){
        velocity = 2;
    }
    
    if (velocity < -2){
        velocity = -2;
    }
    s.x += velocity;
}

function render() {
    game.debug.spriteInfo(s, 20, 32);
}
