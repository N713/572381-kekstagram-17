'use strict';

(function () {

  var DEBOUNCE_TIME = 500;

  var timeout;
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');

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

  var setFilterButtonClass = function (buttonName) {
    var currentButton = document.querySelector('.img-filters__button--active');
    currentButton.classList.remove('img-filters__button--active');
    buttonName.classList.add('img-filters__button--active');
  };

  var renderPopular = function () {
    deletePictures();
    window.render(window.photos);
  };

  var renderNew = function () {
    deletePictures();
    window.render(window.photos.sort(compareRandom).slice(0, 10));
  };

  var renderDiscussed = function () {
    deletePictures();
    window.render(sortByComments().reverse());
  };

  var debounceButton = function (doByTimeout) {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(function () {
      doByTimeout();
    }, DEBOUNCE_TIME);
  };

  buttonPopular.addEventListener('click', function () {
    debounceButton(renderPopular);
    setFilterButtonClass(buttonPopular);
  });

  buttonNew.addEventListener('click', function () {
    debounceButton(renderNew);
    setFilterButtonClass(buttonNew);
  });

  buttonDiscussed.addEventListener('click', function () {
    debounceButton(renderDiscussed);
    setFilterButtonClass(buttonDiscussed);
  });

})();
