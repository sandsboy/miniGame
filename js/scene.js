var levels = require('./levels');
var storage = require('./storage');

var DESIGN_W = 390;
var DESIGN_H = 844;

function Scene(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.progress = storage.load();
  this.last = Date.now();
  this.layout();

  if (this.progress.clearedAll) {
    this.phase = 'done';
    this.levelIndex = levels.length - 1;
    this.level = levels[this.levelIndex];
    this.screws = [];
    this.removed = 0;
  } else {
    this.loadLevel(this.progress.level - 1, false);
  }
}

Scene.prototype.layout = function () {
  var info = {
    windowWidth: this.canvas.width,
    windowHeight: this.canvas.height,
    pixelRatio: 1
  };

  try {
    if (typeof wx !== 'undefined' && wx.getSystemInfoSync) {
      info = wx.getSystemInfoSync() || info;
    }
  } catch (err) {}

  this.ratio = info.pixelRatio || 1;
  this.scale = Math.min(this.canvas.width / DESIGN_W, this.canvas.height / DESIGN_H);
  this.originX = (this.canvas.width - DESIGN_W * this.scale) / 2;
  this.originY = (this.canvas.height - DESIGN_H * this.scale) / 2;
};

Scene.prototype.loadLevel = function (index, persist) {
  var level = levels[index];
  this.levelIndex = index;
  this.level = level;
  this.screws = level.screws.map(function (screw, screwIndex) {
    return {
      id: screwIndex,
      x: screw.x,
      y: screw.y,
      r: screw.r,
      removed: false,
      flying: false,
      t: 0,
      slot: -1,
      angle: 0
    };
  });
  this.removed = 0;
  this.phase = 'intro';
  this.introUntil = Date.now() + 2200;
  this.clearUntil = 0;

  if (persist !== false) {
    this.progress.level = index + 1;
    this.progress.clearedAll = false;
    storage.save(this.progress);
  }
};

Scene.prototype.toDesign = function (touch) {
  var x = touch.clientX * this.ratio;
  var y = touch.clientY * this.ratio;
  return {
    x: (x - this.originX) / this.scale,
    y: (y - this.originY) / this.scale
  };
};

Scene.prototype.restartRect = function () {
  return { x: 304, y: 28, w: 68, h: 36 };
};

Scene.prototype.replayRect = function () {
  return { x: 115, y: 640, w: 160, h: 52 };
};

function hits(point, rect) {
  return point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h;
}

Scene.prototype.onTouchStart = function (event) {
  var touches = (event && event.touches) || [];
  if (!touches.length) {
    return;
  }

  var point = this.toDesign(touches[0]);

  if (this.phase === 'done') {
    if (hits(point, this.replayRect())) {
      this.progress = { level: 1, clearedAll: false };
      storage.save(this.progress);
      this.loadLevel(0, true);
    }
    return;
  }

  if (hits(point, this.restartRect())) {
    this.loadLevel(this.levelIndex, true);
    return;
  }

  if (this.phase === 'intro') {
    this.phase = 'play';
    return;
  }

  if (this.phase !== 'play') {
    return;
  }

  var best = null;
  var bestDist = Infinity;
  var i;
  for (i = 0; i < this.screws.length; i++) {
    var screw = this.screws[i];
    if (screw.removed) {
      continue;
    }
    var dx = point.x - screw.x;
    var dy = point.y - screw.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= screw.r + 8 && dist < bestDist) {
      best = screw;
      bestDist = dist;
    }
  }

  if (!best) {
    return;
  }

  best.removed = true;
  best.flying = true;
  best.slot = this.removed;
  this.removed += 1;

  if (this.removed >= this.level.required) {
    this.phase = 'clear';
    this.clearUntil = Date.now() + 1100;
    if (this.levelIndex + 1 >= levels.length) {
      this.progress.level = levels.length;
      this.progress.clearedAll = true;
    } else {
      this.progress.level = this.levelIndex + 2;
      this.progress.clearedAll = false;
    }
    storage.save(this.progress);
  }
};

Scene.prototype.advance = function () {
  if (this.progress.clearedAll) {
    this.phase = 'done';
    return;
  }
  this.loadLevel(this.progress.level - 1, false);
};

Scene.prototype.update = function () {
  var now = Date.now();
  var dt = Math.min(48, now - this.last);
  this.last = now;

  if (this.phase === 'intro' && now >= this.introUntil) {
    this.phase = 'play';
  }

  if (this.phase === 'clear' && now >= this.clearUntil) {
    this.advance();
  }

  var i;
  for (i = 0; i < this.screws.length; i++) {
    var screw = this.screws[i];
    if (!screw.flying) {
      continue;
    }
    screw.t += dt / 320;
    screw.angle += dt * 0.018;
    if (screw.t >= 1) {
      screw.t = 1;
      screw.flying = false;
    }
  }
};

function slotPosition(count, slot) {
  var gap = Math.min(34, 336 / Math.max(1, count - 1));
  var total = (count - 1) * gap;
  return {
    x: 195 - total / 2 + slot * gap,
    y: 786
  };
}

Scene.prototype.screwPosition = function (screw) {
  if (!screw.removed) {
    return { x: screw.x, y: screw.y, r: screw.r };
  }
  var target = slotPosition(this.level.required, screw.slot);
  var t = screw.t;
  return {
    x: screw.x + (target.x - screw.x) * t,
    y: screw.y + (target.y - screw.y) * t,
    r: screw.r + (12 - screw.r) * t
  };
};

