
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = 700;
var h = 500;
var globalTime = 0;
var timer = 0;
var otime = Date.now();
var dtime = 0;
var ntime = 0;


var angle = 1;

var shark = {
  w: 90,
  h: 120
};

var bhouse = {
  w: 180,
  h: 80,
  x: 0,
  y: 40,
  s: 1,
  counter: 0
}

var human = {
  x: -9,
  y: -30,
  w: 18,
  h: 30,
  v: 0.0003,
  a: angle,
  startTime: 0,
  isFlying: false
}

canvas.width = w;
canvas.height = h;

var toRadians = Math.PI/180;

var draw = function() {
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w/2, h);
  ctx.rotate(angle * toRadians);
  ctx.strokeRect(-shark.w / 2, - shark.h, shark.w, shark.h);

  ctx.fillRect( Math.floor(human.x), Math.floor(human.y), human.w, human.h);

  ctx.restore();
  // drawRotation(w - 45, h - 120, 90, 120, angle);

  ctx.strokeRect(bhouse.x, bhouse.y, bhouse.w, bhouse.h);
}

var updateHuman = function() {
  if (human.isFlying === true) {
    // human.x = human.x + human.v * (globalTime - human.startTime) * Math.cos((angle +90) * toRadians);
    human.y = human.y - human.v * (globalTime - human.startTime) * Math.sin((angle +90)  * toRadians);
    if (human.y < -h) {
      human.isFlying = false;
      human.y = -30;
    }
  } else {
    calcHumanInterval();
  }
}

var calcHumanInterval = function() {
  var interval = 2000;

  var hop = globalTime % interval;
  if (hop <= 50) {
    human.isFlying = true;
  }
}


var updateBHouse = function() {
  if (bhouse.x > w - bhouse.w || bhouse.x < 0) {
    bhouse.s = bhouse.s * -1
  }
  bhouse.x = bhouse.x + bhouse.s
}


var updateTime = function() {
  ntime = Date.now();
  dtime = ntime - otime;
  globalTime = globalTime + dtime;
  otime = ntime;

  document.getElementById('time').innerHTML = globalTime;
}

var update = function() {
  if (human.startTime !== null) {
    updateHuman();
  }
  updateTime();
  updateBHouse();
}

var loop = function() {
  update();
  draw();
  window.requestAnimationFrame(loop);
}

var raf = window.requestAnimationFrame(loop);


window.addEventListener('keypress', function(ev) {

  switch(ev.key) {
    case 'd':
      angle = -40;
      break;
    case 'f':
      angle = -20;
      break;
    case 'g':
      angle = -5;
      break;
    case 'h':
      angle = 0;
      break;
    case 'j':
      angle = 5;
      break;
    case 'k':
      angle = 20;
      break;
    case 'l':
      angle = 40;
      break;
  }
});




