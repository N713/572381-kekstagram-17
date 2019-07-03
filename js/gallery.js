'use strict';

(function () {
  var picturesSection = document.querySelector('.pictures');

  window.addPictures = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.renderPicture(photos, i));
    }

    return fragment;
  };

  window.render = function (array) {
    picturesSection.appendChild(window.addPictures(array));
  };

  window.picturesSection = picturesSection;

})();
