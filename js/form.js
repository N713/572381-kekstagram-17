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
    document.addEventListener('keydown', window.onUploadPreviewEscPress);
    uploadCancelButton.addEventListener('click', closeUploadPreview);
    submitButton.addEventListener('click', onSubmitClick);
    uploadForm.addEventListener('submit', window.onSubmit);
  };

  var closeUploadPreview = function () {
    uploadForm.reset();
    uploadPreview.classList.add('hidden');
    document.removeEventListener('keydown', window.onUploadPreviewEscPress);
    uploadForm.removeEventListener('submit', window.onSubmit);
  };

  var onUploadInputChange = function () {
    window.setStartEffects();
    openUploadPreview();
  };

  window.onUploadPreviewEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !isCommentFocused && !isHashtagsFocused) {
      closeUploadPreview();
    }

    document.removeEventListener('keydown', window.onUploadPreviewEscPress);
    uploadForm.removeEventListener('submit', window.onSubmit);
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
      hashtagsField.style.outline = '4px solid red';
      isErrors = true;
    } else {
      hashtagsField.setCustomValidity('');
      hashtagsField.style.outline = '';
      isErrors = false;
    }
  };

  window.onSubmit = function (evt) {
    if (isErrors) {
      evt.preventDefault();
    }

    window.upload(new FormData(uploadForm), function () {
      uploadPreview.classList.add('hidden');
      resetFormValues();
    });

    evt.preventDefault();
  };

  var resetFormValues = function () {
    window.setStartEffects();
    window.scaleControl.value = '100';
    window.effectLevelInput.value = 100;
    commentArea.value = '';
    hashtagsField.value = '';
    uploadInput.value = '';
  };

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

  uploadInput.addEventListener('change', onUploadInputChange);

  window.uploadPreview = uploadPreview;
  window.uploadForm = uploadForm;
  window.ESC_KEYCODE = ESC_KEYCODE;
})();
