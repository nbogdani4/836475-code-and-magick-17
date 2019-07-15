'use strict';

(function () {
  var artifactsShop = window.setup.setupDialog.querySelector('.setup-artifacts-shop');
  var dragginArtifact = null;

  artifactsShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      dragginArtifact = evt.target;
    }
  });

  var artifactsBag = window.setup.setupDialog.querySelector('.setup-artifacts');

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
