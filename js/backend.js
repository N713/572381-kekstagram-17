'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var succesTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var uploadTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var main = document.querySelector('main');

  var succesButton = succesTemplate.querySelector('.success__button');
  var errorButtons = errorTemplate.querySelectorAll('.error__button');

  errorButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      main.removeChild(errorTemplate);
    });
  });

  succesButton.addEventListener('click', function () {
    main.removeChild(succesTemplate);
  });

  window.load = function (onSuccess, onError) {
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

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('loadstart', function () {
      main.appendChild(uploadTemplate);
    });

    xhr.addEventListener('loadend', function () {
      main.removeChild(uploadTemplate);
    });

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        main.appendChild(succesTemplate);
      } else {
        window.uploadPreview.classList.add('hidden');
        main.appendChild(errorTemplate);
      }
    });

    xhr.addEventListener('error', function () {
      window.uploadPreview.classList.add('hidden');
      main.appendChild(errorTemplate);
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.onErrorHandler = function (errorMessage) {
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



})();
