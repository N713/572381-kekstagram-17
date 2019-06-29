'use strict';

(function () {

  window.addPicture = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.renderPicture(photos, i));
    }

    return fragment;
  };

})();
