export const sketch = function (p) {
  let t = 0;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.noStroke();
  };

  p.draw = function () {
    p.background(255);
    p.fill(255, 0, 0);
    drawDigDug(p.width * 0.25, p.height * 0.5, 20 + 50 * p.noise(t + 1));
    p.fill(0, 255, 0);
    drawDigDug(p.width * 0.5, p.height * 0.5, 20 + 50 * p.noise(t + 2));
    p.fill(0, 0, 255);
    drawDigDug(p.width * 0.75, p.height * 0.5, 20 + 50 * p.noise(t + 3));
    t += 0.02;
  };

  function drawDigDug(x, y, size) {
    p.beginShape();
    for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
      let radius = size + size * p.noise(p.cos(angle * 5), p.sin(angle * 5), t);
      let px = x + radius * p.cos(angle);
      let py = y + radius * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
  }
};
