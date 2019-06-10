'use strict';

var NUMBER_OF_PHOTOS = 25;
var NUMBER_OF_USERS = 6;
var MIN_NUMBER_OF_LIKES = 15;
var MAX_NUMBER_OF_LIKES = 200;

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

var getRandomArrayElement = function (array) {
  var random = Math.floor(Math.random() * array.length);

  return array[random];
};

var makePhotoUrl = function (index) {

  return 'photos/' + index + '.jpg';
};

var makeUserAvatar = function (index) {

  return 'img/avatar-' + index + '.svg';
};

var getRandomNumber = function (minNumber, maxNumber) {

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var getCommentObject = function (index) {
  var commentData = {};

  commentData.avatar = makeUserAvatar(index);
  commentData.message = getRandomArrayElement(MESSAGES);
  commentData.name = getRandomArrayElement(NAMES);

  return commentData;
};

var getCommentsArray = function (numberOfUsers) {
  comments = [];

  for (var i = 1; i <= numberOfUsers; i++) {
    comments.push(getCommentObject(i));
  }

  return comments;
};

var comments = getCommentsArray(NUMBER_OF_USERS);

var getPhotoObject = function (index) {
  var photoData = {};

  photoData.url = makePhotoUrl(index);
  photoData.likes = getRandomNumber(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES);
  photoData.comment = getRandomArrayElement(comments).message;

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

picturesSection.appendChild(addPicture(getPhotoDataArray(NUMBER_OF_PHOTOS)));
