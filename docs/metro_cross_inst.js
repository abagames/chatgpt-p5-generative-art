export const sketch = function (p) {
  let t = 0;
  let scale = 40;

  p.setup = function () {
    p.createCanvas(400, 200);
    p.noStroke();
    p.fill(0, 255, 0);
  };

  p.draw = function () {
    p.background(0);

    for (let x = 0; x < p.width; x += scale) {
      for (let y = 0; y < p.height; y += scale) {
        let mx = p.mouseX / p.width;
        let my = p.mouseY / p.height;

        let angle = p.noise(x / 100, y / 100, t) * p.TWO_PI * 4;
        let v = p5.Vector.fromAngle(angle);

        let cx = x + (v.x * scale) / 2;
        let cy = y + (v.y * scale) / 2;

        let size = p.noise(cx / 100, cy / 100, t) * scale * 2;
        p.ellipse(cx, cy, size, size);

        let distToCenter = p.dist(cx, cy, p.width / 2, p.height / 2);
        let maxDist = p.sqrt(p.sq(p.width / 2) + p.sq(p.height / 2));
        let shade = 255 * ((maxDist - distToCenter) / maxDist);
        p.fill(0, shade, 255);
      }
    }

    t += 0.01;
  };
};
