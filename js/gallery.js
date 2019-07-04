'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  var picturesSection = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

  window.photos = [];

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  var addPictures = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.renderPicture(photos, i));
    }

    return fragment;
  };

  window.render = function (array) {
    picturesSection.appendChild(addPictures(array));
  };

  var renderPhotos = function (data) {
    window.photos = data;
    filters.classList.remove('img-filters--inactive');
    window.render(window.photos);
  };

  window.picturesSection = picturesSection;
  load(renderPhotos, window.onErrorHandler);

})();
