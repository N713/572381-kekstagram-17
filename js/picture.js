'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.renderPicture = function (photoObject) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photoObject.url;
    picture.querySelector('.picture__comments').textContent = photoObject.comment;
    picture.querySelector('.picture__likes').textContent = photoObject.likes;

    return picture;
  };

})();
