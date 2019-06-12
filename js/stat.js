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
var PLAYER_BAR_COLOR = 'hsl(0, 100%, 50%)';
var BLACK_COLOR = '#000000';
var WHITE_COLOR = '#ffffff';

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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var barColor = function (name) {
  return (name === PLAYER_NAME) ? PLAYER_BAR_COLOR : 'hsl(240, ' + getRandomInt(0, 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, names, times) {
  markCloud(ctx, CLOUD_X + INDENT, CLOUD_Y + INDENT, 'rgba(0, 0, 0, 0.7)', BLACK_COLOR);
  markCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR, BLACK_COLOR);

  ctx.fillStyle = BLACK_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', MESSAGE_X, MESSAGE_Y);
  ctx.fillText('Список результатов:', MESSAGE_X, MESSAGE_Y + STRING_HEIGHT);

  var maxTime = getMaxElement(times);
  ctx.fillStyle = BLACK_COLOR;

  for (var i = 0; i < names.length; i++) {

    ctx.fillText(Math.round(times[i]), BAR_X + (BAR + BAR_INDENT) * i, BAR_Y - INDENT - (BAR_MAX_HEIGHT / maxTime) * times[i]);
    ctx.fillStyle = barColor(names[i]);
    ctx.fillRect(BAR_X + (BAR + BAR_INDENT) * i, BAR_Y, BAR, -+(BAR_MAX_HEIGHT / maxTime) * times[i]);
    ctx.fillStyle = BLACK_COLOR;
    ctx.fillText(names[i], BAR_X + (BAR + BAR_INDENT) * i, BAR_Y + STRING_HEIGHT);
  }
};
