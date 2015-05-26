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

  /*
   * Rotate Piece
   */
  function rotatePiece(piece){
    var positions = piece.piecePos;

    if(positions[++piece.pieceRotate] === undefined){ piece.pieceRotate=0; }
    var pos = positions[piece.pieceRotate];

    piece.children().each(function(a, i){
      $(this).css({top: pos[a].top*sq, left: pos[a].left*sq });
    });

    if( maxRight(piece)  > t.STAGE_WIDTH ){
      moveLeft(piece);
    }

    if(maxBottom(piece) > t.STAGE_HEIGHT ){
      piece.css({ top: "-="+sq});
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
    }else{
      return true;
    }

    console.log(maxBottom(piece));
  }

  /*
   * Move to Left
   */
  function moveLeft(piece){
    var pos = piece.position(),
        leftPos = 0;

    if(pos.left-sq >= 0){
      leftPos = pos.left-sq;
    }
    piece.css({ top: pos.top, left: leftPos});
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
