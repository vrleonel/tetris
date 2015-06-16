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

  function createPiece(tetramino) {
    var pieceType   = (typeof tetramino === "undefined") ? type[rand(7)] : tetramino,
        piecePos    = $itens[pieceType].rotate,
        pieceLen    = piecePos.length,
        pieceRotate = rand(pieceLen),
        pieceName   = "piece" + count++  + " tetramino " + pieceType,
        obj         = { "pieceType"   : pieceType,
                        "piecePos"    : piecePos,
                        "pieceRotate" : pieceRotate
                      };

    $next = newPiece(pieceName, piecePos[pieceRotate], $itens[pieceType].color);
    $.extend( $next, obj );

    return $next;
  }


  function newPiece(name, positions, color){
    var container =  $("<span>").addClass(name);


    $.each(positions, function(i, v){
      $('<div>')
      .addClass('sq '+color)
      .appendTo(container)
      .data("position", { top: "0", left: "0" })
      .css({ top: v.top*sq, left: v.left*sq });
    });

    $(side).html(container);

    return container;
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

    createPiece();
    drop();

  }


  // Piece drop
  function drop() {
    var interval = setInterval(function(){
      //n++;
      if(t.keys.moveDown($actual)) {
        clearInterval(interval);
        $("body").trigger("fitTetramino");

        mapTetramino();
        removeSq();

        if( endGame() > 0 ){
          t.game.feedback("END GAME");
        }else{
          addToStage(); // add new piece into stage
        }
      }
    },700);
  }

  // Remove from Span Add to Stage and Matrix map
  function mapTetramino(){
    var position = $actual.position();

    $actual.children().each( function (idx , val) {
      $(val).appendTo("#stage").css({top: "+=" + position.top, left: "+=" + position.left });
      t.FIELD.push( $(val).position() );
    });

    t.game.score(10);

    $actual.remove();
  }

  function remap(){
    var squares = $("#stage .sq");
    t.FIELD = [];

    squares.each( function (idx , val) {
      t.FIELD.push( $(val).position() );
    });
  }


  /*********
  * Check lines fullfiled
  *********/
  function checkLine() {
    var line =  [],
        full =  [],
        fields = t.FIELD;

    $(t.FIELD).each(function(i,e){
      var top = e.top;
      line[top] === undefined ? line[top] = [e.left] : line[top].push(e.left);

      if(line[top].length == 10 ){
        full.push(top);
      }

    });

    var filteredFields = fields.filter(function(fields) {
       return full.indexOf(fields.top) >= 0;
    });

    return full.sort();
  }


  // if complete line, Remove Squares
  function removeSq(){
    var squares = $("#stage .sq"),
        lines   = checkLine();
        //console.log("LINES", lines.length, lines);

    t.game.score(lines.length * 100);



    $.each(lines, function (i, v) {

      var el = squares.filter(function (value){
        return $(this).position().top == v;
      });
      el.remove();

      //setTimeout(function(){
        var el2 = squares.filter(function (value){
          return $(this).position().top < v;
        });

        el2.css({ top: "+="+ t.SQ});
        //remap();
      //}, 100);
      $("body").trigger("lineClear");
    });
    remap();
  }

 function endGame(){
   var end    = [],
       fields = t.FIELD;

   var filtered = fields.filter(function(fields) {
      return fields.top <= 0;
   });


   return filtered.length;
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
    stagePiece: stagePiece,
    checkLine: checkLine,
    removeSq: removeSq
  };
})();
