t.game = (function() {
  "use strict";

  var sq = 31,
      count = 1,
      land = "#screen",
      rotate = 0,
      $itens ={};


  function createPiece() {


  }

  function bindEvents(){
    //  t.pieces.loadPieces().then(function (data) {
    //   $itens = data;
    //   createPiece();
    // });
    t.pieces.loadPieces();
    
    $(document).on("click", ".start-game", function (){
      //console.log("start");
      t.pieces.loadPieces();

    });

    $(document).on("click", ".add-piece", function (){
      t.pieces.createPiece();
    });

    $(document).on("click", ".move-to-stage", function (){
      t.pieces.addToStage();
    });

  }

  return {
    init: function() {
      bindEvents();
    },
  };
})();
t.game.init();
