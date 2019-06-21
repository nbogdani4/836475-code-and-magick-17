'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
var WIZARD_COUNT = 4;
var USER_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var USER_SURENAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
