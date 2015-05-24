tetris.game = (function() {
  "use strict";

  var sq = 31,
      count = 1,
      land = "#screen",
      rotate = 0,
      $itens ={};


  function createPiece() {
    

  }

  function bindEvents(){
     tetris.pieces.loadPieces().then(function (data) {
      $itens = data;
      createPiece();
    });


  }

  return {
    init: function() {
      bindEvents();
    },
  };
})();
tetris.game.init();
