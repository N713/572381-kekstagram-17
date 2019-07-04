'use strict';

(function () {

  window.onErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.height = '30px';
    node.style.borderBottom = '4px solid yellow';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
