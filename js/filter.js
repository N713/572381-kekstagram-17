'use strict';

(function () {
  var DEBOUNCE_TIME = 500;

  var timeout;
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');
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

  var selectButton = function (buttonName) {
    currentButton.classList.remove('img-filters__button--active');
    currentButton = buttonName;
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

  buttonPopular.addEventListener('click', function () {
    if (currentButton !== buttonPopular) {
      debounce(renderPopular);
      selectButton(buttonPopular);
    }
  });

  buttonNew.addEventListener('click', function () {
    if (currentButton !== buttonNew) {
      debounce(renderNew);
      selectButton(buttonNew);
    }
  });

  buttonDiscussed.addEventListener('click', function () {
    if (currentButton !== buttonDiscussed) {
      debounce(renderDiscussed);
      selectButton(buttonDiscussed);
    }
  });

})();
