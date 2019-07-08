'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var uploadPreview = window.uploadWindow.querySelector('.img-upload__overlay');
  var uploadInput = window.uploadWindow.querySelector('#upload-file');
  var uploadCancelButton = window.uploadWindow.querySelector('#upload-cancel');
  var commentArea = window.uploadWindow.querySelector('.text__description');
  var isCommentFocused = false;
  var uploadForm = window.uploadWindow.querySelector('.img-upload__form');

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
    if (evt.keyCode === ESC_KEYCODE && !isCommentFocused) {
      closeUploadPreview();
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

  window.ESC_KEYCODE = ESC_KEYCODE;
})();
