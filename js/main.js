'use strict';

var NUMBER_OF_PHOTOS = 25;
var MIN_NUMBER_OF_LIKES = 15;
var MAX_NUMBER_OF_LIKES = 200;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var pictures = document.querySelector('.pictures');
var randomPictureTemplate = document.querySelector('#picture').
  content.querySelector('.picture');

var getRandomArrayElement = function (array) {
  var random = Math.floor(Math.random() * array.length);

  return array[random];
};

var makePhotoUrl = function (index) {

  return 'photos/' + index + '.jpg';
};

var getRandomNumber = function (minNumber, maxNumber) {

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var getPhotoObject = function (index) {
  var photoData = {};

  photoData.url = makePhotoUrl(index);
  photoData.likes = getRandomNumber(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES);
  photoData.comment = getRandomArrayElement(COMMENTS);

  return photoData;
};

var getPhotoDataArray = function (numberOfElements) {
  var photos = [];

  for (var i = 1; i <= numberOfElements; i++) {
    photos.push(getPhotoObject(i));
  }

  return photos;
};

var renderPicture = function (photoObject) {
  var randomPicture = randomPictureTemplate.cloneNode(true);

  randomPicture.querySelector('.picture__img').src = photoObject.url;
  randomPicture.querySelector('.picture__comments').textContent = photoObject.comment;
  randomPicture.querySelector('.picture__likes').textContent = photoObject.likes;

  return randomPicture;
};

var addPicture = function (photoArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoArray.length; i++) {
    fragment.appendChild(renderPicture(getPhotoDataArray(NUMBER_OF_PHOTOS)[i]));
  }

  return fragment;
};

pictures.appendChild(addPicture(getPhotoDataArray(NUMBER_OF_PHOTOS)));
