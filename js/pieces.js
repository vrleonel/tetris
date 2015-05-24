tetris.pieces = (function() {
  "use strict";

  var $itens = {},
      type   = ["spear", "square", "hookL", "hookR", "sneakR", "sneakL", "arrow"],
      color  = ["red", "blue", "green", "gray", "yellow"],
      actual = {},
      count  = 1,
      sq     = 31;

  function createPiece() {
    var pieceType   = type[rand(7)],
        piecePos    = $itens[pieceType],
        pieceLen    = piecePos.length,
        pieceRotate = rand(pieceLen),
        pieceName   = "piece-"+ count++  +", " + pieceType;

    //console.log( pieceType, piecePos, pieceLen )
    actual = newPiece(pieceName, piecePos[pieceRotate], color[rand(color.length)]);
    addToGame();
  }

  function newPiece(name, positions, color){
    var container = $("<span>").addClass(name).appendTo("#pieces");


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

  function addToGame(){
    actual.css({top: 0, left:4*sq}).appendTo("#screen");

    setInterval(function(){
      console.log('interval')
      actual.stop().animate({
        top: '+='+sq//+ (parseInt(piece.css('top'), 10) + sq)
      },350);
    },1000);
  }

  function loadPieces() {
    return $.getJSON("js/pieces.json", function (data) {
      $(document).trigger("loaded", data);
    });
  }

  function bindEvents(){
     loadPieces().then(function (data) {
      $itens = data;
      createPiece();
    });


  }

  return {
    init: function() {
      bindEvents();
    },
    loadPieces: loadPieces,
    createPiece: createPiece,
    rand
  };
})();
tetris.pieces.init();
