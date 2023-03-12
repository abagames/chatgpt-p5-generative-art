export const sketch = function (p) {
  let t = 0;
  let maxT = 1000;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.noFill();
    p.strokeWeight(2);
    p.stroke(255, 255, 255, 50);
  };

  p.draw = function () {
    p.background(0);
    for (let i = 0; i < 20; i++) {
      let x = p.map(i, 0, 20, 50, p.width - 50);
      let y = p.height / 2 + 30 * p.sin(x / 20 + t / 20);
      let d = 20 * p.noise(i / 5, t / 100);
      let angle = 2 * p.PI * p.noise(i / 5 + 1000, t / 1000);
      let cx = x + d * p.cos(angle);
      let cy = y + d * p.sin(angle);
      let r = 40 * p.noise(i / 5 + 2000, t / 500);
      let n = 10 + 20 * p.noise(i / 5 + 3000, t / 300);
      drawThunder(cx, cy, r, n);
    }
    t += 1;
    if (t > maxT) {
      t = 0;
    }
  };

  function drawThunder(x, y, r, n) {
    p.push();
    p.translate(x, y);
    p.rotate(p.radians(45));
    p.beginShape();
    for (let i = 0; i < n; i++) {
      let angle = p.map(i, 0, n, 0, 360);
      let d = r + 20 * p.noise(i / 10, t / 200);
      let x = d * p.cos(angle);
      let y = d * p.sin(angle);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
    p.pop();
  }
};
