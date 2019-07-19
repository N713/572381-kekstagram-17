'use strict';

(function () {

  var SHIFT = 1;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var counter = 10;

  window.renderPicture = function (photoArrayElement) {
    var picture = pictureTemplate.cloneNode(true);
    window.picture = picture;

    picture.querySelector('.picture__img').src = photoArrayElement.url;
    picture.querySelector('.picture__comments').textContent = photoArrayElement.comments.length;
    picture.querySelector('.picture__likes').textContent = photoArrayElement.likes;

    picture.addEventListener('click', onPictureClick);

    return picture;
  };

  var onPictureClick = function (evt) {
    bigPicture.classList.remove('hidden');
    bigPictureCommentsCount.classList.add('hidden');

    openBigPicture(evt);
  };

  var getPhotoNumberFromSrc = function (evt) {
    var src = evt.target.src;
    var srcDash = src.lastIndexOf('/') + SHIFT;
    var srcDot = src.lastIndexOf('.');

    return Number(src.slice(srcDash, srcDot));
  };

  var cleanOldComments = function () {
    var comments = bigPicture.querySelectorAll('.social__comment');

    comments.forEach(function (comment) {
      comment.remove();
    });
  };

  var renderComments = function (photoNumber) {
    var photoComments = window.photos[photoNumber].comments;

    photoComments.forEach(function (photo) {
      var render = bigPictureComment.cloneNode(true);

      render.querySelector('.social__picture').src = photo.avatar;
      render.querySelector('.social__text').textContent = photo.message;

      bigPictureComments.appendChild(render);
    });

  };

  var hideComments = function () {
    var comments = document.querySelectorAll('.social__comments li');

    for (var i = 5; i < comments.length; i++) {
      comments[i].classList.add('visually-hidden');
    }
  };

  var openBigPicture = function (evt) {
    cleanOldComments();
    var photoNumber = getPhotoNumberFromSrc(evt) - SHIFT;

    bigPictureImage.src = window.photos[photoNumber].url;
    bigPictureLikes.textContent = window.photos[photoNumber].likes;
    bigPictureCommentsCount.textContent = window.photos[photoNumber].comments.length;
    bigPictureDescription.textContent = window.photos[photoNumber].description;

    renderComments(photoNumber);
    hideComments();
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    counter = 10;

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        bigPicture.classList.add('hidden');
      }
    });
  };

  var showNextComments = function () {
    var comments = document.querySelectorAll('.social__comments li');

    if (counter > comments.length) {
      counter = counter - (counter - comments.length);
    }

    for (var i = 5; i < counter; i++) {
      comments[i].classList.remove('visually-hidden');
    }

    counter += 5;
  };

  bigPictureCloseButton.addEventListener('click', function () {
    closeBigPicture();
  });

  commentsLoader.addEventListener('click', function () {
    showNextComments();
  });

  window.bigPicture = bigPicture;

})();