Scene.prototype.drawScrew = function (ctx, x, y, r, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.arc(1.5, 2, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2b241c';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2b241c';
  ctx.fillRect(-r * 0.46, -r * 0.11, r * 0.92, r * 0.22);
  ctx.fillRect(-r * 0.11, -r * 0.46, r * 0.22, r * 0.92);
  ctx.restore();
};

Scene.prototype.drawHud = function (ctx) {
  ctx.fillStyle = 'rgba(16, 20, 28, 0.72)';
  ctx.fillRect(16, 24, 276, 72);
  ctx.fillStyle = '#f4f7fb';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '20px sans-serif';
  ctx.fillText('第 ' + (this.levelIndex + 1) + ' 关  ' + this.level.name, 28, 46);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#d5deea';
  ctx.fillText('拧下 ' + this.removed + ' / ' + this.level.required, 28, 74);

  var button = this.restartRect();
  ctx.fillStyle = '#f4f7fb';
  ctx.fillRect(button.x, button.y, button.w, button.h);
  ctx.fillStyle = '#1b2430';
  ctx.textAlign = 'center';
  ctx.font = '16px sans-serif';
  ctx.fillText('重来', button.x + button.w / 2, button.y + button.h / 2);
};

Scene.prototype.drawTray = function (ctx) {
  ctx.fillStyle = 'rgba(16, 20, 28, 0.88)';
  ctx.fillRect(0, 744, 390, 100);
  ctx.fillStyle = '#f4f7fb';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '14px sans-serif';
  ctx.fillText('暂存', 16, 764);

  var count = this.level.required;
  var i;
  for (i = 0; i < count; i++) {
    var pos = slotPosition(count, i);
    ctx.beginPath();
    ctx.fillStyle = '#2a3140';
    ctx.arc(pos.x, pos.y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#141922';
    ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
    ctx.fill();
  }
};

Scene.prototype.drawScrews = function (ctx) {
  var i;
  for (i = 0; i < this.screws.length; i++) {
    var screw = this.screws[i];
    if (screw.removed) {
      continue;
    }
    this.drawScrew(ctx, screw.x, screw.y, screw.r, screw.angle, this.level.screwColor);
  }
  for (i = 0; i < this.screws.length; i++) {
    var flying = this.screws[i];
    if (!flying.removed) {
      continue;
    }
    var pos = this.screwPosition(flying);
    this.drawScrew(ctx, pos.x, pos.y, pos.r, flying.angle, this.level.screwColor);
  }
};

Scene.prototype.drawIntro = function (ctx) {
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = '#10141c';
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
  ctx.restore();

  ctx.fillStyle = '#f7f4ef';
  ctx.fillRect(36, 250, 318, 210);
  ctx.fillStyle = '#1b2430';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '18px sans-serif';
  ctx.fillText('第 ' + (this.levelIndex + 1) + ' 关', 195, 300);
  ctx.font = '36px sans-serif';
  ctx.fillText(this.level.name, 195, 350);
  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#3d4a5c';
  ctx.fillText('拧下 ' + this.level.required + ' 颗螺丝即可过关', 195, 404);
  ctx.font = '14px sans-serif';
  ctx.fillText('点击开始', 195, 434);
};

Scene.prototype.drawClear = function (ctx) {
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = '#10141c';
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
  ctx.restore();

  ctx.fillStyle = '#f7f4ef';
  ctx.fillRect(70, 300, 250, 150);
  ctx.fillStyle = '#1b2430';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '36px sans-serif';
  ctx.fillText('过关', 195, 350);
  ctx.font = '18px sans-serif';
  ctx.fillText(this.level.name, 195, 398);
};

Scene.prototype.renderDone = function (ctx) {
  ctx.fillStyle = '#1b2430';
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
  ctx.fillStyle = '#f4f7fb';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '32px sans-serif';
  ctx.fillText('全部完成', 195, 120);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#d5deea';
  ctx.fillText('八座地标都拧完了', 195, 164);

  var i;
  for (i = 0; i < levels.length; i++) {
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#f4f7fb';
    ctx.fillText((i + 1) + '. ' + levels[i].name, 195, 230 + i * 42);
  }

  var button = this.replayRect();
  ctx.fillStyle = '#f4f7fb';
  ctx.fillRect(button.x, button.y, button.w, button.h);
  ctx.fillStyle = '#1b2430';
  ctx.font = '18px sans-serif';
  ctx.fillText('再玩一次', button.x + button.w / 2, button.y + button.h / 2);
};

Scene.prototype.render = function () {
  var ctx = this.ctx;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.fillStyle = '#10141c';
  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.setTransform(this.scale, 0, 0, this.scale, this.originX, this.originY);

  if (this.phase === 'done') {
    this.renderDone(ctx);
    return;
  }

  this.level.draw(ctx);
  this.drawTray(ctx);
  this.drawScrews(ctx);
  this.drawHud(ctx);

  if (this.phase === 'intro') {
    this.drawIntro(ctx);
  }
  if (this.phase === 'clear') {
    this.drawClear(ctx);
  }
};

module.exports = Scene;
