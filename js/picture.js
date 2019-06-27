'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.renderPicture = function (photoArrayElement) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photoArrayElement[i].url;
    picture.querySelector('.picture__comments').textContent = photoArrayElement.comments.length;
    picture.querySelector('.picture__likes').textContent = photoArrayElement[i].likes;

    return picture;
  };

})();
