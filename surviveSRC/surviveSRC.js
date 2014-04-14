//http://code.createjs.com/soundjs-0.5.0.min.js
// WIN AT > 157
var rotation = false;
var cTime;
var startTime = Date.now();
var died = true;
var hit = false;
var maxEnemy = 0;
var playerG = 1;
var dG = 1;
var hiScore = 0;
var win = false;
var score =0;
var wavy= true;
var evilHensley = new Image()
var lastFilter = 0;
evilHensley.src = "https://dl.dropboxusercontent.com/u/1703360/Games/resources/hensley3.png" 
var hensley = new Image()
var dollymode = false;
var bigmessage = "";
var deadpic = new Image()
if(location.hash == "#dollymode")
    dollymode = true;
hensley.src = "https://dl.dropboxusercontent.com/u/1703360/Games/resources/hensley2.png";
var numberOfSprites = 9

var actions = ["licked", "shot", "kicked", "smashed", "body slammed", "thrusted", "killed", "smoked", "got", "said Oscar's name to"
,"sassed", "fell on", "rammed", "max cut", "hugged", "slapped", "body checked", "falcon punched", "quickscoped", "juked",
"ran into", "sat on", "spooned", "punched", "out-debated", "out-danced", "stabbed",
"outscored", "outsmarted", "ate", "loved", "told you, and had to kill", "slept on", "misinterpreted", "kissed",
"undid", "outdid", "ended", "buried", "ran over", "forked", "karate chopped", "surprised", "sneaked up on", "didn't want this to happen to",
"farted on", "touched","rolled onto","jumped onto", "shamed","sniped", "got caught with","dropped",
"flicked", "out-macroed","overestimated",];

