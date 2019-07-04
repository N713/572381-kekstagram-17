'use strict';

(function () {
  var DEBOUNCE_TIME = 500;

  var timeout;
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var currentButton = document.querySelector('.img-filters__button--active');

  var deletePictures = function () {
    var pictures = window.picturesSection.querySelectorAll('.picture');

    pictures.forEach(function (element) {
      window.picturesSection.removeChild(element);
    });
  };

  var sortByComments = function () {
    var sorted = window.photos.slice().sort(function (first, second) {
      return first.comments.length - second.comments.length;
    });

    return sorted;
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var selectButton = function (button) {
    currentButton.classList.remove('img-filters__button--active');
    currentButton = button;
    currentButton.classList.add('img-filters__button--active');
  };

  var renderPopular = function () {
    deletePictures();
    window.renderPhotos(window.photos);
  };

  var renderNew = function () {
    deletePictures();
    window.renderPhotos(window.photos.slice().sort(compareRandom).slice(0, 10));
  };

  var renderDiscussed = function () {
    deletePictures();
    window.renderPhotos(sortByComments().reverse());
  };

  var debounce = function (callback) {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(function () {
      callback();
    }, DEBOUNCE_TIME);
  };

  var onFilterClick = function (filter, renderPhotos) {
    if (currentButton !== filter) {
      debounce(renderPhotos);
      selectButton(filter);
    }
  };

  filterButtons.forEach(function (filter) {
    filter.addEventListener('click', function () {
      switch (filter.id) {
        case 'filter-popular':
          onFilterClick(filter, renderPopular);
          break;
        case 'filter-new':
          onFilterClick(filter, renderNew);
          break;
        case 'filter-discussed':
          onFilterClick(filter, renderDiscussed);
          break;
      }
    });
  });
})();
