'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesSection = document.querySelector('.pictures');

  var loadPhotoArray = function (data) {
    picturesSection.appendChild(window.addPicture(data));
  };

  window.pictureTemplate = pictureTemplate;

  window.load(loadPhotoArray, window.onErrorHappens);

})();
