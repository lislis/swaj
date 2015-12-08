// decide on position of shark
// calc projectile trajectory
// -> from center of shark
// indicate that somehow
// AI for beach bar
// timer


// assets
// Starting Screen / Menu
// Shark 
//    normal
//    spitting
// Beach Bar
//    empty
//    1/4, 1/2, 3/4 and full
// Humans
// Ending Screen


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = 700;
var h = 500;
var globalTime = 0;
var timer = 0;
var otime = 0;
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

canvas.width = w;
canvas.height = h;

var toRadians = Math.PI/180;

// var drawRotation = function(x, y, w, h, angle) {
//   ctx.save();
//   // ctx.rotate(angle * toRadians);
//   ctx.translate(w/2, -h * 2);
//   ctx.fillRect(x + 45, y, w, h);
//   ctx.restore();
// }

var draw = function() {
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w/2, h);
  ctx.rotate(angle * toRadians);
  ctx.fillRect(-shark.w / 2, - shark.h, shark.w, shark.h);
  ctx.restore();
  // drawRotation(w - 45, h - 120, 90, 120, angle);

  ctx.strokeRect(bhouse.x, bhouse.y, bhouse.w, bhouse.h);
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
  globalTime += ntime - otime;
  otime = ntime;

  document.getElementById('time').innerHTML = globalTime;
}

var update = function() {
  updateTime();
  updateBHouse();
}

var loop = function() {
  update();
  draw();
  window.requestAnimationFrame(loop);
}

var raf = window.requestAnimationFrame(loop);
