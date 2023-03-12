let t = 0;
let maxT = 1000;

function setup() {
  createCanvas(400, 200);
  noFill();
  strokeWeight(2);
  stroke(255, 255, 255, 50);
}

function draw() {
  background(0);
  for (let i = 0; i < 20; i++) {
    let x = map(i, 0, 20, 50, width - 50);
    let y = height / 2 + 30 * sin(x / 20 + t / 20);
    let d = 20 * noise(i / 5, t / 100);
    let angle = 2 * PI * noise(i / 5 + 1000, t / 1000);
    let cx = x + d * cos(angle);
    let cy = y + d * sin(angle);
    let r = 40 * noise(i / 5 + 2000, t / 500);
    let n = 10 + 20 * noise(i / 5 + 3000, t / 300);
    drawThunder(cx, cy, r, n);
  }
  t += 1;
  if (t > maxT) {
    t = 0;
  }
}

function drawThunder(x, y, r, n) {
  push();
  translate(x, y);
  rotate(radians(45));
  beginShape();
  for (let i = 0; i < n; i++) {
    let angle = map(i, 0, n, 0, 360);
    let d = r + 20 * noise(i / 10, t / 200);
    let x = d * cos(angle);
    let y = d * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}
