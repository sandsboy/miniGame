// 占位场景。后续具体玩法只替换本文件，并保留 update / render。

function Scene(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.boxSize = 0;
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.ready = false;
}

Scene.prototype.layout = function () {
  const width = this.canvas.width;
  const height = this.canvas.height;

  this.boxSize = Math.max(24, Math.round(Math.min(width, height) * 0.08));
  this.x = Math.round((width - this.boxSize) / 2);
  this.y = Math.round(height * 0.45);
  this.speed = Math.max(2, Math.round(height * 0.004));
  this.ready = true;
};

Scene.prototype.update = function () {
  if (!this.ready) {
    this.layout();
  }

  const minY = Math.round(this.canvas.height * 0.38);
  const maxY = this.canvas.height - minY - this.boxSize;

  this.y += this.speed;
  if (this.y > maxY || this.y < minY) {
    this.speed = -this.speed;
    this.y += this.speed;
  }
};

Scene.prototype.render = function () {
  const ctx = this.ctx;
  const width = this.canvas.width;
  const height = this.canvas.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#1b2430';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#f4f7fb';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = Math.round(height * 0.045) + 'px sans-serif';
  ctx.fillText('miniGame', width / 2, height * 0.28);

  ctx.fillStyle = '#3dd6c6';
  ctx.fillRect(this.x, this.y, this.boxSize, this.boxSize);
};

module.exports = Scene;
