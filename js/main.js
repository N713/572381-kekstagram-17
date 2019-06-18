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
var effectsPreviews = effects.querySelectorAll('.effects__preview');
var effectLevel = uploadWindow.querySelector('.effect-level');

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
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadPreview();
  }
};

var openUploadPreview = function () {
  uploadPreview.classList.remove('hidden');
  document.addEventListener('keydown', onUploadPreviewEscPress);
};

var closeUploadPreview = function () {
  uploadPreview.classList.add('hidden');
  document.removeEventListener('keydown', onUploadPreviewEscPress);
  uploadInput.value = '';
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

var onEffectPreviewClick = function (element) {
  element.addEventListener('click', function () {
    var currentEffect = previewImage.classList;
    var effect = element.classList[1];

    if (currentEffect !== effect) {
      currentEffect.remove(currentEffect[0]);
      currentEffect.add(effect);
    }

    if (currentEffect[0] !== 'effects__preview--none') {
      effectLevel.classList.toggle('hidden', false);
    } else {
      effectLevel.classList.toggle('hidden', true);
    }

  });
};

var addPreviewEffectListener = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    onEffectPreviewClick(elements[i]);
  }
};

uploadInput.addEventListener('change', function () {
  onUploadInputChange();
});

uploadCancelButton.addEventListener('click', function () {
  closeUploadPreview();
});

scaleControlBigger.addEventListener('click', function () {
  onScaleBiggerClick();
});

scaleControlSmaller.addEventListener('click', function () {
  onScaleSmallerClick();
});

addPreviewEffectListener(effectsPreviews);
picturesSection.appendChild(addPicture(getPhotoDataArray(NUMBER_OF_PHOTOS)));
