let t = 0;

function setup() {
  createCanvas(400, 200);
  noStroke();
}

function draw() {
  background(0);
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      const wave = sin(t + x * 0.05) + sin(t + y * 0.05);
      const r = map(sin(wave), -2, 2, 0, 255);
      const g = map(cos(wave), -2, 2, 0, 255);
      const b = map(sin(t + wave), -2, 2, 0, 255);
      fill(r, g, b);
      ellipse(x, y, 15, 15);
    }
  }
  t += 0.05;
}
