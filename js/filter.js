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

  var sortByCommentsReverse = function () {
    var sorted = window.photos.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
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

  var debounce = function (callback) {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(function () {
      callback();
    }, DEBOUNCE_TIME);
  };

  var onFilterClick = function (filterButton) {
    var filteredPhotos;

    switch (filterButton.id) {
      case 'filter-popular':
        filteredPhotos = window.photos;
        break;
      case 'filter-new':
        filteredPhotos = window.photos.slice().sort(compareRandom).slice(0, 10);
        break;
      case 'filter-discussed':
        filteredPhotos = sortByCommentsReverse();
        break;
    }

    if (currentButton !== filterButton) {
      debounce(function () {
        deletePictures();
        window.renderPhotos(filteredPhotos);

        var pictures = document.querySelectorAll('.picture');

        for (var i = 0; i < pictures.length; i++) {
          var a = filteredPhotos[i].url.split('/')[1].split('.')[0];
          pictures[i].classList.add(a + '');
        }

      });

      selectButton(filterButton);
    }
  };

  filterButtons.forEach(function (filterButton) {
    filterButton.addEventListener('click', function () {
      onFilterClick(filterButton);
    });
  });

})();
