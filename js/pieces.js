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
    console.log(tetramino);
    var pieceType   = (typeof tetramino === "undefined") ? type[rand(7)] : tetramino,
        piecePos    = $itens[pieceType].rotate,
        pieceLen    = piecePos.length,
        pieceRotate = rand(pieceLen),
        pieceName   = "piece" + count++  + " tetramino " + pieceType,
        obj         = { "pieceType"   : pieceType,
                        "piecePos"    : piecePos,
                        "pieceRotate" : pieceRotate
                      };
    console.log("piece", pieceType);

    $next = newPiece(pieceName, piecePos[pieceRotate], $itens[pieceType].color);
    $.extend( $next, obj );

    return $next;
  }


  function newPiece(name, positions, color){
    var container = $("<span>").addClass(name).appendTo(side);


    $.each(positions, function(i, v){
      $('<div>')
      .addClass('sq '+color)
      .appendTo(container)
      .data("position", { top: "0", left: "0" })
      .css({ top: v.top*sq, left: v.left*sq });
    });
    console.log("container", container);
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
    console.log("pos", arr);
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
    //var n = 0,
    var interval = setInterval(function(){
      //n++;
      if(t.keys.moveDown($actual)) {
        clearInterval(interval);
        mapTetramino();
        //addToStage(); // add new piece into stage
      }

      //t.keys.moveDown($actual);
      // $actual.stop().animate({top: '+='+sq},300);
    },700);
  }

  // Remove from Span Add to Stage and Matrix map

  function mapTetramino(){
    var position = $actual.position();

    $actual.children().each( function (idx , val) {
      $(val).appendTo("#stage").css({top: "+=" + position.top, left: "+=" + position.left });
      t.FIELD.push( $(val).position() );
    });

    $actual.remove();
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


    //return filteredFields;
    return full;
  }


  function sqCol() {
    var col = [];
    for(i = 0; i < 10; i++){
      col.push(i*t.SQ)
    }
    return col;
  }

  // Remove Squares
  function removeSq(){
    var squares = $("#stage .sq"),
        lines   = checkLine();


    $.each(lines, function (i, v) {
      console.log(v);
      var el = squares.filter(function (value){
        return $(this).position().top == v;
      });
      el.remove();
    })


    // Do a new filter like
    // Math.max.apply(Math,lines);
    //
    //
    // var el2 = $(".sq").filter(function (value){
    //   var max = Math.max.apply(Math,lines);
    //   return $(this).position().top < max;
    // });
    //
    //
    // el2.css({ top: "+="+ t.SQ})

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
