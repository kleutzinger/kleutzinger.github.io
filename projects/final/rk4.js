
var G_CONSTANT = 1;

var xGravityIntegration = function(mass, planetX, planetY, x, y, vx, vy, dt)
{
    return G_CONSTANT * mass/(Math.pow(planetX-x,2) + Math.pow(planetY - y,2))*Math.cos(Math.atan2(x-planetX, y-planetY)+3.14159/2)
}

var planetsIntegration = function(planets, x, y, vx, vy, dt)
{
    var ax = 0;
    var ay = 0;
    for(var i = 0; i < planets.length; i++)
    {
        ax += xGravityIntegration(planets[i].mass, planets[i].x,planets[i].y, x, y, vx, vy, dt);
        ay += xGravityIntegration(planets[i].mass, planets[i].y,planets[i].x, y, x, vy, vx, dt);
    }
    return {ax:ax, ay:ay};
}

var gravityRK4 = function(planets, x, y, vx, vy, dt) {

  var x1 = x;
  var vx1 = vx;
  var y1 = y;
  var vy1 = vy;
  var a1 = planetsIntegration(planets, x1, y1, vx1, vy1, 0);
  var ax1 = a1.ax;
  var ay1 = a1.ay;
  // var ax1 = xGravityIntegration(mass, planetX, planetY, x1, y1, vx1, vy1, 0);
  // var ay1 = xGravityIntegration(mass, planetY, planetX, y1, x1, vy1, vx1, 0);

  var x2 = x + 0.5*vx1*dt;
  var vx2 = vx + 0.5*ax1*dt;
  var y2 = y + 0.5*vy1*dt;
  var vy2 = vy + 0.5*ay1*dt;
  var a2 = planetsIntegration(planets, x2, y2, vx2, vy2, 0);
  var ax2 = a2.ax;
  var ay2 = a2.ay;
  // var ax2 = xGravityIntegration(mass, planetX, planetY, x2, y2, vx2, vy2, dt/2);
  // var ay2 = xGravityIntegration(mass, planetY, planetX, y2, x2, vy2, vx2, dt/2);
 
  var x3 = x + 0.5*vx2*dt;
  var vx3 = vx + 0.5*ax2*dt;
  var y3 = y + 0.5*vy2*dt;
  var vy3 = vy + 0.5*ay2*dt;
  var a3 = planetsIntegration(planets, x3, y3, vx3, vy3, 0);
  var ax3 = a3.ax;
  var ay3 = a3.ay;
  // var ax3 = xGravityIntegration(mass,planetX, planetY, x3, y3, vx3, vy3, dt/2);
  // var ay3 = xGravityIntegration(mass,planetY, planetX, y3, x3, vy3, vx3, dt/2);
 
  var x4 = x + vx3*dt;
  var vx4 = vx + ax3*dt;
  var y4 = y + vy3*dt;
  var vy4 = vy + ay3*dt;
  var a4 = planetsIntegration(planets, x4, y4, vx4, vy4, 0);
  var ax4 = a4.ax;
  var ay4 = a4.ay;
  // var ax4 = xGravityIntegration(mass, planetX, planetY, x4, y4, vx4, vy4, dt);
  // var ay4 = xGravityIntegration(mass, planetY, planetX, y4, x4, vy4, vx4, dt);
 
  var xf = x + (dt/6)*(vx1 + 2*vx2 + 2*vx3 + vx4);
  var vxf = vx + (dt/6)*(ax1 + 2*ax2 + 2*ax3 + ax4);
  var yf = y + (dt/6)*(vy1 + 2*vy2 + 2*vy3 + vy4);
  var vyf = vy + (dt/6)*(ay1 + 2*ay2 + 2*ay3 + ay4);
 
  return {x:xf, y:yf, vx:vxf, vy:vyf};
}
