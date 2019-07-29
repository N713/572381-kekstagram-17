'use strict';

(function () {
  var picturesSection = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

  window.photos = [];

  var addClassToPicture = function (picturesArray) {
    var pictures = document.querySelectorAll('.picture');

    for (var i = 0; i < pictures.length; i++) {
      var pictureClass = picturesArray[i].url.split('/')[1].split('.')[0];
      pictures[i].classList.add(pictureClass + '');
    }
  };

  var addPictures = function (photosData) {
    var fragment = document.createDocumentFragment();

    photosData.forEach(function (photoData) {
      fragment.appendChild(window.renderPicture(photoData));
    });

    return fragment;
  };

  window.renderPhotos = function (photosData) {
    picturesSection.appendChild(addPictures(photosData));
    addClassToPicture(photosData);
  };

  var activateFilters = function (photosData) {
    window.photos = photosData;
    filters.classList.remove('img-filters--inactive');
    window.renderPhotos(window.photos);
  };

  window.picturesSection = picturesSection;
  window.load(activateFilters, window.onErrorHandler);

})();
