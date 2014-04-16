//http://code.createjs.com/soundjs-0.5.0.min.js
// WIN AT > 157
var thisURL = 'http://kevinleutzinger.com/surviveSRC'
var lastScore = -1;
var deathPost = '';
var deathPic = '';
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
var rotMode = false;
var wavy= true;
var evilHensley = new Image()
var lastFilter = 0;
evilHensley.src = "https://dl.dropboxusercontent.com/u/1703360/Games/resources/hensley3.png" 
var hensley = new Image()
var dollymode = false;
var bigmessage = "";
var deadpic = new Image()
var lastDeathMessage = ""
var sharePic =new Image()
deadpic.src = "./pictures/nothing.png"

if(location.hash == "#dollymode")
    dollymode = true;
hensley.src = "https://dl.dropboxusercontent.com/u/1703360/Games/resources/hensley2.png";
var numberOfSprites = 9

var actions = ["licked", "shot", "kicked", "smashed", "body slammed", "thrusted", "killed", "smoked", "got", "said Oscar's name to"
,"sassed", "fell on", "rammed", "max cut", "hugged", "slapped", "body checked", "falcon punched", "quickscoped", "juked",
"ran into", "sat on", "spooned", "punched", "out-debated", "out-danced", "stabbed", "rekt", "tried to look nonchalant to",
"outscored", "outsmarted", "ate", "loved", "told you, and had to kill", "slept on", "misinterpreted", "kissed",
"undid", "outdid", "ended", "buried", "ran over", "forked", "karate chopped", "surprised", "sneaked up on", "didn't want this to happen to",
"farted on", "touched","rolled onto","jumped onto", "shamed","sniped", "got caught with","dropped",
"flicked", "out-macroed","overestimated", "banged", "tickled", "went to prom with", "uppercut", "bit", "slithered into",
"poked", "slam jammed", "porked", "infracted", "called security on", "super-soaked","zombified", "roundhouse kicked",
"dismissed", "swallowed", "told","told on", "denied","rejected","entered","exploded","poisoned","zapped","decapitated",
"slurped","derped","defenestrated","tazered","threw up on","munched","inhaled","deleted","absorbed","knifed","tackled",
"intercepted","blocked","fb blocked","permabanned","banhammered","mugged","looked at","eyeballed","dunked on","360 noscoped",
"snorted","suspended","froze","burned","slpashed","blasted","popped","got engaged to","married","divorced","impregnated",
"infested","infected","incinerated","critical hit","knocked out","home runned","borked","snapped","scared","scarred",
"fired","threw stones at","got stoned with","turnt","risked it with","slammed","sprayed","hole in oned","usurped","dethroned",
"upset","ended the game for","fell in love with","showered with","advocated","mega moded","spiked","ran away with","pickled",
"raced up and down the sidewalk with","dominated","didn't go to prom with","benched","disowned","regurgitated","turned down",
"jacked","spat on","buttered","reported","broke vows with","countered","Vulcan nerve pinched", "disregarded","washed",
"expelled","was done with","burst","deflated","finished","pounced on","bounced","got jiggy with","nerfed",
"said play this game to","cold shouldered","dog showed","snorted","transcended","spilled","horsed around with",
"roughed up","rubbed","hurt","smelled","followed","left","proxied","cut their losses with","lots of thingsed",
"budget cut","made sense of","spanked","sent","tricked","trapped","strafed","circle-strafed","spoiled","split",
"barely got","overheated","frustrated","got frustrated by","held","cheesed","canned","sacked","rushed","disregarded",
"ding dong ditched","sexiled","reminded","showed no mercy toward","played this song to","blocked this website for",
"told Kevin about","betrayed","backstabbed","taught","outplayed","corrupted","too many verbs","coughed on",
"digitized","dated","learned about","1080 backflipped","acted normal around","lent a Shriner's car to",
"no contact ordered","investigated","snacked on","noticed","zapped","shanked","imprisoned","incarcerated","helped","cha-cha slided"];

