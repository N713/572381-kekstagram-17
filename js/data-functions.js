'use strict';

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

    commentData.avatar = window.getUserAvatar(index);
    commentData.message = window.getRandomArrayElement(window.arrays.MESSAGES);
    commentData.name = window.getRandomArrayElement(window.arrays.NAMES);

    return commentData;
  };

  window.getCommentsArray = function (numberOfUsers) {
    var comments = [];

    for (var i = 0; i < numberOfUsers; i++) {
      comments.push(window.getCommentObject(i));
    }

    return comments;
  };

  window.comments = window.getCommentsArray(window.constants.NUMBER_OF_USERS);

  window.getPhotoObject = function (index) {
    var photoData = {};

    photoData.url = window.getPhotoUrl(index);
    photoData.likes = window.getRandomNumber(window.constants.MIN_NUMBER_OF_LIKES, window.constants.MAX_NUMBER_OF_LIKES);
    photoData.comment = window.getRandomNumber(0, window.comments.length);

    return photoData;
  };

  window.getPhotoDataArray = function (numberOfElements) {
    var photos = [];

    for (var i = 0; i < numberOfElements; i++) {
      photos.push(window.getPhotoObject(i));
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
      fragment.appendChild(window.renderPicture(window.getPhotoDataArray(window.constants.NUMBER_OF_PHOTOS)[i]));
    }

    return fragment;
  };
})();
