//HI there this is the main file
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Jetski Mayhem', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ski', 'assets/ski.png', 64, 64);
    game.load.image('background', 'assets/background.png');

}
var parallaxToggle = false;
var toggleTimer = 0;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var midY;
var previousY;
var waterBits = [];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    //game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(64, 64, 'ski');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    //player.body.setSize(64, 64, 5, 16);

    midY = game.height / 2;
    midY -= player.height/2;

    cursors = game.input.keyboard.createCursorKeys();
    toggleButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function setGravity(){
    game.physics.arcade.gravity.y = -(player.body.y - midY)*2;
    game.physics.arcade.gravity.y *= 2;
}



function checkSurfaceBreak(){
    if(Math.abs(player.body.y - midY) < 10){
        player.body.velocity.y *= .9;
    }
}

function pastScreen(s){
    return s.x > -s.width && parallaxToggle;
}

function updateWaterBits(){
    if (Math.random() > .4  || waterBits.length <= 0){
        size = Math.random() * 5;
        Prect = new Phaser.Rectangle(game.width,Math.random() * game.height *.5 + game.height*.5,size,size)
        Prect.xVelocity = (Math.random() * 1.4) - size -5,
        Prect.color = randomColor({luminosity:'light', hue:'blue'});
        waterBits.push(Prect);
    }
    for(i=0;i<waterBits.length;i++){
        waterBits[i].x += waterBits[i].xVelocity;
    }
    waterBits = waterBits.filter(pastScreen);
}

function update() {
    player.angle = player.body.velocity.y / 10;
    setGravity();
    updateWaterBits();
    checkSurfaceBreak();
    // game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }
    
    if (cursors.down.isDown){
        game.physics.arcade.gravity.y += 500;
    }
    
    if (toggleButton.isDown && game.time.now > toggleTimer){
    parallaxToggle = !parallaxToggle;
    toggleTimer = game.time.now + 750;
}

}

function render () {
    for (i=0;i<waterBits.length;i++){
        game.debug.geom(waterBits[i], waterBits[i].color);
    }
    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