var names  = ["Sara","Sarah","Ethan","Eliana","Courtney","Tony","Tessa","Kathleen","Zara","Daniel","Ishmael","Jin","Edward","Makaela","Alexandra","Meredith","Natalie","Klodian","Garland","Paul","Brianna","Sarah","Guthrie","Adam","Elijah","Alexandra","Maritza","Jackson","Ceilidh","Hanna","Kaelyn","Cayle","Kori","Hannah","Alexis","Sahra","David","Jack","Cat","Sabrina","Chi","Will","Gina","Simay","Joyce","Khin","Michael","Nina","Quille","Lulu","Yueming","Katherine","Grifﬁn","Naomi","Kolya","Rebecca","Mina","Mikaela","Alexander","Alef","Elibba","Kate","Anna","Rose","Michael","Demitria","Natalie","Olivia","Haley","Freya","House","Cian","Leo","Rachel","Jenny","Martha","Anton","Shahreen","Winter","Becka","Najwa","Colin","Delaney","Hannah","Greig","Isabel","Michael","Avonlea","Stephanie","Ligaya","Oliver","Theodor","Rhiannon","Harry","Marcel","Julian","Courtney-Marie","Victoria","Paige","Gemma","Bethany","Ella","Robert","Rohan","Aidan","Lillian","Trixie","Julia","Courtney","Tyler","Nicole","Ishan","Naomi","Samuel","Lee","Hazemach","Jasmine","Izaak","Lorelei","Oscar","Ian","Patrick","Niah","Sophie","London","Zoe","Chloe","Regan","Sahal","Shannon","Greg","Lucy","Jacob","Nishant","Malcolm","Sarah","Bianca","Jan","Elliot","Julian","Youjeen","Feston","Spencer","Emma","Jacob","Reed","Maksim","Madeleine","Andrew","Ei","Ray","Ben","James","Dakotah","Jake","Amara","Eldred","Isabella","Connor","Hannah","Kevin","Jonathan","Wanying","Zhaoran","Hannah","Jordan","Cary","Jazmine","Christina","Elliot","Ross","Theo","Luke","Juliette","Cary","Audrey","Kulu","Alicia","Marianna","Sarena","David","Avery","Wyatt","Rachel","Sophie","Mia","Molly","Kirsiah","Chelsea","Heather","Matthew","Jade","Matthew","David","Sophie","Kendra","Drew","Meghan","Aung","Meredith","Elise","Jenifer","Cassandra","Kayleigh","Chazlee","Jaeeun","Kai","Mika","Vinzie","Evan","Huw","Jake","Michael","Isabel","Jeheli","Bradley","Max","Serina","Alana","Benjamin","Sam","Bryce","Grant","Megan","Ashley","Lucy","Neil","Queen-Ama","Georges","Vijay","Alexander","Naomi","Konrad","Ingrid","Solomon","Taylor","Jaeme","Brianna","Phil","Simon","Anna","Dante","Joelle","Cameron","Maria","Mallie","Philip","Diego","Dominica","Camille","Vasu","Soﬁa","Payal","Katharine","Laurens","AJ","Virginia","Seth","Maya","Grace","Abi","Kahlia","Nathan","Emma","Andre","Daniel","Thomas","Andrea","Johanna","Sam","Hayden","Patricia","Linsen","Irene","Michael","Melissa","Daneil","Leandra","Nate","Ihor","Simon","Mercy","Sebastian","Elle","Ian","Cori","Ali","Luke","Moses","Chelsea","Koshu","Bazl","Danya","Tara","Uzoamaka","Nichol","Zev","Samantha","Yuxing","George","Sierra","Pearl","Aaron","Jared","Naida","Erin","Kiyomi","Jonathan","Samantha","Amy","June","Nancy","Samantha","Sophie","Minji","Gavin","James","Maisha","Spencer","Mengtian","Alwaleed","Amber","Molly","Sally","Gabe","Dawson","Andy","Julian",]
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

var customNames = ["Aaron","David","Edan","Garrett","Harrison","Jeremy",
"Jody","Josh","Matt","Max"]
var picNameLookup = []
for (var i = 0; i < names.length; i++){
     picNameLookup.push(""+i);
 }
 for (var i = 0; i < customNames.length; i++){
     picNameLookup.push(customNames[i]);
     names.push(customNames[i])
 }
 console.log(picNameLookup);
console.log("length of sprites == length of deathmessages")
console.log(numberOfSprites == deathmessages.length)

var focused = true;
$(window).blur(function() {
    focused = false;
    if(!win){
    document.getElementById('soundEfx').pause()
    Game.enemies = []
    maxEnemy=0;
    document.getElementById('soundEfx').currentTime = 0;
    }
});

