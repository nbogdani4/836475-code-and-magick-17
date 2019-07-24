'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var createWizardElement = function (wizard) {
    var newWizardElement = similarWizardTemplate.cloneNode(true);
    newWizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    newWizardElement.querySelector('.wizard-coat').style = 'fill: ' + wizard.colorCoat;
    newWizardElement.querySelector('.wizard-eyes').style = 'fill: ' + wizard.colorEyes;

    return newWizardElement;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(createWizardElement(window.setup.getRandomValue(wizards)));
    }

    document.querySelector('.setup-similar-list').appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

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

  window.load(URL, onLoad, onError);

})();
