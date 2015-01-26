var canvas
  , ctx
  , ship
  , debris
  , keys
  , time
  , DEBRIS_SIZE = [640, 480]
  , FRICTION_FACTOR = 0.02
  , SHIP_SPEED = 0.15
  , SHIP_TURN_ANGLE = 0.07
  , SHIP_SIZE = [90,90];


function init() {
  var numberDebris;

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  // Maximise the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var startX = (canvas.width / 2)
    , startY = (canvas.height / 2)
    , startPos = [startX, startY]
    , startVel = [0, 0];

  ship = new Ship(startPos, startVel);

  debris = [];

  numberDebris = ((canvas.width + DEBRIS_SIZE[0]) / DEBRIS_SIZE[0]);

  for (var i = 0; i < numberDebris; i++) {
    debris.push(new Debris(
      [i * DEBRIS_SIZE[0], 0]));

    debris.push(new Debris(
      [i * DEBRIS_SIZE[0], DEBRIS_SIZE[1]]));
  }

  // Start listening for events
  setEventHandlers();

  time = 0;
}

function animate() {
  update();
  draw();

  // Request a new animation frame using Paul Irish's shim
  window.requestAnimFrame(animate);
}

function update() {
  ship.update();

  for (var i = 0; i < debris.length; i++) {
    debris[i].update(
      ship.getThrust(),
      ship.getAngleVel()
    );
  };
}

function draw() {
  time += 1;

  // Wipe the canvas clean
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (var i = 0; i < debris.length; i++) {
    debris[i].draw(ctx);
  };

  // Draw the ship
  ship.draw(ctx);

  document.getElementById('canvasHud').innerHTML = canvas.width + ', ' + canvas.height;
}

function setEventHandlers() {
  // Keyboard
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
}

function onKeydown(e) {
  var c = e.keyCode
    , angleVel = ship.getAngleVel();

  switch (c) {
    // Controls
    case 38: // Up
      ship.setThrust(true);
      break;
    case 40: // Down
      ship.setThrust(false);
      break;
    case 37: // Left
      angleVel = -ship.SHIP_TURN_ANGLE;
      ship.setAngleVel(angleVel);
      break;
    case 39: // Right
      angleVel = ship.SHIP_TURN_ANGLE;
      ship.setAngleVel(angleVel);
      break;
  };
}

function onKeyup(e) {
  var c = e.keyCode;

  switch (c) {
    // Controls
    case 38: // Up
      ship.setThrust(false);
      break;
    case 40: // Down
      ship.setThrust(false);
      break;
    case 37: // Left
      ship.setAngleVel(0);
      break;
    case 39: // Right
      ship.setAngleVel(0);
      break;
  };
}