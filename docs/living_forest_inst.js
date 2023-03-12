export const sketch = function (p) {
  // Set up the canvas
  p.setup = function () {
    p.createCanvas(400, 200);
    p.noStroke();
  };

  // Define the color palette
  const colors = [
    [244, 67, 54],
    [33, 150, 243],
    [255, 235, 59],
    [76, 175, 80],
    [156, 39, 176],
  ];

  // Define the animation variables
  let time = 0;
  let timeStep = 0.005;
  let noiseScale = 0.005;
  let xStart = 0;
  let yStart = 0;
  let stepSize = 10;

  // Draw the animation
  p.draw = function () {
    p.background(0);

    for (let x = 0; x < p.width; x += stepSize) {
      for (let y = 0; y < p.height; y += stepSize) {
        let noiseVal = p.noise(
          xStart + x * noiseScale,
          yStart + y * noiseScale,
          time
        );
        let colorIndex = Math.floor(noiseVal * colors.length);
        p.fill(colors[colorIndex]);
        p.rect(x, y, stepSize, stepSize);
      }
    }

    time += timeStep;
  };
};
