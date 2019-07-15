'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var USER_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var USER_SURENAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго'];
  var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizardsProperties = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizardsProperties.push(
        {
          name: window.setup.getRandomValue(USER_NAME) + ' ' + window.setup.getRandomValue(USER_SURENAME),
          coatColor: window.setup.getRandomValue(window.setup.COAT_COLOR),
          eyesColor: window.setup.getRandomValue(window.setup.EYES_COLOR),
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
  document.querySelector('.setup-similar').classList.remove('hidden');

})();
