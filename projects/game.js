var planets = [];
var stepSize

function resetVals(){

$('#stepSize').val(0.1);
$('#sunMass').val(9000);
$('#planetMass').val(400);
$('#moonMass').val(30);

$('#sunX').val(400);
$('#planetX').val(550);
$('#moonX').val(560);

$('#sunY').val(200);
$('#planetY').val(220);
$('#moonY').val(225);

$('#sunDX').val(0);
$('#planetDX').val(0.1);
$('#moonDX').val(0.2);

$('#sunDY').val(0);
$('#planetDY').val(5);
$('#moonDY').val(.01);

};
resetVals();

function draw() {   
  var ctx = document.getElementById('canvas').getContext('2d');
  //ctx.clearRect(0,0,300,300); // clear canvas
  ctx.fillStyle = 'rgba(0,0,0,0.01)';
  ctx.fillRect(0, 0, 900, 450);
  console.log(planets)
  for(var i = 0; i < planets.length; i++)
  {
    planets[i].update(stepSize);
    planets[i].draw(ctx);
  }
}



 function init(){
  reset();
  setInterval(draw,10);
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,1)';
  reset();
  //ctx.fillRect(0, 0, 800, 600);
  // test();
}

function reset () {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fillRect(0, 0, 900, 450);
  planets = [];
  var sunX= document.getElementById('sunX').value *1
  var sunY= document.getElementById('sunY').value*1
  var sunMass= document.getElementById('sunMass').value*1
  var sunDX= document.getElementById('sunDX').value *1
  var sunDY= document.getElementById('sunDY').value*1
  
  var planetX= document.getElementById('planetX').value*1
  var planetY= document.getElementById('planetY').value*1
  var planetMass= document.getElementById('planetMass').value*1
  var planetDX= document.getElementById('planetDX').value*1
  var planetDY= document.getElementById('planetDY').value*1
  
  var moonX= document.getElementById('moonX').value*1
  var moonY= document.getElementById('moonY').value*1
  var moonMass= document.getElementById('moonMass').value*1
  var moonDX= document.getElementById('moonDX').value*1
  var moonDY= document.getElementById('moonDY').value*1
  
  planets.push(new Planet(30, sunX,    sunY,     sunDX,   sunDY, sunMass, [],'rgba(255,255,0,1)')); //SUN
  planets.push(new Planet(5,  planetX, planetY ,planetDX, planetDY, planetMass, [planets[0],],'rgba(0,255,0,1)')); //EARTH
  planets.push(new Planet(2,  moonX,   moonY,     moonDX,  moonDY, moonMass, [planets[0],planets[1]],'rgba(255,0,0,1)')); //MOON
  stepSize =  document.getElementById('stepSize').value
}


