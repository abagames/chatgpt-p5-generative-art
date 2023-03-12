export const sketch = function (p) {
  let t = 0;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.noStroke();
  };

  p.draw = function () {
    p.background(0);
    for (let x = 0; x <= p.width; x += 20) {
      for (let y = 0; y <= p.height; y += 20) {
        const wave = p.sin(t + x * 0.05) + p.sin(t + y * 0.05);
        const r = p.map(p.sin(wave), -2, 2, 0, 255);
        const g = p.map(p.cos(wave), -2, 2, 0, 255);
        const b = p.map(p.sin(t + wave), -2, 2, 0, 255);
        p.fill(r, g, b);
        p.ellipse(x, y, 15, 15);
      }
    }
    t += 0.05;
  };
};
