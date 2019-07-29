'use strict';

(function () {
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  var getRandomValue = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var setupDialog = document.querySelector('.setup');
  var setupUserName = setupDialog.querySelector('.setup-user-name');

  // Перехват и замена сообщений вилидации формы
  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  });

  // Функция перекрашивает элемент
  var colorizeClickedElement = function (colorArray, element, inputElement, svg) {
    var newColor = getRandomValue(colorArray);
    inputElement.value = newColor;
    if (svg) {
      element.style = 'fill: ' + newColor;
      return;
    }
    element.style.backgroundColor = newColor;
  };

  var wizardCoat = setupDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupDialog.querySelector('.setup-wizard .wizard-eyes');
  var fireballWrapper = setupDialog.querySelector('.setup-fireball-wrap');
  var fireball = setupDialog.querySelector('.setup-fireball');
  var inputCoatColor = setupDialog.querySelector('input[name=\'coat-color\']');
  var inputEyesColor = setupDialog.querySelector('input[name=\'eyes-color\']');
  var inputFireballColor = setupDialog.querySelector('input[name=\'fireball-color\']');

  // Проверяем на какой объект был клик, и при совпадении вызываем фунуцию с нужными значениями
  var processingClicksPlayerSettings = function (evt) {
    var target = evt.target;
    if (target.getAttribute('class') === wizardCoat.classList.value) {
      colorizeClickedElement(COAT_COLOR, wizardCoat, inputCoatColor, true);
    } else if (target.getAttribute('class') === wizardEyes.classList.value) {
      colorizeClickedElement(EYES_COLOR, wizardEyes, inputEyesColor, true);
    } else if (target.getAttribute('class') === fireball.classList.value) {
      colorizeClickedElement(FIREBALL_COLOR, fireballWrapper, inputFireballColor, false);
    }
  };

  // Шаблон ошибки
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoad = function () {
    submitButton.disabled = false;
    submitButton.textContent = 'Сохранить';
    window.dialog.closePopup();
  };

  var form = setupDialog.querySelector('.setup-wizard-form');
  var submitButton = setupDialog.querySelector('.setup-submit');
  form.addEventListener('submit', function (evt) {
    submitButton.disabled = true;
    submitButton.textContent = 'Сохраняю...';
    window.backend.request('POST', onLoad, onError, window.backend.URL, new FormData(form));
    evt.preventDefault();
  });

  window.setup = {
    setupDialog: setupDialog,
    setupUserName: setupUserName,
    processingClicksPlayerSettings: processingClicksPlayerSettings,
    getRandomValue: getRandomValue,
    onError: onError,
  };
})();

