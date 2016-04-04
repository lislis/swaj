
var SWAJ = function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var w = 700;
  var h = 400;
  var globalTime = 0;
  var timer = 0;
  var otime = Date.now();
  var dtime = 0;
  var ntime = 0;
  var bg = new Image();
  bg.src = 'assets/bg.png';

  var score = 10;
  var scoreBoard = document.getElementById('score');
  scoreBoard.innerHTML = score;

  var gameState = 'play';

  var angle = 1;

  var shark = {
    w: 90,
    h: 109,
    x: 0,
    img: '',
    img1: new Image(),
    img2: new Image(),
    img3: new Image()
  };
  shark.img1.src = 'assets/shark1.png';
  shark.img2.src = 'assets/shark2.png';
  shark.img3.src = 'assets/shark3.png';
  shark.img = shark.img1;

  var bhouse = {
    w: 130,
    h: 80,
    x: 0,
    y: 40,
    s: 1,
    counter: 0,
    img: '',
    img1: new Image(),
    img2: new Image(),
    img3: new Image()
  }
  bhouse.img1.src = 'assets/bhouse1.png';
  bhouse.img2.src = 'assets/bhouse2.png';
  bhouse.img3.src = 'assets/bhouse3.png';
  bhouse.img = bhouse.img1;

  var human = {
    x: 0,
    y: 0,
    w: 16,
    h: 28,
    v: 2,
    isFlying: false,
    lock: false,
    img: '',
    img1: new Image(),
    img2: new Image()
  }
  human.img1.src = 'assets/human1.png';
  human.img2.src = 'assets/human2.png';
  human.img = human.img1;

  canvas.width = w;
  canvas.height = h;

  var toRadians = Math.PI/180;

  var draw = function() {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(shark.img, shark.x, h - shark.h, shark.w, shark.h);
    ctx.drawImage(bhouse.img, bhouse.x, bhouse.y, bhouse.w, bhouse.h);
    if (human.y > 70) {
      ctx.drawImage(human.img, human.x, h -Math.floor(human.y), human.w, human.h);
    }
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
        resetHuman();
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

  var resetHuman = function() {
    human.isFlying = false;
    human.y = 0;
    human.x = shark.x;
    human.img = human['img' + (Math.floor(Math.random() * 2) + 1)];
  }

  var updateBHouse = function() {
    if (bhouse.x > w - bhouse.w || bhouse.x < 0) {
      bhouse.s = bhouse.s * -1
    }
    if (score <= 2) {
      bhouse.img = bhouse.img3;
    } else if (score <= 6) {
      bhouse.img = bhouse.img2;
    }
    bhouse.x = bhouse.x + bhouse.s
  }

  var updateTime = function() {
    ntime = Date.now();
    dtime = ntime - otime;
    globalTime = globalTime + dtime;
    otime = ntime;
  }

  var updateCollision = function() {

    if (human.y > (h - (bhouse.y +  bhouse.h))) {
      if (human.x > bhouse.x && human.x < bhouse.x + bhouse.w) {
        resetHuman();
        score = score -1;
        scoreBoard.innerHTML = score;
        if (score <= 0) {
          gameState = 'party';
        }
      }
    }
  }

  var updateShark = function() {
    if (human.isFlying) {
      if (human.y <= 70) {
        shark.img = shark.img2;
      } else if (human.y > 70 && human.y <= 120) {
        shark.img = shark.img3;
      } else {
        shark.img = shark.img1;
      }
    } else {
      shark.img = shark.img1;
    }
  }

  var update = function() {

    if (gameState === 'play') {
      updateTime();
      updateShark();
      updateHuman();
      updateBHouse();
      updateCollision();
    }
    if (gameState === 'party') {
      document.querySelector('.game').classList.remove('is-visible');
      document.querySelector('.done').classList.add('is-visible');
    }
  }

  var loop = function() {
    update();
    draw();
    window.requestAnimationFrame(loop);
  }

  var raf = window.requestAnimationFrame(loop);

  if (isMIDI === false) {
    window.addEventListener('keypress', function(ev) {
      switch(String.fromCharCode(ev.which)) {
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
  } else {

    window.addEventListener('keyboard', function(ev) {

      switch(ev.detail) {
        case 53:
          shark.x = (w/7) * 0;
          break;
        case 55:
          shark.x = (w/7) * 1;
          break;
        case 57:
          shark.x = (w/7) * 2;
          break;
        case 59:
          shark.x = (w/7) * 3;
          break;
        case 60:
          shark.x = (w/7) * 4;
          break;
        case 62:
          shark.x = (w/7) * 5;
          break;
        case 64:
          shark.x = (w/7) * 6;
          break;
      }
    });
  }
}

var isMIDI = false;
var keyboard, data;
var keyboardEvent;

document.getElementById('start').addEventListener('click', function() {
  document.querySelector('.intro').classList.remove('is-visible');

  if (navigator.requestMIDIAccess) {
    isMIDI = true;
    navigator.requestMIDIAccess().then(onMIDIInit, onMIDISystemError);
  } else {
    alert('Your broswer does not support WebMIDI. You can use the keyboard instead.');
  }
  document.querySelector('.game').classList.add('is-visible');
  SWAJ();
});

document.getElementById('restart').addEventListener('click', function() {
  window.location.reload();
});

var midiMessageReceived = function(ev) {

  data = ev.data;
  cmd = data[0];
  note = data[1];

  if (cmd === 144) {
    keyboardEvent = new CustomEvent('keyboard', {'detail': note});
    window.dispatchEvent(keyboardEvent);
  }
}

var onMIDIInit = function(midi) {
  for (var input of midi.inputs.values()) {
    if (input.name !== 'Midi Through Port-0') {
      alert(input.name + ' found! Ready to go!');
      keyboard = input;
      keyboard.onmidimessage = midiMessageReceived;
    }
  }
}

var onMIDISystemError = function(error) {
  console.log(error);
}
