function Rock(startPos, startVel, startAngle, startAngleVel) {
  var pos = startPos
    , vel = startVel
    , angle = startAngle
    , angleVel = startAngleVel
    , IMAGE_SRC = 'img/asteroid.png'
    , IMAGE_SIZE = [90, 90];

  var draw = function(ctx) {
    cx = pos[0] + (0.5 * IMAGE_SIZE[0]);
    cy = pos[1] + (0.5 * IMAGE_SIZE[1]);

    var rockImage = new Image();
    rockImage.src = IMAGE_SRC;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.drawImage(rockImage, 0, 0);

    ctx.restore();
  }

  var update = function() {
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
  }

  return {
    draw: draw,
    update: update
  }
}