$(window).focus(function() {
    
    focused= true;
    if(!win){
    Game.enemies = []
    maxEnemy=0;
    document.getElementById('soundEfx').currentTime = 0;
    document.getElementById('soundEfx').play();
}
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
    Game.context.fillText("You win! Also I fixed the glitches now, so it's legit. Tell Kevin.", Game.width/2, Game.height/2);
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

function shareLastDeath() {
  if(lastScore > 0)
  {
    FB.ui(
      {
       method: 'feed',
       caption: 'I lasted ' + lastScore + ' seconds in Survive SRC!',
       name: deathPost,
       description: (
          'Can you survive the onslaught of SRC students?'
       ),
       link: thisURL,
       picture: sharePic,
      },
      function(response) {
        if (response && response.post_id) {
          alert('Post was published.');
        } else {
          alert('Post was not published.');
        }
      }
    );
  }
}

Game.update = function() {
    score += 1;
  for (var i = 0; i < Game.enemies.length; i++) {
    Game.enemies[i].update()
    if (hitPlayer(Game.enemies[i])){ // ------ DEAD HERE -------------
      lastScore = document.getElementById('soundEfx').currentTime;
      if(lastScore > hiScore)
        hiScore = lastScore;
      console.log(hiScore);
        console.log("HIT!!");
        hit = true;
        died = true;
        action = Math.floor(Math.random()*actions.length);
        deadpic.src = "./pictures/" +picNameLookup[Game.enemies[i].randPic]+".jpg";
        sharePic.src = "http://www.kevinleutzinger.com/surviveSRC/pictures/"+picNameLookup[Game.enemies[i].randPic]+".jpg";
        //http://www.kevinleutzinger.com/surviveSRC/pictures/Edan.jpg
        bigmessage = names[Game.enemies[i].randPic] +" "+actions[action]+" you.";
        lastDeathMessage = bigmessage;
        if(names[Game.enemies[i].randPic] == "Kevin"){bigmessage = "Kevin made this game"};
        deathPost = names[Game.enemies[i].randPic] +" "+actions[action]+" me.";
        deathPic = deadpic.src;
      Game.enemies = []
      maxEnemy = 0;
      //Game.context.fillStyle = "purple";
      document.getElementById('soundEfx').currentTime = 0;
      Game.context.clearRect(0, 0, Game.width, Game.height);
    }
  }
  Game.enemies = Game.enemies.filter(isBigEnough);
 // if(lastFilter > 30){
  //Game.enemies = Game.enemies.filter(isBigEnough);
  //lastFilter =  0;
//};
  rotMode = document.getElementById("ROT_checkbox").checked
  
  cTime = soundEfx.currentTime;
  if(cTime >= 155) win = true;
  if(cTime > 5){
      bigmessage = "";
      deadpic.src = "./pictures/nothing.png";
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
  this.rot = 0;
}

Player.prototype.draw = function(context) {

  if(hit) Game.context.fillStyle = 'black';
  else Game.context.fillStyle = 'rgb(255,'+playerG+',0)';
  hit = false;
  if(rotMode){
  context.save()  
  this.rot+=.1;
  context.translate(this.x, this.y)
  context.translate(this.width/2, this.height/2)
  context.rotate(this.rot);
  context.fillRect(-this.width/2, -this.height/2, this.height, this.width);

  context.restore()}
  else{
        context.fillRect(this.x, this.y, this.height, this.width);
  }
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
  this.img.src = "./pictures/" +picNameLookup[this.randPic]+".jpg";

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
  this.rot = 0;
  this.rotDiff  = ((Math.random() * 4 ) - 2) /10;
};

Enemy.prototype.draw = function(context) {
  Game.context.fillStyle = 'red';
  
  if(rotMode){
  context.save()
  
  
  this.rot+=this.rotDiff;
  context.translate(this.x, this.y)
  context.translate(this.width/2, this.height/2)
  context.rotate(this.rot);
  context.drawImage(this.img, -this.width/2,-this.height/2, this.width, this.height);
  context.restore()
}
else{
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
    
};


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




function saveImage(){
    var c=Game.canvas
    var d=c.toDataURL("image/png");
    var w=window.open('about:blank','image from canvas');
    w.document.write("<body bgcolor=#D2D2D2> <img src='"+d+"' alt='from canvas'/><br> Save by dragging image or with ctrl+s / cmd+s");
};

