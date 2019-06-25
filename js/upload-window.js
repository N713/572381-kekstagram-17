'use strict';

(function () {
  var onUploadInputChange = function () {
    openUploadPreview();
  };

  var onUploadPreviewEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE && !window.isCommentFocused) {
      closeUploadPreview();
    }
  };

  var setStartEffects = function () {
    window.previewImage.classList.add('effects__preview--none');
    window.previewImage.style.filter = 'none';
    window.previewImage.style.transform = 'scale(1)';
  };

  var openUploadPreview = function () {
    window.uploadPreview.classList.remove('hidden');
    window.effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onUploadPreviewEscPress);
  };

  var closeUploadPreview = function () {
    window.uploadPreview.classList.add('hidden');
    document.removeEventListener('keydown', onUploadPreviewEscPress);
  };

  var increaseScaleValue = function () {
    var scaleStep = (window.scaleControl.value === window.constants.MAX_SCALE_VALUE + '%') ? 0 : window.constants.SCALE_STEP;
    window.scaleControl.value = (parseInt(window.scaleControl.value, 10) + scaleStep) + '%';

    return window.scaleControl.value;
  };

  var decreaseScaleValue = function () {
    var scaleStep = (window.scaleControl.value === window.constants.MIN_SCALE_VALUE + '%') ? 0 : window.constants.SCALE_STEP;
    window.scaleControl.value = (parseInt(window.scaleControl.value, 10) - scaleStep) + '%';

    return window.scaleControl.value;
  };

  var changeScale = function () {
    var currentScale = parseInt(window.scaleControl.value, 10);
    window.previewImage.style.transform = 'scale( ' + (currentScale / 100) + ')';

    return window.previewImage.style.transform;
  };

  var onScaleBiggerClick = function () {
    increaseScaleValue();
    changeScale();
  };

  var onScaleSmallerClick = function () {
    decreaseScaleValue();
    changeScale();
  };

  var setControl = function (currentControl) {
    window.previewImage.classList.add('effects__preview--' + currentControl);
    window.effectLevel.classList.toggle('hidden', currentControl === 'none');
    window.effectLevelPin.style.left = 100 + '%';
    window.effectLevelDepth.style.width = window.constants.WIDTH_OF_LEVEL_LINE + 'px';
    window.effectLevelInput.value = window.valueMax;
    window.previewImage.style.filter = '';
  };

  var onPreviewControlClick = function (control) {

    if (window.currentPreviewInputValue !== control.value) {

      if (window.currentPreviewInputValue) {
        window.previewImage.classList.remove('effects__preview--' + window.currentPreviewInputValue);
      }

      window.currentPreviewInputValue = control.value;
      setControl(window.currentPreviewInputValue);
    } else {
      setControl(control.value);
    }
  };

  var addPreviewListener = function (effectControl) {
    effectControl.addEventListener('click', function () {
      onPreviewControlClick(effectControl);
    });
  };

  var addPreviewEffectListeners = function (effectsControls) {
    for (var i = 0; i < effectsControls.length; i++) {
      addPreviewListener(effectsControls[i]);
    }
  };

  var switchFilter = function (currentFilter) {
    var filter = '';

    switch (currentFilter) {
      case 'chrome':
        filter = 'grayscale(' + window.effectLevelInput.value / 100 + ')';
        break;
      case 'sepia':
        filter = 'sepia(' + window.effectLevelInput.value / 100 + ')';
        break;
      case 'marvin':
        filter = 'invert(' + window.effectLevelInput.value + '%)';
        break;
      case 'phobos':
        filter = 'blur(' + (window.effectLevelInput.value / 100) * 3 + 'px)';
        break;
      case 'heat':
        filter = 'brightness(' + (window.effectLevelInput.value / 100) * 3 + ')';
        break;
    }

    window.previewImage.style.filter = filter;
  };

  window.uploadInput.addEventListener('change', function () {
    onUploadInputChange();
  });

  window.uploadCancelButton.addEventListener('click', function () {
    closeUploadPreview();
    window.uploadForm.reset();
    setStartEffects();
  });

  window.scaleControlBigger.addEventListener('click', function () {
    onScaleBiggerClick();
  });

  window.scaleControlSmaller.addEventListener('click', function () {
    onScaleSmallerClick();
  });

  window.commentArea.addEventListener('focus', function () {
    window.isCommentFocused = true;
  });

  window.commentArea.addEventListener('focusout', function () {
    window.isCommentFocused = false;
  });

  window.effectLevelPin.addEventListener('mousedown', function (evt) {
    var startCoord = {
      x: evt.clientX,
    };

    var onEffectLevelPinMouseMove = function (moveEvt) {
      var shift = {
        x: startCoord.x - moveEvt.clientX
      };

      startCoord = {
        x: moveEvt.clientX
      };

      var pinCoordinate;
      var nextCoordinate = window.effectLevelPin.offsetLeft - shift.x;

      if (nextCoordinate >= window.constants.WIDTH_OF_LEVEL_LINE) {
        pinCoordinate = window.constants.WIDTH_OF_LEVEL_LINE + 'px';
      } else if (nextCoordinate <= 0) {
        pinCoordinate = 0 + 'px';
      } else {
        pinCoordinate = nextCoordinate + 'px';
      }

      window.effectLevelPin.style.left = pinCoordinate;
      window.effectLevelDepth.style.width = window.effectLevelPin.style.left;
      window.effectLevelInput.value = parseInt(window.effectLevelDepth.style.width, 10) / window.percentFromLevelLineWidth;

      switchFilter(window.currentPreviewInputValue);

    };

    var onEffectLevelPinMouseUp = function () {
      document.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onEffectLevelPinMouseMove);
    document.addEventListener('mouseup', onEffectLevelPinMouseUp);
  });

  addPreviewEffectListeners(window.previewEffectsControls);
  window.picturesSection.appendChild(window.addPicture(window.getPhotoDataArray(window.constants.NUMBER_OF_PHOTOS)));
})();
