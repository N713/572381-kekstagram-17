'use strict';

(function () {

  var alertError = function (message) {

    alert(message);
  };

  var loadPhotoArray = function (data) {

    console.log(data);
  };


  window.load(loadPhotoArray, alertError);

})();
