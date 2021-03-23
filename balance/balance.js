var cTime;
var startTime = Date.now();
var maxEnemy = 0;
var playerG = 1;
var dG = 1;
var gravity = 1;
var score = 0;

function getAngle(e1, e2) {
  //(entity1, entity2)
  xdiff = e2.x - e1.x;
  ydiff = e2.y - e1.y;
  return Math.atan2(ydiff, xdiff);
}

function round(num, decimal_places) {
  this.mult = Math.pow(10, decimal_places);
  return Math.round(num * this.mult) / this.mult;
}

function circle_hit(c1, c2, mult) {
  dx = c2.x - c1.x;
  dy = c2.y - c1.y;
  radii = c1.radius * mult + c2.radius;
  return dx * dx + dy * dy < radii * radii;
}

function c1_in_c2(c1, c2) {
  if (c2.radius < c1.radius) return false;
  dx = c2.x - c1.x;
  dy = c2.y - c1.y;

  return dx * dx + dy * dy < c2.radius * c2.radius;

  //radii = c2.radius - c1.radius;
  //return ((dx*dx)+(dy*dy)) < (radii*radii);
}

var Key = {
  _pressed: {},
  A: 65,
  UP: 38,
  Z: 90,
  DOWN: 40,

  isDown: function (keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function (event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function (event) {
    delete this._pressed[event.keyCode];
  },
};

window.addEventListener(
  "keyup",
  function (event) {
    Key.onKeyup(event);
  },
  false
);
window.addEventListener(
  "keydown",
  function (event) {
    Key.onKeydown(event);
  },
  false
);

window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

var Game = {
  fps: 60,
  width: 500,
  height: 500,
};

Game._onEachFrame = (function () {
  var requestAnimationFrame =
    window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  if (requestAnimationFrame) {
    return function (cb) {
      var _cb = function () {
        cb();
        requestAnimationFrame(_cb);
      };
      _cb();
    };
  } else {
    return function (cb) {
      setInterval(cb, 1000 / Game.fps);
    };
  }
})();

function aboveBottom(element) {
  return element.y < Game.height + element.radius;
}

Game.start = function () {
  var startTime = Date.now();
  Game.canvas = document.createElement("canvas");
  Game.canvas.width = Game.width;
  Game.canvas.height = Game.height;
  Game.context = Game.canvas.getContext("2d");
  Game.context.fillStyle = "yellow";
  document.body.appendChild(Game.canvas);
  Game.player = new Player();
  Game.end1 = new End();
  Game.end2 = new End();
  Game.goal = new CollideCircle();
  Game.enemies = [new Enemy(), new Enemy(), new Enemy()];
  Game.end2.x = Game.width;
  Game.slope = 0;
  Game.angle = getAngle(this.end1, this.end2);
  Game._onEachFrame(Game.run);
  Game.spawnRate = 0.02;
  Game.printNum = 0;
  Game.printMessage = 1;
};

Game.run = (function () {
  var loops = 0,
    skipTicks = 1000 / Game.fps,
    maxFrameSkip = 10,
    nextGameTick = new Date().getTime(),
    lastGameTick;
  return function () {
    loops = 0;

    while (new Date().getTime() > nextGameTick) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    if (loops) Game.draw();
  };
})();

Game.draw = function () {
  Game.context.fillstyle = "white";
  Game.context.clearRect(0, 0, Game.width, Game.height);

  for (var i = 0; i < Game.enemies.length; i++) {
    Game.enemies[i].draw();
  }

  Game.context.beginPath();
  Game.context.moveTo(this.end1.x, this.end1.y);
  Game.context.lineTo(this.end2.x, this.end2.y);
  Game.context.stroke();
  Game.end1.draw(Game.context);
  Game.end2.draw(Game.context);
  Game.player.draw(Game.context);
  Game.goal.draw();
  Game.context.fillStyle = "white";
  Game.context.fillRect(0, 0, 90, 30);
  Game.context.fillStyle = "black";
  pi2 = 2 * Math.PI;
  modAngle = Game.goal.angle % pi2;
  sinAngle = Math.sin(Game.goal.angle - Game.angle);
  //  Game.context.fillText('angle  : '+ round(modAngle, 4), 5, 10);

  Game.context.fillText("angle: " + round(Game.printNum, 4), 5, 10);
  Game.context.fillText("score: " + score, 5, 20);

  //Game.context.fillText('angle  : '+ round(sinAngle, 4), 5, 10);
  //Game.context.fillText('slope: '+round(Game.slope,4), 5, 20);
};

Game.update = function () {
  score += 1;
  if (Key.isDown(Key.DOWN)) this.end2.yVel = 6;
  if (Key.isDown(Key.UP)) this.end2.yVel = -6;
  if (Key.isDown(Key.Z)) this.end1.yVel = 6;
  if (Key.isDown(Key.A)) this.end1.yVel = -6;
  this.end1.update();
  this.end2.update();
  this.angle = getAngle(this.end1, this.end2);
  this.slope = (this.end2.y - this.end1.y) / (this.end2.x - this.end1.x);
  this.player.update();
  this.goal.update();
  if (Math.random() < this.spawnRate) {
    // start at .02
    Game.enemies.push(new Enemy());
    Game.enemies = Game.enemies.filter(aboveBottom);
  }
  for (var i = 0; i < Game.enemies.length; i++) {
    enemy = Game.enemies[i];
    enemy.update();
  }
};

function End() {
  this.radius = 10;
  this.y = Game.height / 2;
  this.x = 0;
  this.yVel = 0;
}

End.prototype.draw = function (context) {
  Game.context.fillStyle = "black";
  Game.context.beginPath();
  Game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  Game.context.fillStyle = "black";
  Game.context.fill();
  Game.context.lineWidth = 5;
  Game.context.strokeStyle = "#003300";
};

End.prototype.update = function () {
  this.y += this.yVel;
  //this.x += this.xVel;
  this.yVel = 0;
  if (this.y <= 0) {
    this.y = 0;
    if (this.yVel <= 0) this.yVel = 0;
  }
  if (this.y >= Game.width) {
    this.y = Game.width;
    if (this.yVel >= 0) this.yVel = 0;
  }
  if (Math.abs(this.xVel) <= 3) xVel = 0;
};

function Player() {
  this.x = Game.width / 2;
  this.y = 0;
  this.radius = 25;
  this.xVel = 0;
  this.yVel = 0;
  this.prevXVel = 0;
  this.accel = 0;
  this.friction_const = 0.95;
  this.friction_mult = 0.95;
}

Player.prototype.update = function () {
  if (playerG >= 244 || playerG <= 0) dG = -dG;
  playerG += dG;
  this.accel = gravity * Math.sin(Game.angle);
  this.xVel += this.accel;
  if (Math.abs(Game.slope) < 0.05) {
    this.xVel *= 0.95;
  }
  this.x += this.xVel;
  this.yVel = 0;
  this.y = Game.slope * this.x + Game.end1.y;
  this.bind();
  this.prevXVel = this.xVel;
};

Player.prototype.draw = function (context) {
  Game.context.fillStyle = "black";
  context.beginPath();
  Game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  Game.context.fillStyle = "green";
  Game.context.fill();
  Game.context.lineWidth = 5;
  Game.context.strokeStyle = "#003300";
};

Player.prototype.bind = function () {
  if (this.x <= Game.end1.x) {
    this.x = Game.end1.x;
    if (this.xVel <= 0) this.xVel = 0;
  }
  if (this.x >= Game.end2.x) {
    this.x = Game.end2.x;
    if (this.xVel >= 0) this.xVel = 0;
  }
};

function CollideCircle() {
  this.x = 0;
  this.y = 0;
  this.radius = 15;
  this.xVel = 0;
  this.yVel = 0;
  this.xAccel = 0;
  this.yAccel = 0;
  this.color = "red";
  this.goodGuy = true;
  this.angle = 0;
  this.xMag = 100;
  this.yMag = 100;
  this.active = true;
  this.angleDiff = 0.05;
  this.centerX = Game.width / 2;
  this.centerY = Game.height / 2;
}

CollideCircle.prototype.draw = function (context) {
  Game.context.fillStyle = this.color;
  Game.context.beginPath();
  Game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  Game.context.fillStyle = this.color;
  Game.context.fill();
  Game.context.lineWidth = 5;
  Game.context.strokeStyle = "#003300";
};

//this.color = "purple";
CollideCircle.prototype.update = function () {
  if (this.angle <= 0) this.angle = 2 * Math.PI + this.angle;
  if (this.angle >= 2 * Math.PI) this.angle = 0;
  this.angleDiff = Game.slope / 4; // + (Math.random() -.5) * .005;
  this.centerX = Game.player.x;
  this.centerY = Game.player.y;
  this.angle += this.angleDiff;
  this.relativeAngle = this.angle - Game.angle;
  //this.minAngle = Game.angle + Math.pi - .5;
  //this.maxAngle = Game.angle + .5;
  //if(this.angle >= this.maxAngle){ this.angle = this.maxAngle; console.log("MAX");};
  //if(this.angle <= this.minAngle){ this.angle = this.minAngle; console.log("min");};
  this.relativeSin = Math.sin(this.relativeAngle);
  this.relativeCos = Math.cos(this.relativeAngle);
  if (this.relativeSin >= 0.4 && false) {
    console.log("MAX");
    if (this.relativeSin >= 0) {
      //positive
      this.angle = this.relativeAngle + Game.angle + Math.PI + 3;
    }
    if (this.relativeSin <= 0) {
      //neg?
      this.angle = this.relativeAngle + Game.angle + 3;
      console.log("NEG");
    }
  }
  this.x = Math.cos(this.angle) * this.xMag + this.centerX;
  this.y = Math.sin(this.angle) * this.yMag + this.centerY;
  if (this.active) this.color = "red";
  if (!this.active) this.color = "#A4A4A4";
  Game.printNum = this.angle;
  if (this.relativeSin > 0) {
    this.active = true;
  }
  /*
     if(Math.abs(this.x * Game.slope) > 0){
    this.color = "purple";
        console.log("below!")
        };
        
        */
};

function thanks() {
  box = document.getElementById("thx_checkbox");
  if (box.checked) alert("Thanks!");
}

function Enemy() {
  this.x = Game.width * Math.random();
  this.radius = 20 * Math.random() + 25;
  this.y = -this.radius;
  this.xVel = 0;
  this.yVel = 1;
  this.active = true;
  this.color = "black";
}

Enemy.prototype.update = function () {
  this.x += this.xVel;
  this.y += this.yVel;
  if (c1_in_c2(Game.goal, this) && this.active && Game.goal.active) {
    //hit by protector
    Game.goal.active = false;
    this.active = false;
    this.color = "#F2F2F2"; //light gray
  }
  if (c1_in_c2(Game.player, this) && this.active) {
    //hit by player DEAD
    Game.enemies = [new Enemy(), new Enemy(), new Enemy()];
    Game.goal.active = true;
    this.color = "#DF7401"; //orangeish
    Game.printMessage = "DEAD";
    score = 0;
  }
};

Enemy.prototype.draw = function (context) {
  Game.context.fillStyle = "blue";
  Game.context.beginPath();
  Game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  Game.context.fillStyle = this.color;
  Game.context.fill();
  Game.context.lineWidth = 5;
  Game.context.strokeStyle = "#003300";
};

/* OLD CIRCLE UPDATE FUNCTION   
 if(this.goodGuy){
        this.xAccel += (.5 -Math.random())*.005;
        this.yAccel += (.5 -Math.random())*.005;
      };
      this.xVel += this.xAccel;
      this.yVel += this.yAccel;
      this.x += this.xVel
      this.y += this.yVel
      this.bind();
    
    
    OLD BIND FUNCTION
    CollideCircle.prototype.bind = function() {
  if (this.x <= 0 && this.xVel<=0){
      this.xAccel += Math.random()* .05
      this.xVel = -this.xVel;
      this.x = 0;};
  if(this.x >= Game.width && this.xVel>=0){
      this.xAccel -= Math.random()* .05
      this.xVel= -this.xVel;
      this.x - Game.width;};
  if (this.y <= 0 && this.yVel<=0){
      this.yAccel += Math.random()* .05
      this.yVel = -this.yVel;
      this.y = 0;};
  if(this.y >= Game.height && this.yVel>=0){
      this.yAccel -= Math.random() * .05
      this.yVel= -this.yVel;
      this.y = Game.height;}
  if (Math.abs(this.yAccel) > 1)
      this.yAccel = 1 * sign(yAccel);
  if (Math.abs(this.xAccel) > 1)
      this.xAccel = 1 * sign(xAccel);
};

    
    
    
    */
