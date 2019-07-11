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

  var setStartEffects = function () {
    window.previewImage.classList.add('effects__preview--none');
    window.previewImage.style.filter = 'none';
    window.previewImage.style.transform = 'scale(1)';
  };

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

  var checkHashtagsErrors = function () {

    var hashtags = hashtagsField.value.split(' ');

    if (hashtags.length > MAX_HASHTAGS_NUMBER) {
      hashtagsErrors.push('Нельзя указать больше ' + MAX_HASHTAGS_NUMBER + ' хэш-тегов');
    }

    hashtags.forEach(function (hashtag) {

      if (hashtag !== '' && hashtag.charAt(0) !== '#') {
        hashtagsErrors.push('Хэш-тег ' + hashtag + ' должен начинается с символа # (решётка)');
      }

      if (hashtag === '#') {
        hashtagsErrors.push('Хеш-тег не может состоять только из одной решётки');
      }

      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagsErrors.push('Максимальная длина хэш-тега ' + hashtag + 'должна быть ' +
          MAX_HASHTAG_LENGTH + ' символов, включая решётку');
      }

      for (var i = 0; i < hashtag.length; i++) {
        if (hashtag.charAt(i + EXCLUDE_FIRST) === '#') {
          var nonSeparated = true;
        }
      }

      if (nonSeparated) {
        hashtagsErrors.push('Хэш-теги ' + hashtag + ' должны разделяться пробелами');
      }

    });

    for (var j = 0; j < hashtags.length; j++) {
      if (hashtags.lastIndexOf(hashtags[j].toLowerCase()) !== j) {
        hashtagsErrors.push('Один и тот же хэш-тег (' + hashtags[j] + ') не может быть использован дважды');
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
    setStartEffects();
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
  });

  window.ESC_KEYCODE = ESC_KEYCODE;
})();
