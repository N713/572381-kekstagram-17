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

  var onFilterClick = function (filter, debouncer, select) {
    if (filter !== currentButton) {
      debouncer();
      select();
    }
  };

  filterButtons.forEach(function (filter) {
    switch (filter.id) {
      case 'filter-popular':
        filter.addEventListener('click', function () {
          onFilterClick(filter, debounce(renderPopular), selectButton(filter));
        });
        break;
      case 'filter-new':
        filter.addEventListener('click', function () {
          onFilterClick(filter, debounce(renderNew), selectButton(filter));
        });
        break;
      case 'filter-discussed':
        filter.addEventListener('click', function () {
          onFilterClick(filter, debounce(renderDiscussed), selectButton(filter));
        });
        break;
    }
  });

})();
