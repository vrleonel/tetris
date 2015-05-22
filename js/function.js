var sq = 31,
    count = 1,
    land = "#screen",
    rotate = 0,
    type = $_GET['type'],
    color = $_GET['color'],
    json ={};


function loadJson() {
    $.getJSON("js/pieces.json", function (data) {
       console.log("DATA", data.spear);
       json = data;
       console.log(json);
    });
}
function game_screen(){ // Cria a tela do jogo no tamanho certo
  $("#screen").height((sq*20)-1);
  $("#screen").width((sq*10)-1);
}

function getPositions(){ // Pega a posi��o atual da peca e adiciona a um array
  pieces = $(".sq");
  p_positions = [];
  pieces.each(function(a){
    p_positions.push({ left: $(this).position().left, top: $(this).position().top});
  });
}

function newPiece(name, type, color){
  container = $("<span>").addClass(type+" "+name).appendTo("#pieces");
  positions = json[type][rotate];

  $.each(positions, function(i, v){
    $('<div>')
    .addClass('sq '+color)
    .appendTo(container)
    .css({ top: v.top*sq, left: v.left*sq });
  });

  return container;
}

function move2screen(piece){

  piece.css({top: 0, left:4*sq}).appendTo("#screen");

  setInterval(function(){
    console.log('interval')
    piece.stop().animate({
      top: '+='+sq//+ (parseInt(piece.css('top'), 10) + sq)
    },350);
  },1000);

}

var n = 0;
$.fn.drop = function(pos){
  console.log(this.position().top);
  this.css({top: '+=' + sq});
  // this.animate({
  //   top: '+='+sq
  // }, 500);

  if(++n < 10){
     window.setTimeout(this.drop(),1000);
  }
}

$.fn.rotate = function(){
  if(json[type][++rotate] === undefined){ rotate=0; }
  var pos = json[type][rotate];
  this.children().each(function(a, i){
    $(this).css({top: pos[a].top*sq, left: pos[a].left*sq });
  });
}

$.fn.move_down = function(){
  pos = piece.position();
  piece.stop().css({ top: pos.top+sq, left: pos.left});

}
$.fn.move_left = function(){
  pos = piece.position();
  piece.css({ top: pos.top, left: pos.left-sq});
}
$.fn.move_right = function(){
  pos = piece.position();
  piece.css({ top: pos.top, left: pos.left+sq});
}

function rePiece(){
  piece = newPiece(("peca-"+count), type, color);

  move2screen(piece);
  //getPositions();
}


$(document).ready(function(){
  loadJson();
  //game_screen();
  //rePiece();
});
