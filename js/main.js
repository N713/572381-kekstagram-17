'use strict';

var NUMBER_OF_PHOTOS = 25;
var NUMBER_OF_USERS = 6;
var MIN_NUMBER_OF_LIKES = 15;
var MAX_NUMBER_OF_LIKES = 200;
var SHIFT = 1;
var ESC_KEYCODE = 27;
var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var SCALE_STEP = 25;
var WIDTH_OF_LEVEL_LINE = 450;

var NAMES = [
  'Андрей',
  'Борис',
  'Виктор',
  'Гена',
  'Дима',
  'Евгений'
];

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var picturesSection = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').
  content.querySelector('.picture');
var uploadWindow = document.querySelector('.img-upload');
var uploadPreview = uploadWindow.querySelector('.img-upload__overlay');
var uploadInput = uploadWindow.querySelector('#upload-file');
var uploadCancelButton = uploadWindow.querySelector('#upload-cancel');
var scaleControl = uploadWindow.querySelector('.scale__control--value');
var scaleControlBigger = uploadWindow.querySelector('.scale__control--bigger');
var scaleControlSmaller = uploadWindow.querySelector('.scale__control--smaller');
var previewImage = uploadWindow.querySelector('.img-upload__preview').firstElementChild;
var effects = uploadWindow.querySelector('.effects__list');
var previewEffectsControls = effects.querySelectorAll('.effects__radio');
var effectLevel = uploadWindow.querySelector('.effect-level');
var currentPreviewInputValue = null;
var commentArea = uploadWindow.querySelector('.text__description');
var isCommentFocused = false;
var effectLevelPin = uploadWindow.querySelector('.effect-level__pin');
var effectLevelDepth = uploadWindow.querySelector('.effect-level__depth');
var effectLevelInput = uploadWindow.querySelector('.effect-level__value');
var uploadForm = uploadWindow.querySelector('.img-upload__form');
var valueMax = effectLevelInput.max;
var percentFromLevelLineWidth = WIDTH_OF_LEVEL_LINE / valueMax;

var getRandomArrayElement = function (array) {
  var random = Math.floor(Math.random() * array.length);

  return array[random];
};

var getPhotoUrl = function (index) {

  return 'photos/' + (index + SHIFT) + '.jpg';
};

var getUserAvatar = function (index) {

  return 'img/avatar-' + (index + SHIFT) + '.svg';
};

var getRandomNumber = function (minNumber, maxNumber) {

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var getCommentObject = function (index) {
  var commentData = {};

  commentData.avatar = getUserAvatar(index);
  commentData.message = getRandomArrayElement(MESSAGES);
  commentData.name = getRandomArrayElement(NAMES);

  return commentData;
};

var getCommentsArray = function (numberOfUsers) {
  var comments = [];

  for (var i = 0; i < numberOfUsers; i++) {
    comments.push(getCommentObject(i));
  }

  return comments;
};

var comments = getCommentsArray(NUMBER_OF_USERS);

var getPhotoObject = function (index) {
  var photoData = {};

  photoData.url = getPhotoUrl(index);
  photoData.likes = getRandomNumber(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES);
  photoData.comment = getRandomNumber(0, comments.length);

  return photoData;
};

var getPhotoDataArray = function (numberOfElements) {
  var photos = [];

  for (var i = 0; i < numberOfElements; i++) {
    photos.push(getPhotoObject(i));
  }

  return photos;
};

var renderPicture = function (photoObject) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = photoObject.url;
  picture.querySelector('.picture__comments').textContent = photoObject.comment;
  picture.querySelector('.picture__likes').textContent = photoObject.likes;

  return picture;
};

var addPicture = function (photoArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoArray.length; i++) {
    fragment.appendChild(renderPicture(getPhotoDataArray(NUMBER_OF_PHOTOS)[i]));
  }

  return fragment;
};

var onUploadInputChange = function () {
  openUploadPreview();
};

var onUploadPreviewEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !isCommentFocused) {
    closeUploadPreview();
  }
};

var setStartEffects = function () {
  previewImage.classList.add('effects__preview--none');
  previewImage.style.filter = 'none';
  previewImage.style.transform = 'scale(1)';
};

var openUploadPreview = function () {
  uploadPreview.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onUploadPreviewEscPress);
};

var closeUploadPreview = function () {
  uploadPreview.classList.add('hidden');
  document.removeEventListener('keydown', onUploadPreviewEscPress);
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
  for (var i = 0; i < effectsControls.length; i++) {
    addPreviewListener(effectsControls[i]);
  }
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
      filter = 'brightness(' + (effectLevelInput.value / 100) * 3 + ')';
      break;
  }

  previewImage.style.filter = filter;
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
picturesSection.appendChild(addPicture(getPhotoDataArray(NUMBER_OF_PHOTOS)));
