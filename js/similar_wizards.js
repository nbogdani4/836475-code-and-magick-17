'use strict';

(function () {
  var WIZARD_COUNT = 4;

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

  window.backend.load(onLoad, window.setup.onError);

})();
