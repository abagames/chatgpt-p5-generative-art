let t = 0;

function setup() {
  createCanvas(400, 200);
  background(0);
  noStroke();
}

function draw() {
  fill(0, 5);
  rect(0, 0, width, height);

  let xoff = 0;

  for (let i = 0; i < 50; i++) {
    let x = map(i, 0, 49, 0, width);
    let y = map(noise(xoff, t), 0, 1, 0, height);

    let r = map(y, 0, height, 1, 3);
    let alpha = map(y, 0, height, 0, 255);

    fill(255, alpha);
    ellipse(x, y, r, r);

    xoff += 0.1;
  }

  t += 0.01;
}
