'use strict';

(function () {
  var picturesSection = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

  window.photos = [];

  var addPictures = function (photosData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosData.length; i++) {
      fragment.appendChild(window.renderPicture(photosData, i));
    }

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

  window.picturesSection = picturesSection;
  window.load(activateFilters, window.onErrorHandler);

})();
