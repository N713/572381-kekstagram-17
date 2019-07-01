'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesSection = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');

  var photos = [];

  var loadArray = function (array) {
    picturesSection.appendChild(window.addPictures(array));
  };

  var loadPhotoArray = function (data) {
    photos = data;
    filters.classList.remove('img-filters--inactive');
    loadArray(photos);
  };

  var deletePictures = function () {
    var pictures = picturesSection.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      picturesSection.removeChild(picturesSection.querySelector('.picture'));
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
    var sorted = photos.slice().sort(function (first, second) {
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

  buttonPopular.addEventListener('click', function () {
    deletePictures();
    loadArray(photos);
    setFilterButtonClass(buttonPopular);
  });

  buttonNew.addEventListener('click', function () {
    deletePictures();
    loadArray(uniqueArray(getNewPhotos(photos)).slice(0, 10));
    setFilterButtonClass(buttonNew);
  });

  buttonDiscussed.addEventListener('click', function () {
    deletePictures();
    loadArray(sortByComments().reverse());
    setFilterButtonClass(buttonDiscussed);
  });

  var onErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.height = '30px';
    node.style.borderBottom = '4px solid yellow';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pictureTemplate = pictureTemplate;

  window.load(loadPhotoArray, onErrorHandler);

})();
