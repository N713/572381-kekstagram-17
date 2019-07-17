'use strict';

(function () {
  var picturesSection = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

  window.photos = [];

  var addPictures = function (photosData) {
    var fragment = document.createDocumentFragment();

    photosData.forEach(function (photoData) {
      fragment.appendChild(window.renderPicture(photoData));
    });

    return fragment;
  };

  window.renderPhotos = function (photosData) {
    picturesSection.appendChild(addPictures(photosData));
  };

  var activateFilters = function (photosData) {
    window.photos = photosData;
    filters.classList.remove('img-filters--inactive');
    window.renderPhotos(window.photos);
  };

  picturesSection.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.bigPicture.classList.add('hidden');
    }
  });

  window.picturesSection = picturesSection;
  window.load(activateFilters, window.onErrorHandler);

})();
