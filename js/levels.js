function fillPoly(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (var i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i][0], pts[i][1]);
  }
  ctx.closePath();
  ctx.fill();
}

function ellipse(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(rx, ry);
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.restore();
  ctx.fill();
}

function pisaCx(y) {
  return 150 + (640 - y) * 0.23;
}

function drawEiffel(ctx) {
  ctx.fillStyle = '#8ecae6';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#b7e4c7';
  ctx.fillRect(0, 668, 390, 176);
  ctx.fillStyle = '#95d5b2';
  ctx.fillRect(0, 652, 390, 22);

  var iron = '#7a5a40';
  var dark = '#4a3426';
  ctx.fillStyle = iron;
  fillPoly(ctx, [[62, 668], [124, 668], [186, 392], [168, 348]]);
  fillPoly(ctx, [[328, 668], [266, 668], [204, 392], [222, 348]]);

  ctx.fillStyle = '#8ecae6';
  ctx.beginPath();
  ctx.moveTo(124, 668);
  ctx.lineTo(266, 668);
  ctx.lineTo(226, 498);
  ctx.quadraticCurveTo(195, 390, 164, 498);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = iron;
  fillPoly(ctx, [[168, 348], [186, 404], [204, 404], [222, 348]]);
  fillPoly(ctx, [[176, 340], [214, 340], [206, 228], [184, 228]]);
  fillPoly(ctx, [[186, 228], [204, 228], [198, 156], [192, 156]]);
  ctx.fillRect(194, 136, 3, 22);

  ctx.fillStyle = dark;
  ctx.fillRect(146, 338, 98, 16);
  ctx.fillRect(176, 220, 38, 12);
  ctx.fillStyle = iron;
  for (var i = 0; i < 8; i++) {
    ctx.fillRect(152 + i * 12, 328, 3, 12);
  }

  ctx.strokeStyle = '#3a291d';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 640);
  ctx.lineTo(158, 430);
  ctx.moveTo(116, 640);
  ctx.lineTo(176, 430);
  ctx.moveTo(310, 640);
  ctx.lineTo(232, 430);
  ctx.moveTo(274, 640);
  ctx.lineTo(214, 430);
  ctx.moveTo(184, 328);
  ctx.lineTo(204, 236);
  ctx.moveTo(206, 328);
  ctx.lineTo(186, 236);
  ctx.stroke();
}

function drawPisa(ctx) {
  ctx.fillStyle = '#90c2e0';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#8fbf78';
  ctx.fillRect(0, 648, 390, 196);
  ellipse(ctx, 200, 668, 150, 22);

  var stories = 8;
  for (var i = 0; i < stories; i++) {
    var yBottom = 640 - i * 46;
    var yTop = yBottom - 38;
    var halfBottom = 70 - i * 3.2;
    var halfTop = halfBottom - 2;
    var xBottom = pisaCx(yBottom);
    var xTop = pisaCx(yTop);

    ctx.fillStyle = i % 2 === 0 ? '#f4e4c4' : '#ead6ae';
    fillPoly(ctx, [
      [xBottom - halfBottom, yBottom],
      [xBottom + halfBottom, yBottom],
      [xTop + halfTop, yTop],
      [xTop - halfTop, yTop]
    ]);

    ctx.fillStyle = '#fbf3e3';
    ellipse(ctx, xTop, yTop, halfTop + 8, 9);

    ctx.fillStyle = '#c4a06a';
    var side = xBottom;
    ellipse(ctx, side - 24, yBottom - 18, 7, 11);
    ellipse(ctx, side + 24, yBottom - 18, 7, 11);
  }

  var roofY = 640 - 7 * 46 - 38;
  var roofX = pisaCx(roofY);
  ctx.fillStyle = '#e7d3a8';
  fillPoly(ctx, [
    [roofX - 28, roofY],
    [roofX + 28, roofY],
    [roofX + 8, roofY - 36],
    [roofX - 8, roofY - 36]
  ]);
}

