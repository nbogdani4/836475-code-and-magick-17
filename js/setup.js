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
    if (svg === true) {
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

  window.setup = {
    setupDialog: setupDialog,
    setupUserName: setupUserName,
    processingClicksPlayerSettings: processingClicksPlayerSettings,
    getRandomValue: getRandomValue,
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
  };
})();

