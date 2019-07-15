'use strict';

(function () {

  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var SCALE_STEP = 25;
  var WIDTH_OF_LEVEL_LINE = 450;

  var uploadWindow = document.querySelector('.img-upload');
  var previewImage = uploadWindow.querySelector('.img-upload__preview img')
  var scaleControl = uploadWindow.querySelector('.scale__control--value');
  var scaleControlBigger = uploadWindow.querySelector('.scale__control--bigger');
  var scaleControlSmaller = uploadWindow.querySelector('.scale__control--smaller');
  var effectLevel = uploadWindow.querySelector('.effect-level');
  var effectLevelPin = uploadWindow.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadWindow.querySelector('.effect-level__depth');
  var effectLevelInput = uploadWindow.querySelector('.effect-level__value');
  var effects = uploadWindow.querySelector('.effects__list');
  var previewEffectsControls = effects.querySelectorAll('.effects__radio');
  var valueMax = effectLevelInput.max;
  var percentFromLevelLineWidth = WIDTH_OF_LEVEL_LINE / valueMax;
  var currentPreviewInputValue = null;

  window.setStartEffects = function () {
    previewImage.classList.add('effects__preview--none');
    previewImage.style.filter = 'none';
    previewImage.style.transform = 'scale(1)';
  };

  var increaseScaleValue = function () {
    var scaleStep = (scaleControl.value === MAX_SCALE_VALUE + '%') ? 0 : SCALE_STEP;
    scaleControl.value = (parseInt(scaleControl.value, 10) + scaleStep) + '%';

    return scaleControl.value;
  };

  var decreaseScaleValue = function () {
    var scaleStep = (scaleControl.value === MIN_SCALE_VALUE + '%') ? 0 : SCALE_STEP;
    scaleControl.value = (parseInt(scaleControl.value, 10) - scaleStep) + '%';

    return scaleControl.value;
  };

  var changeScale = function () {
    var currentScale = parseInt(scaleControl.value, 10);
    previewImage.style.transform = 'scale( ' + (currentScale / 100) + ')';

    return previewImage.style.transform;
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
    previewImage.classList.add('effects__preview--' + currentControl);
    effectLevel.classList.toggle('hidden', currentControl === 'none');
    effectLevelPin.style.left = 100 + '%';
    effectLevelDepth.style.width = WIDTH_OF_LEVEL_LINE + 'px';
    effectLevelInput.value = valueMax;
    previewImage.style.filter = '';
  };

  var onPreviewControlClick = function (control) {

    if (currentPreviewInputValue !== control.value) {

      if (currentPreviewInputValue) {
        previewImage.classList.remove('effects__preview--' + currentPreviewInputValue);
      }

      currentPreviewInputValue = control.value;
      setControl(currentPreviewInputValue);
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
    effectsControls.forEach(function (effectControl) {
      addPreviewListener(effectControl);
    });
  };

  var switchFilter = function (currentFilter) {
    var filter = '';

    switch (currentFilter) {
      case 'chrome':
        filter = 'grayscale(' + effectLevelInput.value / 100 + ')';
        break;
      case 'sepia':
        filter = 'sepia(' + effectLevelInput.value / 100 + ')';
        break;
      case 'marvin':
        filter = 'invert(' + effectLevelInput.value + '%)';
        break;
      case 'phobos':
        filter = 'blur(' + (effectLevelInput.value / 100) * 3 + 'px)';
        break;
      case 'heat':
        filter = 'brightness(' + (effectLevelInput.value / 100 * 2 + 1) + ')';
        break;
    }

    previewImage.style.filter = filter;
  };

  scaleControlBigger.addEventListener('click', function () {
    onScaleBiggerClick();
  });

  scaleControlSmaller.addEventListener('click', function () {
    onScaleSmallerClick();
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
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
      var nextCoordinate = effectLevelPin.offsetLeft - shift.x;

      if (nextCoordinate >= WIDTH_OF_LEVEL_LINE) {
        pinCoordinate = WIDTH_OF_LEVEL_LINE + 'px';
      } else if (nextCoordinate <= 0) {
        pinCoordinate = 0 + 'px';
      } else {
        pinCoordinate = nextCoordinate + 'px';
      }

      effectLevelPin.style.left = pinCoordinate;
      effectLevelDepth.style.width = effectLevelPin.style.left;
      effectLevelInput.value = parseInt(effectLevelDepth.style.width, 10) / percentFromLevelLineWidth;

      switchFilter(currentPreviewInputValue);

    };

    var onEffectLevelPinMouseUp = function () {
      document.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onEffectLevelPinMouseMove);
    document.addEventListener('mouseup', onEffectLevelPinMouseUp);
  });

  addPreviewEffectListeners(previewEffectsControls);

  window.uploadWindow = uploadWindow;
  window.previewImage = previewImage;
  window.effectLevel = effectLevel;
})();
