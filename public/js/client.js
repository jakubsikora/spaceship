var canvas
  , ctx
  , ship
  , debris
  , keys
  , time;

function init() {
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

  debris.push(new Debris([0, 0]));
  debris.push(new Debris([canvas.width / 3, 0]));
  debris.push(new Debris([canvas.width / 1.5, 0]));
  debris.push(new Debris([canvas.width, 0]));

  debris.push(new Debris([0, canvas.height / 3]));
  debris.push(new Debris([canvas.width / 3, canvas.height / 3]));
  debris.push(new Debris([canvas.width / 1.5, canvas.height / 3]));
  debris.push(new Debris([canvas.width, canvas.height / 3]));

  debris.push(new Debris([0, canvas.height]));
  debris.push(new Debris([canvas.width / 3, canvas.height]));
  debris.push(new Debris([canvas.width / 1.5, canvas.height]));
  debris.push(new Debris([canvas.width, canvas.height]));

  // debris.push(new Debris([0, canvas.height / 2]));
  // debris.push(new Debris([canvas.width / 2, canvas.height / 2]));

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

  // Draw the ship
  ship.draw(ctx);

  for (var i = 0; i < debris.length; i++) {
    debris[i].draw(ctx);
  };

  document.getElementById('canvasHud').innerHTML = canvas.width + ', ' + canvas.height;
  // canvas.draw_image(debris_image,
  //   [center[0]-wtime, center[1]], // image center
  //   [size[0]-2*wtime, size[1]], // image size
  //   [width/2+1.25*wtime, height/2], // pos
  //   [width-2.5*wtime, height]) // image size ?
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