function drawLiberty(ctx) {
  ctx.fillStyle = '#8ecae6';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#4ea3d1';
  ctx.fillRect(0, 640, 390, 204);
  ellipse(ctx, 195, 655, 120, 18);
  ctx.fillStyle = '#7dcb8a';
  ellipse(ctx, 195, 648, 78, 14);

  ctx.fillStyle = '#d9d3c5';
  ctx.fillRect(152, 500, 86, 150);
  ctx.fillStyle = '#c3bbaa';
  ctx.fillRect(164, 560, 28, 46);
  ctx.fillRect(146, 492, 98, 14);

  ctx.fillStyle = '#3f9a62';
  fillPoly(ctx, [[158, 508], [232, 508], [220, 332], [170, 332]]);
  ctx.fillStyle = '#2f7a4c';
  ctx.beginPath();
  ctx.moveTo(195, 360);
  ctx.lineTo(208, 508);
  ctx.lineTo(182, 508);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#3f9a62';
  ctx.beginPath();
  ctx.arc(195, 308, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#246b40';
  ctx.lineWidth = 4;
  var spikes = [-28, -16, -6, 6, 16, 28];
  for (var s = 0; s < spikes.length; s++) {
    ctx.beginPath();
    ctx.moveTo(195 + spikes[s] * 0.45, 286);
    ctx.lineTo(195 + spikes[s], 236);
    ctx.stroke();
  }
  ctx.fillStyle = '#2f7a4c';
  ellipse(ctx, 195, 286, 30, 8);

  ctx.strokeStyle = '#3f9a62';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(214, 390);
  ctx.lineTo(300, 250);
  ctx.stroke();
  ctx.fillStyle = '#2f7a4c';
  ctx.beginPath();
  ctx.arc(308, 236, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f2b134';
  fillPoly(ctx, [[308, 214], [296, 232], [320, 232]]);
  ctx.fillStyle = '#ffd56a';
  ctx.beginPath();
  ctx.arc(308, 206, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#d9d3c5';
  ctx.fillRect(108, 396, 42, 56);
  ctx.strokeStyle = '#8d8678';
  ctx.lineWidth = 2;
  ctx.strokeRect(114, 404, 30, 40);
}

function drawColosseum(ctx) {
  ctx.fillStyle = '#9ec9e4';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#d9c7a4';
  ctx.fillRect(0, 690, 390, 154);

  ctx.fillStyle = '#e7d3b0';
  ellipse(ctx, 195, 470, 168, 210);
  ctx.fillStyle = '#efe0c4';
  ellipse(ctx, 195, 470, 148, 188);

  ctx.fillStyle = '#6b5344';
  var holes = [120, 175, 230, 285];
  var rows = [390, 480, 570];
  var r;
  var h;
  for (r = 0; r < rows.length; r++) {
    for (h = 0; h < holes.length; h++) {
      ctx.beginPath();
      ctx.arc(holes[h], rows[r], 16, Math.PI, 0);
      ctx.lineTo(holes[h] + 16, rows[r] + 24);
      ctx.lineTo(holes[h] - 16, rows[r] + 24);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function shell(ctx, x0, peakX, peakY, x1, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0, 590);
  ctx.quadraticCurveTo(x0 - 24, peakY + 80, peakX, peakY);
  ctx.quadraticCurveTo(x1 + 24, peakY + 70, x1, 590);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#d5dbe2';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo((x0 + x1) / 2, 590);
  ctx.quadraticCurveTo(peakX, peakY + 40, peakX, peakY);
  ctx.stroke();
}

function drawOpera(ctx) {
  ctx.fillStyle = '#8ecae6';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#2f6fad';
  ctx.fillRect(0, 600, 390, 244);
  ctx.fillStyle = '#4f8fc4';
  ctx.fillRect(0, 600, 390, 16);

  ctx.fillStyle = '#e7e1d6';
  fillPoly(ctx, [[48, 640], [342, 640], [320, 590], [70, 590]]);

  shell(ctx, 70, 112, 430, 155, '#f7f5f2');
  shell(ctx, 130, 188, 300, 235, '#ffffff');
  shell(ctx, 200, 268, 390, 310, '#f0f2f4');
  shell(ctx, 255, 330, 470, 360, '#fbfbfb');
}

function drawTaj(ctx) {
  ctx.fillStyle = '#d7ecf8';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#7ea36a';
  ctx.fillRect(0, 600, 390, 244);
  ctx.fillStyle = '#8fb8d4';
  ctx.fillRect(150, 640, 90, 70);

  ctx.fillStyle = '#f7f4ef';
  ctx.fillRect(36, 548, 318, 78);

  function minaret(x, y0, y1) {
    ctx.fillStyle = '#f4f1ea';
    ctx.fillRect(x - 9, y0 + 18, 18, y1 - y0 - 18);
    ctx.beginPath();
    ctx.arc(x, y0 + 14, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e4ddd2';
    ctx.fillRect(x - 13, y0 + 78, 26, 6);
    ctx.fillStyle = '#d4b15a';
    ctx.fillRect(x - 1, y0 - 16, 2, 20);
  }

  minaret(62, 250, 575);
  minaret(328, 250, 575);
  minaret(112, 310, 548);
  minaret(278, 310, 548);

  ctx.fillStyle = '#fbfaf7';
  ctx.fillRect(128, 400, 134, 160);
  ctx.fillStyle = '#d7e3ea';
  ctx.beginPath();
  ctx.moveTo(168, 545);
  ctx.lineTo(222, 545);
  ctx.lineTo(214, 470);
  ctx.quadraticCurveTo(195, 430, 176, 470);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fbfaf7';
  ctx.beginPath();
  ctx.arc(195, 352, 48, Math.PI, 0);
  ctx.lineTo(243, 400);
  ctx.lineTo(147, 400);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#d4b15a';
  ctx.fillRect(194, 286, 2, 22);
  ctx.beginPath();
  ctx.arc(195, 284, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f7f4ef';
  ctx.beginPath();
  ctx.arc(160, 392, 14, Math.PI, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(230, 392, 14, Math.PI, 0);
  ctx.fill();
}

function drawBridge(ctx) {
  ctx.fillStyle = '#c5ddf0';
  ctx.fillRect(0, 0, 390, 844);
  ctx.fillStyle = '#3d6f93';
  ctx.fillRect(0, 590, 390, 254);
  ctx.fillStyle = '#2f5d7c';
  ctx.fillRect(0, 600, 390, 12);

  ctx.strokeStyle = '#8aa0ab';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(146, 330);
  ctx.quadraticCurveTo(195, 470, 244, 330);
  ctx.moveTo(146, 360);
  ctx.quadraticCurveTo(195, 500, 244, 360);
  ctx.stroke();

  ctx.fillStyle = '#c5bfb4';
  ctx.fillRect(76, 268, 70, 320);
  ctx.fillRect(244, 268, 70, 320);

  ctx.fillStyle = '#4d6478';
  fillPoly(ctx, [[76, 268], [146, 268], [111, 214]]);
  fillPoly(ctx, [[244, 268], [314, 268], [279, 214]]);
  ctx.fillRect(108, 196, 6, 22);
  ctx.fillRect(276, 196, 6, 22);

  ctx.fillStyle = '#b7c3c9';
  ctx.fillRect(146, 300, 98, 22);
  ctx.fillRect(146, 348, 98, 18);

  ctx.fillStyle = '#5c6168';
  ctx.fillRect(24, 548, 342, 24);
  ctx.fillStyle = '#7d868c';
  fillPoly(ctx, [[146, 548], [190, 548], [168, 520]]);
  fillPoly(ctx, [[244, 548], [200, 548], [222, 520]]);

  ctx.fillStyle = '#4d6478';
  ctx.fillRect(96, 390, 30, 36);
  ctx.fillRect(96, 470, 30, 36);
  ctx.fillRect(264, 390, 30, 36);
  ctx.fillRect(264, 470, 30, 36);
}

function drawBurj(ctx) {
  var sections = [
    { y0: 168, y1: 210, hw: 8 },
    { y0: 210, y1: 255, hw: 13 },
    { y0: 255, y1: 305, hw: 18 },
    { y0: 305, y1: 360, hw: 24 },
    { y0: 360, y1: 415, hw: 30 },
    { y0: 415, y1: 470, hw: 36 },
    { y0: 470, y1: 530, hw: 42 },
    { y0: 530, y1: 590, hw: 50 },
    { y0: 590, y1: 650, hw: 58 },
    { y0: 650, y1: 705, hw: 78 }
  ];

  ctx.fillStyle = '#1d2436';
  ctx.fillRect(0, 0, 390, 560);
  ctx.fillStyle = '#c4795a';
  ctx.fillRect(0, 560, 390, 120);
  ctx.fillStyle = '#d9d3c8';
  ctx.fillRect(0, 680, 390, 164);

  ctx.fillStyle = '#d5dde6';
  ctx.beginPath();
  ctx.moveTo(195, 132);
  ctx.lineTo(199, 168);
  for (var i = 0; i < sections.length; i++) {
    ctx.lineTo(195 + sections[i].hw, sections[i].y0);
    ctx.lineTo(195 + sections[i].hw, sections[i].y1);
  }
  ctx.lineTo(195 - sections[sections.length - 1].hw, sections[sections.length - 1].y1);
  for (var j = sections.length - 1; j >= 0; j--) {
    ctx.lineTo(195 - sections[j].hw, sections[j].y1);
    ctx.lineTo(195 - sections[j].hw, sections[j].y0);
  }
  ctx.lineTo(191, 168);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#8fa4bb';
  for (var k = 1; k < sections.length; k++) {
    var band = sections[k];
    ctx.fillRect(195 - band.hw + 4, band.y0 + 8, (band.hw - 4) * 2, 5);
  }

  ctx.fillStyle = '#c5d0dc';
  fillPoly(ctx, [[190, 470], [128, 560], [190, 635]]);
  fillPoly(ctx, [[200, 470], [262, 560], [200, 635]]);

  ctx.fillStyle = '#f4f7fb';
  ctx.fillRect(194, 112, 2, 24);
}

var levels = [
  {
    name: '埃菲尔铁塔',
    required: 4,
    screwColor: '#f3e6cf',
    draw: drawEiffel,
    screws: [
      { x: 100, y: 630, r: 18 },
      { x: 290, y: 630, r: 18 },
      { x: 146, y: 500, r: 18 },
      { x: 244, y: 500, r: 18 },
      { x: 168, y: 346, r: 18 },
      { x: 222, y: 346, r: 18 }
    ]
  },
  {
    name: '比萨斜塔',
    required: 5,
    screwColor: '#7a5a32',
    draw: drawPisa,
    screws: (function () {
      var screws = [];
      var i;
      for (i = 0; i < 8; i++) {
        var yBottom = 640 - i * 46;
        var y = yBottom - 19;
        screws.push({ x: Math.round(pisaCx(y)), y: y, r: 16 });
      }
      return screws;
    })()
  },
  {
    name: '自由女神像',
    required: 6,
    screwColor: '#f4f1e8',
    draw: drawLiberty,
    screws: [
      { x: 176, y: 620, r: 15 },
      { x: 214, y: 560, r: 15 },
      { x: 178, y: 450, r: 15 },
      { x: 214, y: 390, r: 15 },
      { x: 129, y: 428, r: 15 },
      { x: 195, y: 278, r: 15 },
      { x: 308, y: 236, r: 15 }
    ]
  },
  {
    name: '罗马斗兽场',
    required: 7,
    screwColor: '#5c4632',
    draw: drawColosseum,
    screws: [
      { x: 100, y: 445, r: 14 },
      { x: 147, y: 445, r: 14 },
      { x: 202, y: 445, r: 14 },
      { x: 257, y: 445, r: 14 },
      { x: 305, y: 445, r: 14 },
      { x: 100, y: 530, r: 14 },
      { x: 147, y: 530, r: 14 },
      { x: 202, y: 530, r: 14 },
      { x: 257, y: 530, r: 14 },
      { x: 305, y: 530, r: 14 }
    ]
  },
  {
    name: '悉尼歌剧院',
    required: 8,
    screwColor: '#243140',
    draw: drawOpera,
    screws: [
      { x: 112, y: 470, r: 14 },
      { x: 124, y: 520, r: 14 },
      { x: 100, y: 575, r: 14 },
      { x: 186, y: 390, r: 14 },
      { x: 210, y: 480, r: 14 },
      { x: 168, y: 575, r: 14 },
      { x: 262, y: 450, r: 14 },
      { x: 280, y: 520, r: 14 },
      { x: 230, y: 580, r: 14 },
      { x: 328, y: 510, r: 14 },
      { x: 300, y: 580, r: 14 }
    ]
  },
  {
    name: '泰姬陵',
    required: 9,
    screwColor: '#8a7344',
    draw: drawTaj,
    screws: [
      { x: 62, y: 340, r: 12 },
      { x: 62, y: 470, r: 12 },
      { x: 328, y: 340, r: 12 },
      { x: 328, y: 470, r: 12 },
      { x: 112, y: 400, r: 12 },
      { x: 278, y: 400, r: 12 },
      { x: 195, y: 360, r: 12 },
      { x: 155, y: 480, r: 12 },
      { x: 235, y: 480, r: 12 },
      { x: 90, y: 590, r: 12 },
      { x: 300, y: 590, r: 12 }
    ]
  },
  {
    name: '伦敦塔桥',
    required: 10,
    screwColor: '#2e3438',
    draw: drawBridge,
    screws: [
      { x: 111, y: 280, r: 13 },
      { x: 111, y: 450, r: 13 },
      { x: 111, y: 560, r: 13 },
      { x: 279, y: 280, r: 13 },
      { x: 279, y: 450, r: 13 },
      { x: 279, y: 560, r: 13 },
      { x: 175, y: 311, r: 13 },
      { x: 215, y: 357, r: 13 },
      { x: 48, y: 560, r: 13 },
      { x: 195, y: 560, r: 13 },
      { x: 342, y: 560, r: 13 },
      { x: 122, y: 340, r: 13 },
      { x: 268, y: 340, r: 13 }
    ]
  },
  {
    name: '哈利法塔',
    required: 12,
    screwColor: '#1b2430',
    draw: drawBurj,
    screws: [
      { x: 195, y: 250, r: 11 },
      { x: 195, y: 300, r: 11 },
      { x: 195, y: 345, r: 11 },
      { x: 195, y: 395, r: 11 },
      { x: 195, y: 445, r: 11 },
      { x: 195, y: 500, r: 11 },
      { x: 195, y: 555, r: 11 },
      { x: 195, y: 610, r: 11 },
      { x: 195, y: 665, r: 11 },
      { x: 162, y: 545, r: 11 },
      { x: 228, y: 545, r: 11 },
      { x: 150, y: 590, r: 11 },
      { x: 240, y: 590, r: 11 },
      { x: 160, y: 670, r: 11 },
      { x: 230, y: 670, r: 11 },
      { x: 195, y: 200, r: 11 }
    ]
  }
];

module.exports = levels;
