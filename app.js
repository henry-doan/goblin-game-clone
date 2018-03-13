var canvas = document.getElementById('canvas')
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};

bgImage.src = "imgs/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};

heroImage.src = "imgs/spaceman.png";


var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};

monsterImage.src = "imgs/smalldarkrai.png";

var monster2Ready = false;
var monster2Image = new Image();
monster2Image.onload = function () {
  monster2Ready = true;
};

monster2Image.src = "imgs/smalldarkrai.png";

var monster1Captured = false;
var monster2Captured = false; 

var hero = {
  speed: 400,
  x: 0,
  y: 0
}

var monster = {
  x: 0,
  y: 0
}

var monster2 = {
  x: 0,
  y: 0
}

var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);


var reset = function() {
  monster1Captured = false
  monster2Captured = false

  hero.x = 32 + (Math.random() * (canvas.width - 64))
  hero.y = 32 + (Math.random() * (canvas.width - 64))

  monster.x = 32 + (Math.random() * (canvas.width - 64))
  monster.y = 32 + (Math.random() * (canvas.width - 64))

  monster2.x = 32 + (Math.random() * (canvas.width - 64))
  monster2.y = 32 + (Math.random() * (canvas.width - 64))
}


var update = function(modifier) {
  if (hero.x + hero.width > canvas.width) {
    hero.x = canvas.width - hero.width;
  }

  if (hero.y + hero.height > canvas.height) {
    hero.y = canvas.height - hero.height;
  }
  // left
  if (hero.x < 0) {
    hero.x = 0;
  }

  // top
  if (hero.y < 0) {
    hero.y = 0;
  }
  
  // right
  if (hero.x > canvas.width - 30) {
    hero.x = (canvas.width  - 30);
  }
  
  // right
  if (hero.y > canvas.height - 30) {
    hero.y = (canvas.height - 30);
  }

  if(38 in keysDown) {
    hero.y -= hero.speed * modifier;
  }

  if(40 in keysDown) {
    hero.y += hero.speed * modifier;
  }

  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
  }

  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }

  if(monster1Captured == true && monster2Captured == true) {
    reset()
  }

  if(
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught
    monster1Captured = true
    monster.x = canvas.width + 64
  } else if (
    hero.x <= (monster2.x + 32)
    && monster2.x <= (hero.x + 32)
    && hero.y <= (monster2.y + 32)
    && monster2.y <= (hero.y + 32)
  ) {
    ++monstersCaught
    monster2Captured = true
    monster2.x = canvas.width + 64
  }
}


var render = function() {
  if(bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  if (monster2Ready) {
    ctx.drawImage(monster2Image, monster2.x, monster2.y);
  }

  ctx.fillStyle = "rgb(250, 250, 250)"
  ctx.font = "24px Helvetica"
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.fillText("Darkrais caught: " + monstersCaught, 32, 32)
}

var main = function() {
  var now = Date.now()
  var delta = now - then

  update(delta / 1000)
  render()

  then = now

  requestAnimationFrame(main)
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now()
reset();
main();