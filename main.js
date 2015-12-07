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

var angle = 1;

canvas.width = w;
canvas.height = h;

var toRadians = Math.PI/180;

var drawRotation = function(x, y, w, h, angle) {

  ctx.save();
  // ctx.rotate(angle * toRadians);
  ctx.translate(w/2, -h * 2);
  ctx.fillRect(x + 45, y, w, h);
  ctx.restore();
}

var draw = function() {
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.translate(-w/2, -h/2);
  ctx.rotate(angle * toRadians);
  ctx.fillRect(w - 45, h - 120, 90, 120);
  ctx.restore();
  // drawRotation(w - 45, h - 120, 90, 120, angle);
}

var loop = function() {
  console.log('hey there');

  draw();
  window.requestAnimationFrame(loop);
}

var raf = window.requestAnimationFrame(loop);
