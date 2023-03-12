let t = 0;

function setup() {
  createCanvas(400, 200);
  noStroke();
}

function draw() {
  background(255);
  fill(255, 0, 0);
  drawDigDug(width * 0.25, height * 0.5, 20 + 50 * noise(t + 1));
  fill(0, 255, 0);
  drawDigDug(width * 0.5, height * 0.5, 20 + 50 * noise(t + 2));
  fill(0, 0, 255);
  drawDigDug(width * 0.75, height * 0.5, 20 + 50 * noise(t + 3));
  t += 0.02;
}

function drawDigDug(x, y, size) {
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let radius = size + size * noise(cos(angle * 5), sin(angle * 5), t);
    let px = x + radius * cos(angle);
    let py = y + radius * sin(angle);
    vertex(px, py);
  }
  endShape(CLOSE);
}
