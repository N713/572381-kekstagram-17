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
