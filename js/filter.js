'use strict';

(function () {

  var DEBOUNCE_TIME = 500;

  var timeout;
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');

  var deletePictures = function () {
    var pictures = window.picturesSection.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      window.picturesSection.removeChild(window.picturesSection.querySelector('.picture'));
    }
  };

  var uniqueArray = function (arrayToUnique) {
    return arrayToUnique.filter(function (element, position, array) {
      return array.indexOf(element) === position;
    });
  };

  var getRandomArrayElement = function (array) {
    var random = Math.floor(Math.random() * array.length);

    return array[random];
  };

  var getNewPhotos = function (array) {
    var random = [];

    for (var i = 0; i < array.length; i++) {
      random.push(getRandomArrayElement(array));
    }

    return random;
  };

  var sortByComments = function () {
    var sorted = window.photos.slice().sort(function (first, second) {
      if (parseInt(first.comments.length, 10) > parseInt(second.comments.length, 1)) {
        return 1;
      } else if (parseInt(first.comments.length, 10) < parseInt(second.comments.length, 10)) {
        return -1;
      } else {
        return 0;
      }
    });

    return sorted;
  };

  var setFilterButtonClass = function (buttonName) {
    if (buttonName === buttonPopular) {
      buttonPopular.classList.toggle('img-filters__button--active', true);
      buttonNew.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');
    } else if (buttonName === buttonNew) {
      buttonNew.classList.toggle('img-filters__button--active', true);
      buttonPopular.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');
    } else if (buttonName === buttonDiscussed) {
      buttonDiscussed.classList.toggle('img-filters__button--active', true);
      buttonPopular.classList.remove('img-filters__button--active');
      buttonNew.classList.remove('img-filters__button--active');
    }
  };

  var debounceFilter = function (array) {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(function () {
      deletePictures();
      window.loadArray(array);
    }, DEBOUNCE_TIME);
  };

  buttonPopular.addEventListener('click', function () {
    debounceFilter(window.photos);
    setFilterButtonClass(buttonPopular);
  });

  buttonNew.addEventListener('click', function () {
    debounceFilter(uniqueArray(getNewPhotos(window.photos)).slice(0, 10));
    setFilterButtonClass(buttonNew);
  });

  buttonDiscussed.addEventListener('click', function () {
    debounceFilter(sortByComments().reverse());
    setFilterButtonClass(buttonDiscussed);
  });

})();
