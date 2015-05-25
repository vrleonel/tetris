t.pieces = (function() {
  "use strict";

  var $itens = {},
      type   = ["I", "O", "L", "J", "Z", "S", "T"],
      color  = ["red", "blue", "green", "gray", "yellow"],
      $actual = {},
      $next   = {},
      count  = 1,
      sq     = 31,
      stage  = "#stage",
      side   = "#pieces";

  function createPiece() {
    var pieceType   = type[rand(7)],
        piecePos    = $itens[pieceType],
        pieceLen    = piecePos.length,
        pieceRotate = rand(pieceLen),
        pieceName   = "piece-"+ count++  +", " + pieceType,
        obj         = { "pieceType"   : pieceType,
                        "piecePos"    : piecePos,
                        "pieceRotate" : pieceRotate
                      };

     $next = newPiece(pieceName, piecePos[pieceRotate], color[rand(color.length)]);
     $.extend( $next, obj );

     return $next;
  }

  function newPiece(name, positions, color){
    var container = $("<span>").addClass(name).appendTo(side);


    $.each(positions, function(i, v){
      $('<div>')
      .addClass('sq '+color)
      .appendTo(container)
      .css({ top: v.top*sq, left: v.left*sq });
    });
    console.log("container", container);
    return container;
  }


  /*
   * From 0 to n
   */
  function rand(n){
    return Math.floor((Math.random() * n ) + 0);
  }

  function addToStage(){
    $actual = $next;
    $next = {};

    $actual.css({top: 0, left:4*sq}).appendTo(stage);

    var n = 0,
    interval = setInterval(function(){
      n++;
      if(n > 10) {
        clearInterval(interval);
      }

      $actual.stop().animate({
        top: '+='+sq//+ (parseInt(piece.css('top'), 10) + sq)
      },350);
    },1000);



  }

  function loadPieces() {
    return $.getJSON("js/pieces.json", function (data) {
      $(document).trigger("loaded", data);
      $itens = data;
    });
  }

  function bindEvents(){
     loadPieces().then(function (data) {
      createPiece();
      addToStage();
    });
  }

  function stagePiece(){
    return $actual;
  }

  return {
    init: function() {
      bindEvents();
    },
    loadPieces: loadPieces,
    createPiece: createPiece,
    addToStage: addToStage,
    stagePiece: stagePiece
  };
})();
