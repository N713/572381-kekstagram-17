'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img').firstElementChild;
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  window.renderPicture = function (photoArrayElement, index) {
    var picture = pictureTemplate.cloneNode(true);
    window.picture = picture;

    picture.querySelector('.picture__img').src = photoArrayElement[index].url;
    picture.querySelector('.picture__comments').textContent = photoArrayElement[index].comments.length;
    picture.querySelector('.picture__likes').textContent = photoArrayElement[index].likes;

    return picture;
  };

  var renderComments = function () {

    var firstPhotoComments = window.photos[0].comments;

    firstPhotoComments.forEach(function (comment) {
      var render = bigPictureComment.cloneNode(true);

      render.querySelector('.social__picture').src = comment.avatar;
      render.querySelector('.social__text').textContent = comment.message;

      bigPictureComments.appendChild(render);
    });

  };

  var setFirstPhoto = function () {
    bigPictureImage.src = window.photos[0].url;
    bigPictureLikes.textContent = window.photos[0].likes;
    bigPictureCommentsCount.textContent = window.photos[0].comments.length;
    bigPictureDescription.textContent = window.photos[0].description;

    renderComments();
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureCommentsCount.classList.add('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        bigPicture.classList.add('hidden');
      }
    });

    setFirstPhoto();
  };

  window.picturesSection.addEventListener('click', function (evt) {
    openBigPicture(evt);
  });

  bigPictureCloseButton.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

})();
