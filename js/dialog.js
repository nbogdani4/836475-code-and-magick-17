'use strict';

// Модуль диалогового окно, открытие/закрытие, перемещение
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupPlayer = window.setup.setupDialog.querySelector('.setup-player');

  // Функция показывает Popup удаляя атрибут style и класс hidden и добавляет слушатель на нажатие клавиатуры
  var openPopup = function () {
    if (window.setup.setupDialog.getAttribute('style')) {
      window.setup.setupDialog.removeAttribute('style');
    }
    window.setup.setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupPlayer.addEventListener('click', window.setup.processingClicksPlayerSettings);
  };

  var setupOpen = document.querySelector('.setup-open');

  // По клику на аватарку вызывает функцию открытия Popup
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // При фокусе аватарки и по нажатию клавиши Enter вызывается функция открытия PopUp
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  // Функция проверяет нажатую кнопку, если была нажата ESC, вызывает функцию закрытия окна
  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (window.setup.setupUserName !== document.activeElement)) {
      closePopup();
    }
  };

  // Функция прячет PopUp и удаляет слушатель событий клавиатуры
  var closePopup = function () {
    window.setup.setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupPlayer.removeEventListener('click', window.setup.processingClicksPlayerSettings);
  };

  var setupClose = window.setup.setupDialog.querySelector('.setup-close');

  // Обработчик событий вызывает функцию закрытия Popup по клику на крестик
  setupClose.addEventListener('click', closePopup);

  // Обработчик событий на крестике ловит нажатие клафиши и если это Enter, вызывается функция закрытия Popup
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var upload = window.setup.setupDialog.querySelector('.upload');

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

      window.setup.setupDialog.style.top = (window.setup.setupDialog.offsetTop - shiftCoordinate.y) + 'px';
      window.setup.setupDialog.style.left = (window.setup.setupDialog.offsetLeft - shiftCoordinate.x) + 'px';
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
