export const sketch = function (p) {
  let angle = 0;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.strokeWeight(2);
    p.frameRate(30);
  };

  p.draw = function () {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(angle);

    // Create a hexagon with a noise-based stroke weight
    let hexagonSize = 50;
    let noiseValue = p.noise(p.frameCount / 20);
    p.strokeWeight(p.map(noiseValue, 0, 1, 1, 5));
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (p.TWO_PI * i) / 6;
      let x = hexagonSize * p.cos(angle);
      let y = hexagonSize * p.sin(angle);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

    // Create smaller hexagons within the main hexagon
    let numHexagons = 6;
    for (let i = 0; i < numHexagons; i++) {
      let hexagonAngle = (p.TWO_PI * i) / numHexagons;
      let hexagonX = hexagonSize * p.cos(hexagonAngle);
      let hexagonY = hexagonSize * p.sin(hexagonAngle);

      p.push();
      p.translate(hexagonX, hexagonY);
      p.rotate(angle);
      p.strokeWeight(2);
      p.beginShape();
      for (let j = 0; j < 6; j++) {
        let angle = (p.TWO_PI * j) / 6;
        let x = (hexagonSize / 2) * p.cos(angle);
        let y = (hexagonSize / 2) * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }

    angle += 0.05;
  };
};
