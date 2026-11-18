const Scene = require('./scene');

function Main() {
  const canvas = wx.createCanvas();
  const info = wx.getSystemInfoSync();
  const ratio = info.pixelRatio || 1;

  canvas.width = info.windowWidth * ratio;
  canvas.height = info.windowHeight * ratio;

  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.scene = new Scene(canvas, this.ctx);
  this.lastTouch = null;
  this.running = false;
}

Main.prototype.start = function () {
  this.bindTouch();
  this.loop();
};

Main.prototype.bindTouch = function () {
  const self = this;

  wx.onTouchStart(function (event) {
    const touches = event.touches || [];
    self.lastTouch = touches[0] || null;
    if (typeof self.scene.onTouchStart === 'function') {
      self.scene.onTouchStart(event);
    }
  });
};

Main.prototype.loop = function () {
  if (this.running) {
    return;
  }

  this.running = true;
  const self = this;

  const frame = function () {
    self.scene.update();
    self.scene.render();
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

module.exports = Main;
