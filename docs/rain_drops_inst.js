export const sketch = function (p) {
  let t = 0;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.background(0);
    p.noStroke();
  };

  p.draw = function () {
    p.fill(0, 5);
    p.rect(0, 0, p.width, p.height);

    let xoff = 0;

    for (let i = 0; i < 50; i++) {
      let x = p.map(i, 0, 49, 0, p.width);
      let y = p.map(p.noise(xoff, t), 0, 1, 0, p.height);

      let r = p.map(y, 0, p.height, 1, 3);
      let alpha = p.map(y, 0, p.height, 0, 255);

      p.fill(255, alpha);
      p.ellipse(x, y, r, r);

      xoff += 0.1;
    }

    t += 0.01;
  };
};
