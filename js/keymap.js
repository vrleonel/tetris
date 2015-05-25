t.keys = (function() {
  "use strict";

  var sq = t.SQ;

  function rotatePiece(piece){
    var positions = piece.piecePos;

    console.log(piece.pieceRotate);
    console.log(piece.piecePos);

    if(positions[++piece.pieceRotate] === undefined){ piece.pieceRotate=0; }
    var pos = positions[piece.pieceRotate];
    piece.children().each(function(a, i){
      $(this).css({top: pos[a].top*sq, left: pos[a].left*sq });
    });
  }

  function move_down(piece){
    var pos = piece.position();
    piece.stop().css({ top: pos.top+sq, left: pos.left});

  }
  function move_left(piece){
    var pos = piece.position();
    piece.css({ top: pos.top, left: pos.left-sq});
  }
  function move_right(piece){
    var pos = piece.position();
    piece.css({ top: pos.top, left: pos.left+sq});
  }

  // Teclas
  function keymap() {
    $(document).on("keydown",function(e) {
      var piece = t.pieces.stagePiece();
      console.log(piece.position());

      if(e.keyCode == 40){ // Down
        console.log("Down");
        move_down(piece);
      }

      if(e.keyCode == 37){ // left
        console.log("Left");
        move_left(piece);
      }

      if(e.keyCode == 39){ // Right
        console.log("Right");
        move_right(piece);
      }

      if(e.keyCode == 38){ // up
        console.log("Up");
        rotatePiece(piece);
      }

      if(e.keyCode == 32){ // space
        console.log("Space");
        rotatePiece(piece);
      }

    });
  }


  return {
    init: function() {
      keymap();
    }
  };
})();
t.keys.init();
