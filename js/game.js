t.game = (function() {
  "use strict";

  var sq = 30,
      count = 1,
      land = "#screen",
      rotate = 0,
      $itens ={},
      $feedback = $(t.FEEDBACK);


  // MSG on the STAGE
  function feedback(text){
    if(text){
      $feedback.html(text).fadeIn(300);
    } else {
      $feedback.fadeOut(300);
    }
  }

  // Score
  function score(q){
    if(q == 400){
      q = q*2
    }
    t.SCORE += q;

    $(".qtd").html(t.SCORE);

  }


  function bindEvents(){
    //  t.pieces.loadPieces().then(function (data) {
    //   $itens = data;
    //   createPiece();
    // });
    t.pieces.loadPieces();

    $(document).on("click", ".start-game", function (){

      feedback("START");
      $("body").trigger("startGame");

      setTimeout(function(){
        feedback(false);
        t.pieces.createPiece();
        t.pieces.addToStage();
      }, 300);
      //console.log("start");
      //t.pieces.loadPieces();


    });

    $(document).on("click", ".add-piece", function (){
      t.pieces.createPiece();
    });

    $(document).on("click", ".move-to-stage", function (){
      t.pieces.addToStage();
    });

    $(document).on("click", ".new-piece", function (){
      t.pieces.createPiece($(this).data("type"));

    });
  }

  return {
    init: function() {
      bindEvents();
    },
    feedback: feedback,
    score: score
  };
})();
t.game.init();
