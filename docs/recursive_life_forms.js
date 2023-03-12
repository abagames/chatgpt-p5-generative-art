let t = 0;

function setup() {
  createCanvas(400, 200);
  noStroke();
}

function draw() {
  background(255);
  fill(0, 10);
  translate(width / 2, height / 2);
  recursiveLifeForm(50, 0);
  t += 0.01;
}

function recursiveLifeForm(size, level) {
  const angle = noise(t + level * 0.5) * TWO_PI * level;
  const x = cos(angle) * size;
  const y = sin(angle) * size;

  ellipse(x, y, size * 2, size * 2);

  if (size > 2) {
    recursiveLifeForm(size * 0.7, level + 1);
    push();
    translate(x, y);
    rotate(angle);
    recursiveLifeForm(size * 0.7, level + 1);
    pop();
  }
}
