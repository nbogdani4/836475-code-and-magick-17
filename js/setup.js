'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var USER_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var USER_SURENAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var CLASS_WIZARD_COAT = 'wizard-coat';
  var CLASS_WIZARD_EYES = 'wizard-eyes';
  var CLASS_WIZARD_FIREBALL = 'setup-fireball';

  var getRandomValue = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var wizardsProperties = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizardsProperties.push(
        {
          name: getRandomValue(USER_NAME) + ' ' + getRandomValue(USER_SURENAME),
          coatColor: getRandomValue(COAT_COLOR),
          eyesColor: getRandomValue(EYES_COLOR),
        }
    );
  }

  var createWizardElement = function (wizardsPropertiesArray, wizardTemplate, arrayIndex) {
    var newWizardElement = wizardTemplate.cloneNode(true);
    newWizardElement.querySelector('.setup-similar-label').textContent = wizardsPropertiesArray[arrayIndex].name;
    newWizardElement.querySelector('.wizard-coat').style = 'fill: ' + wizardsPropertiesArray[arrayIndex].coatColor;
    newWizardElement.querySelector('.wizard-eyes').style = 'fill: ' + wizardsPropertiesArray[arrayIndex].eyesColor;
    return newWizardElement;
  };

  var getFragmentWithWizard = function () {
    var fragmentWithWizard = document.createDocumentFragment();
    for (var j = 0; j < WIZARD_COUNT; j++) {
      fragmentWithWizard.appendChild(createWizardElement(wizardsProperties, SIMILAR_WIZARD_TEMPLATE, j));
    }
    return fragmentWithWizard;
  };

  document.querySelector('.setup-similar-list').appendChild(getFragmentWithWizard());

  var setupDialog = document.querySelector('.setup');
  var setupUserName = setupDialog.querySelector('.setup-user-name');
  var wizardCoat = setupDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupDialog.querySelector('.setup-wizard .wizard-eyes');
  var fireball = setupDialog.querySelector('.setup-fireball-wrap');
  var inputCoatColor = setupDialog.querySelector('input[name=\'coat-color\']');
  var inputEyesColor = setupDialog.querySelector('input[name=\'eyes-color\']');
  var inputFireballColor = setupDialog.querySelector('input[name=\'fireball-color\']');

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

  // Фуккция перекрашивает элемент
  var colorizeClickedElement = function (colorArray, element, inputElement, svg) {
    var newColor = getRandomValue(colorArray);
    inputElement.value = newColor;
    if (svg === true) {
      element.style = 'fill: ' + newColor;
      return;
    }
    element.style.backgroundColor = newColor;
  };

  // Проверяем на какой объект был клик, и при совпадении вызываем фунуцию с нужными значениями
  var processingClicksPlayerSettings = function (evt) {
    var target = evt.target;
    if (target.getAttribute('class') === CLASS_WIZARD_COAT) {
      colorizeClickedElement(COAT_COLOR, wizardCoat, inputCoatColor, true);
    } else if (target.getAttribute('class') === CLASS_WIZARD_EYES) {
      colorizeClickedElement(EYES_COLOR, wizardEyes, inputEyesColor, true);
    } else if (target.getAttribute('class') === CLASS_WIZARD_FIREBALL) {
      colorizeClickedElement(FIREBALL_COLOR, fireball, inputFireballColor, false);
    }
  };

  (function () {
    var artifactsShop = setupDialog.querySelector('.setup-artifacts-shop');
    var dragginArtifact = null;

    artifactsShop.addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        dragginArtifact = evt.target;
      }
    });

    var artifactsBag = setupDialog.querySelector('.setup-artifacts');

    artifactsBag.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    artifactsBag.addEventListener('dragenter', function (evt) {
      evt.target.style.backgroundColor = 'yellow';
    });

    artifactsBag.addEventListener('dragleave', function (evt) {
      evt.target.style.backgroundColor = '';
    });

    artifactsBag.addEventListener('drop', function (evt) {
      evt.target.appendChild(dragginArtifact);
      evt.target.style.backgroundColor = '';
    });
  })();

  window.setup = {
    setupDialog: setupDialog,
    setupUserName: setupUserName,
    processingClicksPlayerSettings: processingClicksPlayerSettings,
  };
})();

