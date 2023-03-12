export const sketch = function (p) {
  let t = 0;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.noStroke();
  };

  p.draw = function () {
    p.background(255);
    p.fill(0, 10);
    p.translate(p.width / 2, p.height / 2);
    recursiveLifeForm(50, 0);
    t += 0.01;
  };

  function recursiveLifeForm(size, level) {
    const angle = p.noise(t + level * 0.5) * p.TWO_PI * level;
    const x = p.cos(angle) * size;
    const y = p.sin(angle) * size;

    p.ellipse(x, y, size * 2, size * 2);

    if (size > 2) {
      recursiveLifeForm(size * 0.7, level + 1);
      p.push();
      p.translate(x, y);
      p.rotate(angle);
      recursiveLifeForm(size * 0.7, level + 1);
      p.pop();
    }
  }
};
