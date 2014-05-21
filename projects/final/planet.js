
var Planet = function(radius, x, y, dx, dy, mass, planets, color){
this.radius = radius;
this.x  = x;
this.y = y;
this.dx = dx;
this.dy = dy;
this.mass = mass;
this.planets = planets;
this.color = color;
};

Planet.prototype.update = function(dt){
    // planet.x += planet.dx;
    // planet.y += planet.dy;
    var nextStep = gravityRK4(this.planets,this.x,this.y,this.dx,this.dy,dt);
    this.x = nextStep.x;
    this.y = nextStep.y;
    this.dx = nextStep.vx;
    this.dy = nextStep.vy;
}; 

Planet.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  // ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fill();
};