var names =["Sara Aboobakar",
"Sarah Abusaa",
"Ethan Ackelsberg",
"Eliana Actor-Engel",
"Courtney Adams",
"Tony Alexander",
"Tessa Anderson",
"Kathleen Ansel",
"Zara Anwarzai",
"Daniel Anzolini",
"Ishmael Asante",
"Jin Bae",
"Edward Bakshis",
"Makaela Ballard",
"Alexandra Barber",
"Meredith Basler",
"Natalie Becker",
"Klodian Behrami",
"Garland Berenzy",
"Paul Bergstedt",
"Brianna Berman",
"Sarah Bernt",
"Guthrie Beyer",
"Adam Bigelow",
"Elijah Binford",
"Alexandra Black",
"Maritza Black",
"Jackson Blanks",
"Ceilidh Blood",
"Hanna Brandt",
"Kaelyn Brandt",
"Cayle Bray",
"Kori Brierley-Bowers",
"Hannah Briksza",
"Alexis Brisley",
"Sahra Brubeck",
"David Bussell",
"Jack Calzaretta",
"Cat Camacho",
"Sabrina Campbell",
"Chi Cao",
"Will Cartaina",
"Gina Cassel",
"Simay Cetin",
"Joyce Chae",
"Khin Chai",
"Michael Chang",
"Nina Channing",
"Quille Chayes",
"Lulu Chen",
"Yueming Chen",
"Katherine Cheng",
"Grifﬁn Church",
"Naomi Cohen",
"Kolya Cooper-Fateyev",
"Rebecca Cosenza",
"Mina Coste",
"Mikaela Dalessio",
"Alexander Danza",
"Alef Davis",
"Elibba Dean",
"Kate Decker",
"Anna Degtyarenko",
"Rose Del Missier",
"Michael Depp",
"Demitria DeRiggs",
"Natalie Desrosiers",
"Olivia Dhaliwal",
"Haley Dionne",
"Freya Dobson",
"House Dow",
"Cian Doyle",
"Leo Dunsker",
"Rachel Eccles",
"Jenny Edwards",
"Martha Edwards",
"Anton El Khoury",
"Shahreen Elahi",
"Winter Elia",
"Becka Engle",
"Najwa Escarment",
"Colin Eubank",
"Delaney Eubanks",
"Hannah Ferus",
"Greig Fields",
"Isabel Filkins",
"Michael Finkel",
"Avonlea Fisher",
"Stephanie Fox",
"Ligaya Franklin",
"Oliver Freeth",
"Theodor Gabriel",
"Rhiannon Gabriel-Jones",
"Harry Gao",
"Marcel Garbos",
"Julian Garcia-Kwan",
"Courtney-Marie Gardner",
"Victoria Garner",
"Paige Gbasie",
"Gemma Gearhart",
"Bethany Geiger",
"Ella Geismar",
"Robert Gess",
"Rohan Ghatak",
"Aidan Go",
"Lillian Goldberg",
"Trixie Gomez",
"Julia Griffin",
"Courtney Groh",
"Tyler Guitroz",
"Nicole Gunara",
"Ishan Guru",
"Naomi Harris",
"Samuel Harrison",
"Lee Hayes",
"Hazemach",
"Jasmine He",
"Izaak Hecht",
"Lorelei Heffernan",
"Oscar Hernandez",
"Ian Hetteric",
"Patrick Holmes",
"Niah Holtz",
"Sophie Horn-Mellish",
"London Hu",
"Zoe Hu",
"Chloe Hull",
"Regan Humphrey",
"Sahal Hussain",
"Shannon Igo",
"Greg Inamine",
"Lucy Introcaso",
"Jacob Ireland",
"Nishant Jagdev",
"Malcolm Jefferson",
"Sarah Johnson",
"Bianca Johnston",
"Jan Jurchak",
"Elliot Kang",
"Julian Kang",
"Youjeen Kang",
"Feston Kastrati",
"Spencer Kee",
"Emma Kelsick",
"Jacob Kerzner",
"Reed King",
"Maksim Kotov",
"Madeleine Krikava",
"Andrew Kunz",
"Ei Kyaw",
"Ray Lahiri",
"Ben Lai",
"James Lam",
"Dakotah Lamb",
"Jake Larcqua",
"Amara Lawson-Chavanu",
"Eldred Lee",
"Isabella Lee",
"Connor Lehman",
"Hannah Lejter",
"Kevin Leutzinger",
"Jonathan Levinson",
"Wanying Li",
"Zhaoran Li",
"Hannah Lienhard",
"Jordan Lome",
"Cary Long",
"Jazmine Lopez",
"Christina Lothrop",
"Elliot Luttrell-Williams",
"Ross MacFadyen",
"Theo MacPhail",
"1Luke Malskis",
"Juliette Mandal",
"Cary Mandell",
"Audrey Mannuel",
"Kulu Maphalala",
"Alicia Marachlian",
"Marianna Marques",
"Sarena Martinez",
"David Mateos",
"Avery Mauel",
"Wyatt McAllister",
"Rachel McDermott",
"Sophie McGhee",
"Mia McGiffert",
"Molly McGowan",
"Kirsiah McNamara",
"Chelsea McNay",
"Heather Meehan",
"Matthew Meier",
"Jade Mermini",
"Matthew Meyer",
"David Milkis",
"Sophie Miller",
"Kendra Mills",
"Drew Mobus",
"Meghan Molinari",
"Aung Mon",
"Meredith Montgomery",
"Elise Morgan",
"Jenifer Morgan-Davie",
"Cassandra Murphy",
"Kayleigh Myer",
"Chazlee Myers",
"Jaeeun Na",
"Kai Naor",
"Mika Naor",
"Vinzie Nen",
"Evan Newton",
"Huw Nierenberg",
"Jake Nouri",
"Michael Nouri",
"Isabel O‘Donnell",
"Jeheli Odidi",
"Bradley Oerth",
"Max Oswald-Sells",
"Serina Pace",
"Alana Pagano",
"Benjamin Palmer",
"Sam Paris",
"Bryce Parker",
"Grant Parker",
"Megan Patoskie",
"Ashley Pavesio",
"Lucy Peterson",
"Neil Pfizenmaier",
"Queen-Ama Phillips",
"Georges Pichard",
"Vijay Pillai",
"Alexander Pitman",
"Naomi Pitman",
"Konrad Piven-Kehrle",
"Ingrid Podwil",
"Solomon Polshek",
"Taylor Polster",
"Jaeme Poncin",
"Brianna Pope",
"Phil Popkin",
"Simon Popkin",
"Anna Poplawski",
"Dante Popple",
"Joelle Portelinha",
"Cameron Powell",
"Maria Presti",
"Mallie Prytherch",
"Philip Psomopoulos",
"Diego Purcell",
"Dominica Purcell",
"Camille Queen",
"Vasu Rabaib",
"Soﬁa Raﬁkova",
"16Payal Rana",
"Katharine Reid",
"Laurens Riedler",
"AJ Rio-Glick",
"Virginia Robinson",
"Seth Roseman",
"Maya Rosenman",
"Grace Rossman",
"Abi Rowe",
"Kahlia Russell-Self",
"Nathan Sadowsky",
"Emma Sanger-Johnson",
"Andre Santana",
"Daniel Sawyer",
"Thomas Schalke",
"Andrea Schuchardt",
"Johanna Schwartz",
"Samm Scott",
"Hayden Selingo",
"Patricia Sendao",
"Linsen Settembrini",
"Irene Shamas",
"Michael Shank",
"Melissa Sherman-Bennett",
"Daneil Shi",
"Leandra Shields",
"Nate Shoobs",
"Ihor Shuhan",
"Simon Smith",
"Mercy Solbeck",
"Sebastian Spitz",
"Elle Stanion-McDermid",
"Ian Stanion-McDermid",
"Cori Stenning-Barnes",
"Ali Stritzler-Levine",
"Luke Stroehlein",
"Moses Sukin",
"Chelsea Suydam",
"Koshu Takatsuji",
"Bazl Taliaferrow-Mosleh",
"Danya Tracht",
"Tara Turnbull",
"Uzoamaka Uwechia",
"Nichol Vannest",
"Zev Velleman",
"Samantha Waldron-Feinstein",
"Yuxing Wang",
"George Ward",
"Sierra Warren",
"Pearl Weggler",
"Aaron Weiss",
"Jared Weiss",
"Naida West",
"Erin Wilkerson",
"Kiyomi Wilks",
"Jonathan Williams",
"Samantha Wilson",
"Amy Xu",
"June Yang",
"Nancy Yang",
"Samantha Yarmis",
"Sophie Yeasmin",
"Minji Yoon",
"Gavin Young",
"James Yu",
"Maisha Zahed",
"Spencer Zeitel",
"Mengtian Zhao",
"Alwaleed Zia",
"Amber Zia",
"Molly Ziegler",
"Sally Zieper",
"Gabe Zimmerman",
"Dawson Zimmermann",
"Andy Zito",
"Julian Zon",
];

