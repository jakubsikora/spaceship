function Missile(startPos, startVel, startAngle) {
  var pos = startPos
    , age = 0
    , vel = startVel
    , angle = startAngle
    , angleVel = 0
    , lifespan = 100
    , IMAGE_SRC = 'img/shot_laser.png'
    , IMAGE_SIZE = [20, 3]
    , cx
    , cy;

  var draw = function(ctx) {
    cx = pos[0] + (0.5 * IMAGE_SIZE[0]);
    cy = pos[1] + (0.5 * IMAGE_SIZE[1]);

    var missileImage = new Image();
    missileImage.src = IMAGE_SRC;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.drawImage(missileImage, 0, 0);

    ctx.restore();
  };

  var update = function() {
    age += 1;

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

    angle += angleVel;
    pos[0] += vel[0];
    pos[1] += vel[1];

    if (age > lifespan) {
      return false;
    } else {
      return true;
    }
  };

  return {
    draw: draw,
    update: update
  }
}