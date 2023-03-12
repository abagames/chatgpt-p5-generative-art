let angle = 0;

function setup() {
  createCanvas(400, 200);
  strokeWeight(2);
  frameRate(30);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  rotate(angle);

  // Create a hexagon with a noise-based stroke weight
  let hexagonSize = 50;
  let noiseValue = noise(frameCount / 20);
  strokeWeight(map(noiseValue, 0, 1, 1, 5));
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI * i) / 6;
    let x = hexagonSize * cos(angle);
    let y = hexagonSize * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Create smaller hexagons within the main hexagon
  let numHexagons = 6;
  for (let i = 0; i < numHexagons; i++) {
    let hexagonAngle = (TWO_PI * i) / numHexagons;
    let hexagonX = hexagonSize * cos(hexagonAngle);
    let hexagonY = hexagonSize * sin(hexagonAngle);

    push();
    translate(hexagonX, hexagonY);
    rotate(angle);
    strokeWeight(2);
    beginShape();
    for (let j = 0; j < 6; j++) {
      let angle = (TWO_PI * j) / 6;
      let x = (hexagonSize / 2) * cos(angle);
      let y = (hexagonSize / 2) * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  angle += 0.05;
}
