'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var EXCLUDE_FIRST = 1;
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var uploadPreview = window.uploadWindow.querySelector('.img-upload__overlay');
  var uploadInput = window.uploadWindow.querySelector('#upload-file');
  var uploadCancelButton = window.uploadWindow.querySelector('#upload-cancel');
  var commentArea = window.uploadWindow.querySelector('.text__description');
  var uploadForm = window.uploadWindow.querySelector('.img-upload__form');
  var submitButton = uploadPreview.querySelector('.img-upload__submit');
  var hashtagsField = uploadPreview.querySelector('.text__hashtags');
  var hashtagsErrors = [];
  var isCommentFocused = false;
  var isHashtagsFocused = false;
  var isErrors = false;

  var openUploadPreview = function () {
    uploadPreview.classList.remove('hidden');
    window.effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onUploadPreviewEscPress);
  };

  var closeUploadPreview = function () {
    uploadPreview.classList.add('hidden');
    document.removeEventListener('keydown', onUploadPreviewEscPress);
  };

  var onUploadInputChange = function () {
    openUploadPreview();
  };

  var onUploadPreviewEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !isCommentFocused && !isHashtagsFocused) {
      closeUploadPreview();
    }
  };

  var checkHashtag = function (hashtag) {

    for (var i = 0; i < hashtag.length; i++) {
      if (hashtag.charAt(i + EXCLUDE_FIRST) === '#') {
        var nonSeparated = true;
      }
    }

    if (hashtag && hashtag.indexOf('#') !== 0) {
      hashtagsErrors.push('Хэш-тег ' + hashtag + ' должен начинается с символа # (решётка)');
    } else if (hashtag === '#') {
      hashtagsErrors.push('Хеш-тег не может состоять только из одной решётки');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagsErrors.push('Максимальная длина хэш-тега ' + hashtag + 'должна быть ' +
        MAX_HASHTAG_LENGTH + ' символов, включая решётку');
    } else if (nonSeparated) {
      hashtagsErrors.push('Хэш-теги ' + hashtag + ' должны разделяться пробелами');
    }

  };

  var checkHashtagsErrors = function () {

    var hashtags = hashtagsField.value.split(' ');

    if (hashtags.length > MAX_HASHTAGS_NUMBER) {
      hashtagsErrors.push('Нельзя указать больше ' + MAX_HASHTAGS_NUMBER + ' хэш-тегов');
    }

    for (var j = 0; j < hashtags.length; j++) {
      checkHashtag(hashtags[j]);

      if (hashtags.lastIndexOf(hashtags[j].toLowerCase()) !== j) {
        hashtagsErrors.push('Один и тот же хэш-тег (' + hashtags[j] + ') не может быть использован дважды');
      }

      if (hashtagsErrors.length > 0) {
        return;
      }
    }

  };

  var onSubmitClick = function () {
    hashtagsErrors.length = 0;
    checkHashtagsErrors();

    if (hashtagsErrors.length > 0) {
      hashtagsField.setCustomValidity(hashtagsErrors.join(', '));
      isErrors = true;
    } else {
      hashtagsField.setCustomValidity('');
      isErrors = false;
    }
  };

  var onSubmit = function (evt) {
    if (isErrors) {
      evt.preventDefault();
    }
  };

  uploadInput.addEventListener('change', function () {
    onUploadInputChange();
  });

  uploadCancelButton.addEventListener('click', function () {
    closeUploadPreview();
    uploadForm.reset();
    window.setStartEffects();
  });

  commentArea.addEventListener('focus', function () {
    isCommentFocused = true;
  });

  commentArea.addEventListener('focusout', function () {
    isCommentFocused = false;
  });

  hashtagsField.addEventListener('focus', function () {
    isHashtagsFocused = true;
  });

  hashtagsField.addEventListener('focusout', function () {
    isHashtagsFocused = false;
  });

  submitButton.addEventListener('click', function () {
    onSubmitClick();
  });

  uploadForm.addEventListener('submit', function (evt) {
    onSubmit(evt);
    window.upload(new FormData(uploadForm), function (response) {
      uploadForm.classList.add('hidden');
    });
    evt.preventDefault();
  });

  window.ESC_KEYCODE = ESC_KEYCODE;
})();
