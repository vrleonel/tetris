t.keys = (function() {
  "use strict";

  var sq = t.SQ,
      stage = t.STAGE_WIDTH;


  function maxRotate(piece, pos){
    var position = piece.position(),
        pass     = true;

    $(pos).each(function (i, el) {
      var tetra =  {"left" : position.left + el.left * t.SQ, "top" : position.top + el.top * t.SQ};

      if ( tetra.left >= 0 && tetra.left < t.STAGE_WIDTH && tetra.top < t.STAGE_HEIGHT ) {

        $.each(t.FIELD, function (idx2, val2) {

          if(val2.top == tetra.top && val2.left == tetra.left ){
            return pass = false;
          }

        });

      } else {  return pass = false; }
    });

    return pass;
  }
  /*
   * Rotate Piece
   */
  function rotatePiece(piece){
    var positions = piece.piecePos,
        pass = false,
        stateRotate = piece.pieceRotate;

    if(positions[++stateRotate] === undefined){ stateRotate=0; }

    var pos    = positions[stateRotate],
        pass   = maxRotate(piece, pos);

    // Verify if is possible to rotate
    if ( pass === true ) {
      piece.pieceRotate = stateRotate;
      piece.children().each(function(a, i){
        $(this).css({top: pos[a].top*sq, left: pos[a].left*sq });
      });
    }

  }

  /*********************************
   * Verify if the piece can cross
   *********************************/
  function cross(piece, future){
    var pos = piece.position(),
        pass = true;

    piece.children().each( function (idx1, val1) {
      var tetra =  $(val1).position();

      tetra.left += pos.left + future.left;
      tetra.top += pos.top + future.top;

      if(tetra.left >= 0 && tetra.left < t.STAGE_WIDTH && tetra.top < t.STAGE_HEIGHT  ){

        $.each(t.FIELD, function (idx2, val2) {
          if(val2.top == tetra.top && val2.left == tetra.left ){
            return pass = false;
          }
        });
      } else {
        return pass = false;
      }
    });

    return pass;
  }

  /*
   * Move Fast Down
   */
  function moveDown(piece){
    var pos = piece.position(),
        pass = cross(piece, { top: t.SQ, left: 0 });

    if( pass === true  ){
      piece.css({ top: "+=" + t.SQ});
      return false;
    }else{
      return true;
    }
  }


  /*
   * Move to Left
   */
  function moveLeft(piece){
    var pos = piece.position(),
        pass = cross(piece, { top: 0, left: -t.SQ });

    if( pass === true){
      piece.css({ left: '-=' + sq })
    }
  }

  /*
   * Rotate Piece
   */
  function moveRight(piece){
    var pos = piece.position(),
        pass = cross(piece, { top: 0, left: t.SQ });

    if( pass === true ){
      piece.css({ left: "+=" + t.SQ});
    }

  }

  // Teclas
  function keymap() {
    $(document).on("keydown",function(e) {
      var piece = t.pieces.stagePiece();

      if(t.PAUSE === false){

        if(e.keyCode == 40){ // Down
          if(moveDown(piece) === false){
            t.game.score(1);
          }

        }

        if(e.keyCode == 37){ // left
          moveLeft(piece);
        }

        if(e.keyCode == 39){ // Right
          moveRight(piece);
        }

        if(e.keyCode == 38){ // up
          if(t.PAUSE === false){
            rotatePiece(piece);
          }
        }

        if(e.keyCode == 32){ // space
          if(t.PAUSE === false){
            rotatePiece(piece);
          }
        }

      } // paused

      if(e.keyCode == 65){ // A
        t.pieces.createPiece();
      }

      if(e.keyCode == 90){ // Z
        t.pieces.addToStage();
      }

      if(e.keyCode == 77){ // M
        $("body").trigger("pauseBgMusic", 1);
      }

      if(e.keyCode == 80 ){ // P -> Pause
        if(t.PAUSE  === false ){
          clearInterval(t.INTERVAL);
          t.PAUSE = true;
        } else {
          t.pieces.drop();
          t.PAUSE = false;
        }
      }

    });
  }


  return {
    init: function() {
      keymap();
    },
    moveDown: moveDown
  };
})();
t.keys.init();
