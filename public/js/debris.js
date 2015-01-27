function Debris(startPos, startSpeedFactor, startScale) {
  var pos = startPos
    , vel = [0, 0]
    , forward = [0, 0]
    , angle = 0
    , thrust = false
    , angleVel = 0
    , IMAGE_SRC = 'img/debris2.png'
    , speedFactor = startSpeedFactor || 1
    , scale = startScale || 1;


  var setPos = function(newPos) {
    pos = newPos;
  };

  var update = function(thrust, angleVel) {
    vel[0] *= (1 - FRICTION_FACTOR);
    vel[1] *= (1 - FRICTION_FACTOR);

    angle += angleVel;
    forward = angleToVector(angle);

    if (thrust) {
      vel[0] += forward[0] * SHIP_SPEED * speedFactor;
      vel[1] += forward[1] * SHIP_SPEED * speedFactor;
    }

    pos[0] -= vel[0];
    pos[1] -= vel[1];

    // Check canvas borders
    if (-pos[0] > DEBRIS_SIZE[0]) {
      pos[0] = canvas.width;
    } else if (pos[0] > canvas.width) {
      pos[0] = 0 - DEBRIS_SIZE[0];
    }

    if (pos[1] > canvas.height) {
      pos[1] = 0 - DEBRIS_SIZE[1];
    } else if(-pos[1] > DEBRIS_SIZE[1]) {
      pos[1] = canvas.height;
    }
  };

  var draw = function(ctx) {
    var debrisImage = new Image();
    debrisImage.src = IMAGE_SRC;

    ctx.save();
    ctx.scale(scale[0], scale[1]);
    ctx.drawImage(debrisImage, pos[0], pos[1]);
    ctx.restore();
  };

  var angleToVector = function(newAngle) {
    return [Math.cos(newAngle), Math.sin(newAngle)];
  };

  return {
    draw: draw,
    update: update,
    setPos: setPos,
    DEBRIS_SIZE: DEBRIS_SIZE
  }
}