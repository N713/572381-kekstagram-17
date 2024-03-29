'use strict';

(function () {

  var SHIFT = 1;
  var ENTER_KEYCODE = 13;
  var NUMBER_PHOTOS_TO_SHOW = 5;

  var limiter = 2 * NUMBER_PHOTOS_TO_SHOW;
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var commentsShowed = bigPicture.querySelector('.social__comment-number');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  window.renderPicture = function (photoArrayElement) {
    var picture = pictureTemplate.cloneNode(true);
    window.picture = picture;

    picture.querySelector('.picture__img').src = photoArrayElement.url;
    picture.querySelector('.picture__comments').textContent = photoArrayElement.comments.length;
    picture.querySelector('.picture__likes').textContent = photoArrayElement.likes;

    picture.addEventListener('click', onPictureClick);
    picture.addEventListener('keydown', onPictureEntPress);

    return picture;
  };

  var onPictureClick = function (evt) {
    var photoNumber = parseInt(evt.currentTarget.className.split(' ')[1], 10) - SHIFT;

    cleanOldComments();
    openPicture(photoNumber);
    renderComments(photoNumber);
    hideComments();
  };

  var onPictureEntPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPictureClick(evt);
    }
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
      render.querySelector('.social__picture').alt = photo.name;

      bigPictureComments.appendChild(render);
    });
  };

  var hideComments = function () {
    var comments = document.querySelectorAll('.social__comments li');

    for (var i = 5; i < comments.length; i++) {
      comments[i].classList.add('visually-hidden');
    }
  };

  var openPicture = function (pictureNumber) {
    commentsLoader.classList.toggle('hidden', false);
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    bigPictureImage.src = window.photos[pictureNumber].url;
    bigPictureLikes.textContent = window.photos[pictureNumber].likes;
    bigPictureCommentsCount.textContent = window.photos[pictureNumber].comments.length;
    bigPictureDescription.textContent = window.photos[pictureNumber].description;
    commentsShowed.textContent = NUMBER_PHOTOS_TO_SHOW + '';

    if (parseInt(bigPictureCommentsCount.textContent, 10) <= NUMBER_PHOTOS_TO_SHOW) {
      commentsShowed.textContent = bigPictureCommentsCount.textContent;
      commentsLoader.classList.add('hidden');
    }

    window.picturesSection.addEventListener('keydown', window.onPictureEscPress);
    document.addEventListener('keydown', onPictureEscPress);
  };

  var removeModalClassAndEscPress = function () {
    window.picturesSection.removeEventListener('keydown', window.onPictureEscPress);
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPictureEscPress);
  };

  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
      removeModalClassAndEscPress();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    limiter = 2 * NUMBER_PHOTOS_TO_SHOW;
    removeModalClassAndEscPress();
  };

  var showNextComments = function () {
    var comments = document.querySelectorAll('.social__comments li');
    commentsShowed.textContent = limiter + '';

    if (limiter >= comments.length) {
      limiter = limiter - (limiter - comments.length);
      commentsShowed.textContent = limiter + '';
    }

    for (var i = NUMBER_PHOTOS_TO_SHOW; i < limiter; i++) {
      comments[i].classList.remove('visually-hidden');
    }

    if (!comments[comments.length - 1].classList.contains('visually-hidden')) {
      commentsLoader.classList.add('hidden');
    }

    limiter += NUMBER_PHOTOS_TO_SHOW;
  };

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  commentsLoader.addEventListener('click', showNextComments);

  window.bigPicture = bigPicture;

})();
