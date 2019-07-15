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
    commentsLoader.classList.add('hidden');
    bigPictureCommentsCount.classList.add('hidden');

    openBigPicture(evt);
  };

  var getPhotoNumberFromSrc = function (evt) {
    var src = evt.target.src;
    var srcDash = src.lastIndexOf('/') + SHIFT;
    var srcDot = src.lastIndexOf('.');

    return Number(src.slice(srcDash, srcDot));
  };

  var openBigPicture = function (evt) {
    var photoNumber = getPhotoNumberFromSrc(evt) - SHIFT;

    bigPictureImage.src = window.photos[photoNumber].url;
    bigPictureLikes.textContent = window.photos[photoNumber].likes;
    bigPictureCommentsCount.textContent = window.photos[photoNumber].comments.length;
    bigPictureDescription.textContent = window.photos[photoNumber].description;

    var photoComments = window.photos[photoNumber].comments;

    photoComments.forEach(function (photo) {

      var render = bigPictureComment.cloneNode(true);

      render.querySelector('.social__picture').src = photo.avatar;
      render.querySelector('.social__text').textContent = photo.message;

      bigPictureComments.appendChild(render);
    });
  };

  bigPictureCloseButton.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  window.bigPicture = bigPicture;

})();
