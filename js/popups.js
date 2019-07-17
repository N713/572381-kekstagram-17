'use strict';

(function () {

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

  window.onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      main.removeChild(succesTemplate);
    }
  };

  window.onErrorEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      main.removeChild(errorTemplate);
    }
  };

  window.addPopupHandlers = function (popup, escpress) {
    main.appendChild(popup);

    document.addEventListener('click', function () {
      popup.remove();
    });

    document.addEventListener('keydown', escpress);
  };

  window.main = main;
  window.uploadTemplate = uploadTemplate;
  window.succesTemplate = succesTemplate;
  window.errorTemplate = errorTemplate;

})();
