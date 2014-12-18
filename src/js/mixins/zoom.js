"use strict";

var zoomStarted   = false,
    zoomFactor    = 0,
    x             = 0,
    y             = 0,
    metaData,
    scale,
    scaleD;

function onMouseWheel(event) {
  event.preventDefault();

  metaData = this.props;

  zoomFactor = event.deltaY;
  x = event.pageX;
  y = event.pageY;

  scale = metaData.scale + (metaData.scale * zoomFactor / 500);
  scaleD = scale / metaData.scale;

  x = scaleD * (metaData.position.x - x) + x;
  y = scaleD * (metaData.position.y - y) + y;

  metaData.position.x = x;
  metaData.position.y = y;
  metaData.scale = scale;

  this.update();
}

module.exports = {
  startZoom: function () {
    if (!zoomStarted) {
      window.addEventListener("mousewheel", onMouseWheel.bind(this));
      zoomStarted = true;
    }
  },
  stopZoom: function () {
    if (zoomStarted) {
      window.removeEventListener("mousewheel", onMouseWheel);
      zoomStarted = false;
    }
  }
};