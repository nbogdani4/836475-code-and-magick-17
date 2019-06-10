'use strict';

var CLOUD_WIDHT = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var INDENT = 10;
var MESSAGE_X = CLOUD_X + 30;
var MESSAGE_Y = CLOUD_Y + 20;
var STRING_HEIGHT = INDENT + 10;
var BAR = 40;
var BAR_INDENT = 50;
var BAR_X = CLOUD_X + BAR_INDENT;
var BAR_Y = CLOUD_Y + 240;
var BAR_MAX_HEIGHT = 150;
var PLAYER_NAME = 'Вы';

var markCloud = function (ctx, x, y, fillColor, strokeColor) {
  ctx.strokeStyle = strokeColor;
  ctx.strokeRect(x, y, CLOUD_WIDHT, CLOUD_HEIGHT);
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, CLOUD_WIDHT, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var barColor = function (name) {
  return (name === PLAYER_NAME) ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, 1)';
};

window.renderStatistics = function (ctx, names, times) {
  markCloud(ctx, CLOUD_X + INDENT, CLOUD_Y + INDENT, 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 1)');
  markCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff', 'rgba(0, 0, 0, 1)');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', MESSAGE_X, MESSAGE_Y);
  ctx.fillText('Список результатов:', MESSAGE_X, MESSAGE_Y + STRING_HEIGHT);

  var maxTime = getMaxElement(times);
  ctx.fillStyle = '#000000';

  for (var i = 0; i < names.length; i++) {

    ctx.fillText(Math.round(times[i]), BAR_X + (BAR + BAR_INDENT) * i, BAR_Y - INDENT - (BAR_MAX_HEIGHT / maxTime) * times[i]);
    ctx.fillStyle = barColor(names[i]);
    ctx.fillRect(BAR_X + (BAR + BAR_INDENT) * i, BAR_Y, BAR, -+(BAR_MAX_HEIGHT / maxTime) * times[i]);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], BAR_X + (BAR + BAR_INDENT) * i, BAR_Y + STRING_HEIGHT);
  }
};
