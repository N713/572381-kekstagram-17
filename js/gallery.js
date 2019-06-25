'use strict';

(function () {

  var NUMBER_OF_PHOTOS = 25;

  var picturesSection = document.querySelector('.pictures');

  var addPicture = function (photoArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoArray.length; i++) {
      fragment.appendChild(window.renderPicture(window.getPhotoDataArray(NUMBER_OF_PHOTOS)[i]));
    }

    return fragment;
  };

  picturesSection.appendChild(addPicture(window.getPhotoDataArray(NUMBER_OF_PHOTOS)));

})();
