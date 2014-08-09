var App;

App = {};


/*
  Init
 */

App.init = function() {

  App.color="#F92672";
  App.operation="#F92672";

  App.wrap = document.createElement('div');
  App.wrap.height = 400;
  App.wrap.width = 800;
  App.wrap.id = 'wrap';

  App.canvas = document.createElement('canvas');
  App.center = document.createElement('center');
  App.canvas.height = 400;
  App.canvas.width = 800;
  document.getElementsByTagName('article')[0].appendChild(App.center);
  App.center.appendChild(App.wrap);
  App.wrap.appendChild(App.canvas);
  App.ctx = App.canvas.getContext("2d");
  App.ctx.fillStyle = "solid";
  App.ctx.strokeStyle = App.color;
  App.ctx.lineWidth = 0.5;
  App.ctx.lineCap = "round";
  App.dispatcher = new WebSocketRails(window.document.location.host + '/websocket');
  App.dispatcher.bind('draw_click', function(data) {
    return App.draw(data.x, data.y, data.type);
  });
  App.draw = function(x, y, type) {
    if (type === "dragstart") {
      App.ctx.beginPath();
      return App.ctx.moveTo(x, y);
    } else if (type === "drag") {
      App.ctx.lineTo(x, y);
      return App.ctx.stroke();
    } else {
      return App.ctx.closePath();
    }
  };
};


/*
  Draw Events
 */

$('canvas').live('drag dragstart dragend', function(e) {
  var offset, type, x, y;
  type = e.handleObj.type;
  offset = $(this).offset();
  e.offsetX = e.layerX - offset.left;
  e.offsetY = e.layerY - offset.top;
  x = e.offsetX;
  y = e.offsetY;
  App.draw(x, y, type);
  App.dispatcher.trigger('draw_click', {
    x: x,
    y: y,
    type: type
  });
});

$(function() {
  return App.init();
});
