let t = 0;
let scale = 40;

function setup() {
  createCanvas(400, 200);
  noStroke();
  fill(0, 255, 0);
}

function draw() {
  background(0);

  for (let x = 0; x < width; x += scale) {
    for (let y = 0; y < height; y += scale) {
      let mx = mouseX / width;
      let my = mouseY / height;

      let angle = noise(x / 100, y / 100, t) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);

      let cx = x + (v.x * scale) / 2;
      let cy = y + (v.y * scale) / 2;

      let size = noise(cx / 100, cy / 100, t) * scale * 2;
      ellipse(cx, cy, size, size);

      let distToCenter = dist(cx, cy, width / 2, height / 2);
      let maxDist = sqrt(sq(width / 2) + sq(height / 2));
      let shade = 255 * ((maxDist - distToCenter) / maxDist);
      fill(0, shade, 255);
    }
  }

  t += 0.01;
}
