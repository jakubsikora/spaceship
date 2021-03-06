function Ship(startPos, startVel) {
  var pos = startPos
    , vel = startVel
    , forward = [0, 0]
    , thrust = false
    , angle = 0
    , angleVel = 0
    , MISSILE_SPEED_FACTOR = 5
    , IMAGE_SIZE = [0, 0];

  var setThrust = function(newThrust) {
    thrust = newThrust;
  };

  var getThrust = function() {
    return thrust;
  };

  var getAngleVel = function() {
    return angleVel;
  };

  var setAngleVel = function(newAngleVel) {
    angleVel = newAngleVel;
  };

  var update = function() {
    // Friction udpate
    vel[0] *= (1 - FRICTION_FACTOR);
    vel[1] *= (1 - FRICTION_FACTOR);

    angle += angleVel;
    forward = angleToVector(angle);

    if (thrust) {
      vel[0] += forward[0] * SHIP_SPEED;
      vel[1] += forward[1] * SHIP_SPEED;
    }

    pos[0] += vel[0];
    pos[1] += vel[1];

    // Check canvas borders
    if (pos[0] > canvas.width) {
      pos[0] = pos[0] % canvas.width;
    } else if (pos[0] < 0) {
      pos[0] = canvas.width + (pos[0] % canvas.width);
    }

    if (pos[1] > canvas.height) {
      pos[1] = pos[1] % canvas.height;
    } else if (pos[1] < 0) {
      pos[1] = canvas.height + (pos[1] % canvas.height);
    }
  };

  var draw = function() {
    var shipImage;

    // Log
    log();

    shipImage = new Image();
    shipImage.onload = function() {
      IMAGE_SIZE = [shipImage.width / 2, shipImage.height];
    };

    shipImage.src = IMAGE_SRC;

    drawSprite(shipImage, pos[0], pos[1], angle, thrust)
  };

  var drawSprite = function(imageObject, x, y, rotation, thrust) {
      var cx = pos[0] + (0.5 * IMAGE_SIZE[0])
        , cy = pos[1] + (0.5 * IMAGE_SIZE[1]);

      // save state
      ctx.save();
      // set screen position
      ctx.translate(cx, cy);
      // set rotation
      ctx.rotate(rotation);
      // draw image to screen drawImage(
      //  imageObject, sourceX, sourceY, sourceWidth, sourceHeight,
      // destinationX, destinationY, destinationWidth, destinationHeight)
      ctx.drawImage(
        imageObject,
        (thrust ? IMAGE_SIZE[0] : 0),
        0,
        IMAGE_SIZE[0],
        IMAGE_SIZE[1],
        -IMAGE_SIZE[0]/2,
        -IMAGE_SIZE[1]/2,
        IMAGE_SIZE[0],
        IMAGE_SIZE[1]);

      // restore state
      ctx.restore();
  };

  var shoot = function() {
    var missile = new Missile(
      [pos[0] + IMAGE_SIZE[0] / 2,
      pos[1] + IMAGE_SIZE[1] / 2],
      [vel[0] + forward[0] * MISSILE_SPEED_FACTOR,
      vel[1] + forward[1] * MISSILE_SPEED_FACTOR],
      angle
    );
    missileGroup.push(missile);
  };

  var log = function() {
    document.getElementById('shipPos').innerHTML =
      parseInt(pos[0], 10) + ', ' + parseInt(pos[1], 10);
    document.getElementById('shipVel').innerHTML =
      parseFloat(vel[0]).toFixed(2) + ', ' + parseFloat(vel[1]).toFixed(2);
    document.getElementById('shipForward').innerHTML =
      parseFloat(forward[0]).toFixed(2) + ', ' + parseFloat(forward[1]).toFixed(2);
    document.getElementById('shipThrust').innerHTML = (thrust ? 'on' : 'off');
    document.getElementById('shipAngle').innerHTML = parseFloat(angle).toFixed(2);
    document.getElementById('shipAngleVel').innerHTML = angleVel;
  };

  var angleToVector = function(newAngle) {
    return [Math.cos(newAngle), Math.sin(newAngle)];
  };

  return {
    update: update,
    draw: draw,
    setThrust: setThrust,
    getThrust: getThrust,
    getAngleVel: getAngleVel,
    setAngleVel: setAngleVel,
    shoot: shoot,
    SHIP_TURN_ANGLE: SHIP_TURN_ANGLE
  }
}