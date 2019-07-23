'use strict';

(function () {

  var succesTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var uploadTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var main = document.querySelector('main');

  window.onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && main.contains(succesTemplate)) {
      main.removeChild(succesTemplate);
    }

    document.removeEventListener('keydown', window.onSuccessEscPress);
    document.removeEventListener('click', onPopupFreeClick);
  };

  window.onErrorEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && main.contains(errorTemplate)) {
      main.removeChild(errorTemplate);
    }

    document.removeEventListener('keydown', window.onErrorEscPress);
    document.removeEventListener('click', onPopupFreeClick);
  };

  var onPopupFreeClick = function () {
    if (main.contains(succesTemplate)) {
      main.lastChild.remove();
      document.removeEventListener('keydown', window.onSuccessEscPress);
    }

    if (main.contains(errorTemplate)) {
      main.lastChild.remove();
      document.removeEventListener('keydown', window.onErrorEscPress);
    }

    document.removeEventListener('click', onPopupFreeClick);
  };

  var onSucessButtonClick = function () {
    if (main.contains(succesTemplate)) {
      main.removeChild(succesTemplate);
    }

    document.removeEventListener('keydown', window.onSuccessEscPress);
    document.removeEventListener('click', onSucessButtonClick);
  };

  var onErrorButtonClick = function () {
    if (main.contains(errorTemplate)) {
      main.removeChild(errorTemplate);
    }

    document.removeEventListener('keydown', window.onErrorEscPress);
    document.removeEventListener('click', onErrorButtonClick);
  };

  window.addPopupHandlers = function (popup, escpress) {
    main.appendChild(popup);

    if (popup === succesTemplate) {
      var succesButton = popup.querySelector('.success__button');

      succesButton.addEventListener('click', onSucessButtonClick);
    }

    if (popup === errorTemplate) {
      var errorButtons = popup.querySelectorAll('.error__button');

      errorButtons.forEach(function (button) {
        button.addEventListener('click', onErrorButtonClick);
      });
    }

    document.addEventListener('click', onPopupFreeClick);
    document.addEventListener('keydown', escpress);
    document.removeEventListener('keydown', window.onUploadPreviewEscPress);
  };

  window.main = main;
  window.uploadTemplate = uploadTemplate;
  window.succesTemplate = succesTemplate;
  window.errorTemplate = errorTemplate;

})();
