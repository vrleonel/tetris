t.pieces = (function() {
  "use strict";

  var $itens = {},
      type   = ["I", "O", "L", "J", "Z", "S", "T"],
      $actual = {},
      $next   = {},
      count  = 1,
      sq     = t.SQ,
      stage  = "#stage",
      side   = "#pieces";

  function createPiece() {
    var pieceType   = type[rand(7)],
        piecePos    = $itens[pieceType].rotate,
        pieceLen    = piecePos.length,
        pieceRotate = rand(pieceLen),
        pieceName   = "piece"+ count++  +", " + pieceType,
        obj         = { "pieceType"   : pieceType,
                        "piecePos"    : piecePos,
                        "pieceRotate" : pieceRotate
                      };

    $next = newPiece(pieceName, piecePos[pieceRotate], $itens[pieceType].color);
    $.extend( $next, obj );

    return $next;
  }

  function maxTop(arr){
    var pos = {"top": 0, "left": 0};
    $.each(arr, function (){

      if(this.top > pos.top){
        pos.top = this.top;
        pos.left = this.left;
      }

    });
    return pos;
    console.log("pos", arr);
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

  /*
  * Add to Stage
  */
  function addToStage(){
    $actual = $next;
    $next = {};

    var init = { "top": -2 * sq, "left": 4 *sq };

    $actual.css({top: init.top, left: init.left }).appendTo(stage);

    drop();

  }

  function drop() {
    //var n = 0,
    var interval = setInterval(function(){
      //n++;
      if(t.keys.moveDown($actual)) {
        clearInterval(interval);
      }

      //t.keys.moveDown($actual);
      // $actual.stop().animate({top: '+='+sq},300);
    },700);
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
