
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
  h: 120,
  x: 0
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
  x: 0,
  y: 0,
  w: 18,
  h: 30,
  v: 2,
  isFlying: false,
  lock: false
}

canvas.width = w;
canvas.height = h;

var toRadians = Math.PI/180;

var draw = function() {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeRect(shark.x, h - shark.h, shark.w, shark.h);
  ctx.fillRect(human.x, h -Math.floor(human.y), human.w, human.h);
  ctx.strokeRect(bhouse.x, bhouse.y, bhouse.w, bhouse.h);
}

var updateHuman = function() {
  if (human.isFlying === true) {

    human.y = human.y + human.v;

    if (human.y > shark.h) {
      human.lock = true;
    }

    if (human.lock === false) {
      human.x = shark.x + shark.w / 2 - human.w / 2;
    }

    if (human.y > h) {
      human.isFlying = false;
      human.y = 0;
      human.x = shark.x;
    }
  } else {
    calcHumanInterval();
  }
}

var calcHumanInterval = function() {
  var interval = 1000;

  var hop = globalTime % interval;
  if (globalTime > 1000) {
    if (hop <= 100) {
      human.isFlying = true;
      human.lock = false;
    }
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

var updateCollision = function() {
  
  document.getElementById('human').innerHTML = human.x + " " + Math.floor(human.y);
  document.getElementById('beach').innerHTML = bhouse.x + " " + bhouse.y;

  if (human.y + h < 120) { // y + h
    console.log('crossed the line');
  }
}

var update = function() {
  updateTime();
  updateHuman();
  updateBHouse();
  updateCollision();
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
      shark.x = (w/7) * 0;
      break;
    case 'f':
      shark.x = (w/7) * 1;
      break;
    case 'g':
      shark.x = (w/7) * 2;
      break;
    case 'h':
      shark.x = (w/7) * 3;
      break;
    case 'j':
      shark.x = (w/7) * 4;
      break;
    case 'k':
      shark.x = (w/7) * 5;
      break;
    case 'l':
      shark.x = (w/7) * 6;
      break;
  }
});




