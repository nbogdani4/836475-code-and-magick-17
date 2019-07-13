'use strict';
(function () {

  var upload = window.setup.querySelector('.upload');

  upload.addEventListener('mousedown', function (evtDown) {
    var drag = false;
    var startCoordinate = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMouseMove = function (evtMove) {
      drag = true;
      var shiftCoordinate = {
        x: startCoordinate.x - evtMove.clientX,
        y: startCoordinate.y - evtMove.clientY
      };

      startCoordinate = {
        x: evtMove.pageX,
        y: evtMove.pageY
      };

      window.setup.style.top = (window.setup.offsetTop - shiftCoordinate.y) + 'px';
      window.setup.style.left = (window.setup.offsetLeft - shiftCoordinate.x) + 'px';
    };

    var onMouseUp = function () {
      if (drag) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          upload.removeEventListener('click', onClickPreventDefault);
        };
        upload.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
