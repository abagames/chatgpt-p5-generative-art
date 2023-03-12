export const sketch = function (p) {
  let x = 0;
  let y = 0;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.noStroke();
    p.rectMode(p.CENTER);
  };

  p.draw = function () {
    p.background(255);
    p.fill(0);

    // create a turbulent background using Perlin noise
    for (let i = 0; i < p.width; i++) {
      let n = p.noise(i * 0.01, p.frameCount * 0.01);
      let h = p.map(n, 0, 1, 0, p.height);
      p.rect(i, h, 1, p.height - h);
    }

    // create simple shapes that move in response to the noise
    for (let i = 0; i < 5; i++) {
      let n = p.noise(p.frameCount * 0.01 + i * 1000);
      let x = p.map(n, 0, 1, 0, p.width);
      let y = p.map(n, 0, 1, 0, p.height);
      let s = p.map(n, 0, 1, 5, 30);

      p.push();
      p.translate(x, y);
      p.rotate(p.frameCount * 0.01);
      p.rect(0, 0, s, s);
      p.pop();
    }
  };
};