var deathmessages = ["Daniel ninja kicked you",
"Spencer outslept you",
"Ishmael kamehamehad you",
"Oscar spirit bombed you",
"PJ licked you",
"Ray killed you with rhetoric",
"Reed deedled you",
"Solomon fed their carry",
"Muir 'not even close, baby'ed you",
];
console.log("length of sprites == length of deathmessages")
console.log(numberOfSprites == deathmessages.length)

var focused = true;
$(window).blur(function() {
    focused = false;
    document.getElementById('soundEfx').pause()
    Game.enemies = []
    document.getElementById('soundEfx').currentTime = 0;
});

$(window).focus(function() {
    focused= true;
    
    document.getElementById('soundEfx').currentTime = 0;
    document.getElementById('soundEfx').play();
});

var Key = {
  _pressed: {},
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
}, false);

var Game = {
  fps: 60,
  width: 1280,
  height: 480
};

Game._onEachFrame = (function() {
  var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  if (requestAnimationFrame) {
   return function(cb) {
      var _cb = function() { cb(); requestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    return function(cb) {
      setInterval(cb, 1000 / Game.fps);
    }
  }
})();

Game.start = function() {
  console.log(location.hash);
  var startTime = Date.now();
  var soundEfx;
  var winSong;
  winSong = document.getElementById("winSong");
  soundEfx = document.getElementById("soundEfx");
  soundEfx.play();
  
  //setTimeout(function() {function();},1250);
  Game.canvas = document.createElement("canvas");
  Game.canvas.width = Game.width;
  Game.canvas.height = Game.height;
  Game.context = Game.canvas.getContext("2d");
  Game.context.fillStyle = 'yellow';
  document.body.appendChild(Game.canvas);
  Game.player = new Player();
  Game.enemies = [];//[new Enemy, new Enemy, new Enemy]
  Game._onEachFrame(Game.run);
};

Game.run = (function() {
  var loops = 0, skipTicks = 1000 / Game.fps,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime(),
      lastGameTick;
  return function() {
    loops = 0;

    while ((new Date).getTime() > nextGameTick) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    if (loops) Game.draw();
  }
})();

Game.draw = function() {
  if (soundEfx.currentTime < 29 && !win){
  Game.context.fillStyle = 'white'
  Game.context.fillRect(0, 0, Game.width, Game.height);
  }
  if (soundEfx.currentTime >= 29) wavy=true;
  if(win){
  Game.enemies = [];
  Game.context.clearRect(0,0, Game.width, Game.height);
  Game.context.fillStyle = 'black';
    Game.context.fillText("YOU WIN! Tell kevin now!", Game.width/2, Game.height/2);
    winSong.play();  
  };
/*  else{
    if (Game.enemies.length == 0){
      maxEnemy = 10;
      Game.context.clearRect(0,0,Game.width, Game.height);}
    else
      if (maxEnemy > 0)
        maxEnemy -= 1;
  };*/
  for (var i = 0; i < Game.enemies.length; i++) {
    Game.enemies[i].draw(Game.context)
  }
  Game.context.fillStyle = "blue";
  Game.context.font = "bold 12px Arial";
  if (Date.now() - startTime > 4000 && died){
    Game.context.fillStyle= 'white';
    Game.context.fillRect(0,0, 90, 30);
    Game.context.fillStyle = 'black';
    Game.context.fillText(soundEfx.currentTime, 5, 10);
  Game.context.fillText('hi:'+hiScore, 5, 20);
  Game.context.font = "bold 40px Arial";
  Game.context.fillText(bigmessage, 10, Game.height/2);
  Game.context.font = "bold 12px Arial";
  Game.context.drawImage(deadpic, 100,100, 100*.88, 100);
    };
  Game.player.draw(Game.context);
};

function isBigEnough(element) {
  return element.x > -element.size;
}

Game.update = function() {
    score += 1;
  for (var i = 0; i < Game.enemies.length; i++) {
    Game.enemies[i].update()
    if (hitPlayer(Game.enemies[i])){
    if(document.getElementById('soundEfx').currentTime > hiScore)
    hiScore = document.getElementById('soundEfx').currentTime;
    console.log(hiScore);
      document.getElementById('soundEfx').currentTime = 0;
      console.log("HIT!!");
      hit = true;
      died = true;
        action = Math.floor(Math.random()*actions.length)
        deadpic.src = "./pictures/" +Game.enemies[i].randPic+".jpg"
        bigmessage = names[Game.enemies[i].randPic] +" "+actions[action]+" you.";
        if(names[Game.enemies[i].randPic] == "Kevin Leutzinger"){bigmessage = "Kevin Leutzinger made this game"};
      Game.enemies = []
      maxEnemy = 0;
      //Game.context.fillStyle = "purple";
      Game.context.clearRect(0, 0, Game.width, Game.height);
     }
  }
  Game.enemies = Game.enemies.filter(isBigEnough);
 // if(lastFilter > 30){
  //Game.enemies = Game.enemies.filter(isBigEnough);
  //lastFilter =  0;
//};
  cTime = soundEfx.currentTime
  if(cTime >= 155) win = true;
  if(cTime > 3){
      bigmessage = "";
      deadpic.src = "";
      };
  if(document.getElementById("MM_checkbox").checked){
    maxEnemy = 100;
  }
  else{
  if (cTime > 5.5 && cTime < 16.4 )
    maxEnemy = 5;
  if (cTime > 16.5 && cTime <28)
    maxEnemy = 10;
  };
  if(Game.enemies.length < maxEnemy){
  if(!win){
    Game.enemies.push(new Enemy)}
    ;}
  Game.player.update();
};

function Player() {
  this.x = 0;
  this.y = 0;
  this.height = 32;
  this.width = 32;
  this.xVel = 0;
  this.yVel = 0;
}

Player.prototype.draw = function(context) {
  if(hit) Game.context.fillStyle = 'black';
  else Game.context.fillStyle = 'rgb(255,'+playerG+',0)';
  hit = false;
  context.fillRect(this.x, this.y, this.height, this.width);
};

Player.prototype.moveLeft = function() {this.xVel = -5;};
Player.prototype.moveRight = function() {this.xVel = 5;};
Player.prototype.moveUp = function() {this.yVel = -5;};
Player.prototype.moveDown = function() {this.yVel = 5;};

Player.prototype.bind = function() {
  if (this.y <= 0) this.y = 0;
  if (this.y >= Game.height - this.height) this.y = Game.height - this.height;
  if (this.x <= 0) this.x = 0;
  if (this.x >= Game.width - this.width) this.x = Game.width - this.width;
};

Player.prototype.update = function() {
  if (playerG >= 244 || playerG <= 0)
    dG = -dG;
  playerG += dG;
  this.xVel = 0;
  this.yVel = 0;
  if (Key.isDown(Key.UP)) this.moveUp();
  if (Key.isDown(Key.LEFT)) this.moveLeft();
  if (Key.isDown(Key.DOWN)) this.moveDown();
  if (Key.isDown(Key.RIGHT)) this.moveRight();
  this.x += this.xVel;
  this.y += this.yVel;
  this.bind();
};

function hitPlayer(e){
  return(
    e.x < Game.player.x + Game.player.width  &&
    e.x + e.width  > Game.player.x &&
    e.y < Game.player.y + Game.player.height &&
    e.y + e.height > Game.player.y
    );
};

function Enemy() {
  this.img = new Image();
  this.randPic = Math.floor(Math.random() * names.length)
  console.log("dollymode");
  this.img.src = "./pictures/" +this.randPic+".jpg";

                //if (this.xVel > -7)  
            //context.drawImage(this., this.x,this.y, this.width, this.height)
  this.x = 1500;
  this.sinMag = 20 + (Math.random() * 50)
  this.yOffset = this.y = Math.floor(Math.random() * (Game.height + 100) - 50);
  
  if(document.getElementById("BE_checkbox").checked){
    this.size = Math.random() * 200 + 60;
  }
  else{
    this.size = Math.random() * 20 + 30;
  };
  //this.height = 40;
  //this.width = 40;
  this.height = this.size;
  this.width = this.size*.88;
  if(document.getElementById("SS_checkbox").checked){
    this.xVel = -1 - (Math.random()*20);
  }
  else{
    this.xVel = -.5 - (Math.random()*8);
  };
  
  this.yVel = -.5 - (Math.random()*8);
};

Enemy.prototype.draw = function(context) {
  Game.context.fillStyle = 'red';
  context.drawImage(this.img, this.x,this.y, this.width, this.height);
};

Enemy.prototype.bind = function() {
  if (this.x <= 0 && this.xVel < 0)
    this.xVel = -this.xVel;;
  if (this.x > Game.width - this.width && this.xVel > 0)
    this.xVel = -this.xVel;;
  if (this.y <= 0 && this.yVel < 0)
    this.yVel = -this.yVel;
  if (this.y > Game.height - this.width && this.yVel > 0)
    this.yVel = -this.yVel;
  };
Enemy.prototype.update = function() {
  this.x += this.xVel;
  //this.y += this.yVel;
  if (wavy){
  this.y = Math.sin(this.x/this.sinMag) * this.sinMag * 2;
  this.y += this.yOffset;
};
  //this.bind();
};


