t.keys = (function() {
  "use strict";

  var sq = t.SQ,
      stage = t.STAGE_WIDTH;


  /*
   * Verify with reach max right position
   */
  function maxRight(piece){
    var pos = piece.position(),
        maxRight = pos.left + sq;


    // Verify pos > screen width
    piece.children().each(function(){
      if( maxRight < pos.left + $(this).position().left + sq ) {
        maxRight = pos.left + $(this).position().left + sq;
      }
    });

    return maxRight;
  }

  function maxBottom(piece){
    var pos = piece.position(),
        maxDown = pos.top + sq;

    // Verify pos > screen width
    piece.children().each(function(){
      if( maxDown < pos.top + $(this).position().top + sq ) {
        maxDown = pos.top + $(this).position().top + sq;
      }
    });

    return maxDown;
  }

  function maxRotate(piece, pos){
    var position = piece.position(),
        maxTop   = position.top,
        maxLeft  = position.left;

    $(pos).each(function (i, el) {
      maxLeft = (maxLeft < position.left + el.left * sq) ? position.left + el.left * sq : maxLeft;
      maxTop  = (maxTop < position.top + el.top * sq) ? position.top + el.top * sq : maxTop;
    });

    return { "top": maxTop, "left" : maxLeft };
  }
  /*
   * Rotate Piece
   */
  function rotatePiece(piece){
    var positions = piece.piecePos;

    if(positions[++piece.pieceRotate] === undefined){ piece.pieceRotate=0; }
    var pos    = positions[piece.pieceRotate],
        maxPos = maxRotate(piece, pos);

    // Verify if is possible to rotate
    if ( maxPos.left < t.STAGE_WIDTH && maxPos.top < t.STAGE_HEIGHT ) {
      piece.children().each(function(a, i){
        $(this).css({top: pos[a].top*sq, left: pos[a].left*sq });
      });
    }


  }

  /*
   * Move Fast Down
   */
  function moveDown(piece){
    var pos = piece.position();
    if( maxBottom(piece) + sq <= t.STAGE_HEIGHT  ){
      piece.css({ top: pos.top+sq, left: pos.left});
      //piece.stop().animate({ top: '+='+sq}, 300);
      return false;
    }else{
      return true;
    }
  }

  /*
   * Move to Left
   */
  function moveLeft(piece){
    var pos = piece.position();

    if(pos.left-sq >= 0){
      piece.css({ left: '-=' + sq })
    }
  }

  /*
   * Rotate Piece
   */
  function moveRight(piece){
    var pos = piece.position(),
        max = maxRight(piece);

    if( max  < t.STAGE_WIDTH ){
      piece.css({ top: pos.top, left: pos.left+sq});
    }

  }

  // Teclas
  function keymap() {
    $(document).on("keydown",function(e) {
      var piece = t.pieces.stagePiece();

      if(e.keyCode == 40){ // Down
        console.log("Down");
        moveDown(piece);
      }

      if(e.keyCode == 37){ // left
        console.log("Left");
        moveLeft(piece);
      }

      if(e.keyCode == 39){ // Right
        console.log("Right");
        moveRight(piece);
      }

      if(e.keyCode == 38){ // up
        console.log("Up");
        rotatePiece(piece);
      }

      if(e.keyCode == 32){ // space
        console.log("Space");
        rotatePiece(piece);
      }

      if(e.keyCode == 65){ // A
        console.log("A");
        t.pieces.createPiece();
      }

      if(e.keyCode == 90){ // Z
        console.log("Z");
        t.pieces.addToStage();
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
