'use strict';

(function () {

  var SHIFT = 1;
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

  window.getPhotoDataArray = function (numberOfElements) {
    var photos = [];

    for (var i = 0; i < numberOfElements; i++) {
      photos.push(getPhotoObject(i));
    }

    return photos;
  };

})();
