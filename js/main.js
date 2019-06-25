'use strict';

(function () {

  window.constants = {
    NUMBER_OF_PHOTOS: 25,
    NUMBER_OF_USERS: 6,
    MIN_NUMBER_OF_LIKES: 15,
    MAX_NUMBER_OF_LIKES: 200,
    SHIFT: 1,
    ESC_KEYCODE: 27,
    MAX_SCALE_VALUE: 100,
    MIN_SCALE_VALUE: 25,
    SCALE_STEP: 25,
    WIDTH_OF_LEVEL_LINE: 450
  };

})();

(function () {

  window.arrays = {
    NAMES: [
      'Андрей',
      'Борис',
      'Виктор',
      'Гена',
      'Дима',
      'Евгений'
    ],

    MESSAGES: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
  };

})();

(function () {

  window.picturesSection = document.querySelector('.pictures');
  window.pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  window.uploadWindow = document.querySelector('.img-upload');
  window.uploadPreview = window.uploadWindow.querySelector('.img-upload__overlay');
  window.uploadInput = window.uploadWindow.querySelector('#upload-file');
  window.uploadCancelButton = window.uploadWindow.querySelector('#upload-cancel');
  window.scaleControl = window.uploadWindow.querySelector('.scale__control--value');
  window.scaleControlBigger = window.uploadWindow.querySelector('.scale__control--bigger');
  window.scaleControlSmaller = window.uploadWindow.querySelector('.scale__control--smaller');
  window.previewImage = window.uploadWindow.querySelector('.img-upload__preview').firstElementChild;
  window.effects = window.uploadWindow.querySelector('.effects__list');
  window.previewEffectsControls = window.effects.querySelectorAll('.effects__radio');
  window.effectLevel = window.uploadWindow.querySelector('.effect-level');
  window.currentPreviewInputValue = null;
  window.commentArea = window.uploadWindow.querySelector('.text__description');
  window.isCommentFocused = false;
  window.effectLevelPin = window.uploadWindow.querySelector('.effect-level__pin');
  window.effectLevelDepth = window.uploadWindow.querySelector('.effect-level__depth');
  window.effectLevelInput = window.uploadWindow.querySelector('.effect-level__value');
  window.uploadForm = window.uploadWindow.querySelector('.img-upload__form');
  window.valueMax = window.effectLevelInput.max;
  window.percentFromLevelLineWidth = window.constants.WIDTH_OF_LEVEL_LINE / window.valueMax;

})();

(function () {
  window.getRandomArrayElement = function (array) {
    var random = Math.floor(Math.random() * array.length);

    return array[random];
  };

  window.getPhotoUrl = function (index) {

    return 'photos/' + (index + window.constants.SHIFT) + '.jpg';
  };

  window.getUserAvatar = function (index) {

    return 'img/avatar-' + (index + window.constants.SHIFT) + '.svg';
  };

  window.getRandomNumber = function (minNumber, maxNumber) {

    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  };

  window.getCommentObject = function (index) {
    var commentData = {};

    commentData.avatar = getUserAvatar(index);
    commentData.message = getRandomArrayElement(window.arrays.MESSAGES);
    commentData.name = getRandomArrayElement(window.arrays.NAMES);

    return commentData;
  };

  window.getCommentsArray = function (numberOfUsers) {
    var comments = [];

    for (var i = 0; i < numberOfUsers; i++) {
      comments.push(getCommentObject(i));
    }

    return comments;
  };

  window.comments = getCommentsArray(window.constants.NUMBER_OF_USERS);

  window.getPhotoObject = function (index) {
    var photoData = {};

    photoData.url = getPhotoUrl(index);
    photoData.likes = getRandomNumber(window.constants.MIN_NUMBER_OF_LIKES, window.constants.MAX_NUMBER_OF_LIKES);
    photoData.comment = getRandomNumber(0, comments.length);

    return photoData;
  };

  window.getPhotoDataArray = function (numberOfElements) {
    var photos = [];

    for (var i = 0; i < numberOfElements; i++) {
      photos.push(getPhotoObject(i));
    }

    return photos;
  };

  window.renderPicture = function (photoObject) {
    var picture = window.pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photoObject.url;
    picture.querySelector('.picture__comments').textContent = photoObject.comment;
    picture.querySelector('.picture__likes').textContent = photoObject.likes;

    return picture;
  };

  window.addPicture = function (photoArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoArray.length; i++) {
      fragment.appendChild(renderPicture(getPhotoDataArray(window.constants.NUMBER_OF_PHOTOS)[i]));
    }

    return fragment;
  };
})();

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

uploadInput.addEventListener('change', function () {
  onUploadInputChange();
});

uploadCancelButton.addEventListener('click', function () {
  closeUploadPreview();
  uploadForm.reset();
  setStartEffects();
});

scaleControlBigger.addEventListener('click', function () {
  onScaleBiggerClick();
});

scaleControlSmaller.addEventListener('click', function () {
  onScaleSmallerClick();
});

commentArea.addEventListener('focus', function () {
  isCommentFocused = true;
});

commentArea.addEventListener('focusout', function () {
  isCommentFocused = false;
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

    if (nextCoordinate >= window.constants.WIDTH_OF_LEVEL_LINE) {
      pinCoordinate = window.constants.WIDTH_OF_LEVEL_LINE + 'px';
    } else if (nextCoordinate <= 0) {
      pinCoordinate = 0 + 'px';
    } else {
      pinCoordinate = nextCoordinate + 'px';
    }

    window.effectLevelPin.style.left = pinCoordinate;
    window.effectLevelDepth.style.width = effectLevelPin.style.left;
    window.effectLevelInput.value = parseInt(effectLevelDepth.style.width, 10) / percentFromLevelLineWidth;

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
picturesSection.appendChild(window.addPicture(getPhotoDataArray(window.constants.NUMBER_OF_PHOTOS)));
