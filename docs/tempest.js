let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 200);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(255);
  fill(0);

  // create a turbulent background using Perlin noise
  for (let i = 0; i < width; i++) {
    let n = noise(i * 0.01, frameCount * 0.01);
    let h = map(n, 0, 1, 0, height);
    rect(i, h, 1, height - h);
  }

  // create simple shapes that move in response to the noise
  for (let i = 0; i < 5; i++) {
    let n = noise(frameCount * 0.01 + i * 1000);
    let x = map(n, 0, 1, 0, width);
    let y = map(n, 0, 1, 0, height);
    let s = map(n, 0, 1, 5, 30);

    push();
    translate(x, y);
    rotate(frameCount * 0.01);
    rect(0, 0, s, s);
    pop();
  }
}
