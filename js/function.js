var sq = 31;
var land = "#screen";
function game_screen(){ // Cria a tela do jogo no tamanho certo
  $("#screen").height(sq*20);
  $("#screen").width(sq*10);
}

function getPositions(){ // Pega a posição atual da peca e adiciona a um array
  pieces = $(".sq");
  p_positions = [];
  pieces.each(function(a){
    p_positions.push({ left: $(this).position().left, top: $(this).position().top});
  });
}

function spear(){ //Cria a peca spear
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 2, left: 0},{top: 3, left: 0}];
  create_piece(name, positions, "blue");  
}

function square(){
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 0, left: 1},{top: 1, left: 1}];
  create_piece(name, positions, "blue");  
}

function hookL(name){
  var positions = [{top: 0, left: 0},{top: 0, left: 1},{top: 1, left: 1},{top: 2, left: 1}];
  create_piece(name, positions, "blue");
}

function hookR(name){
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 2, left: 0},{top: 0, left: 1}];
  create_piece(name, positions, "red");
}

function sneakL(name){
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2}];
  create_piece(name, positions, "orange");
}

function sneakR(name){
  var positions = [{top: 0, left: 1},{top: 0, left: 2},{top: 1, left: 0},{top: 1, left: 1}];
  create_piece(name, positions, "green");
}

function arraw(name){
  var positions = [{top: 0, left: 1},{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2}];
  create_piece(name, positions, "gray");
}

function create_piece(name, positions, color){
  container = $("<span>").addClass("arrow "+ name).appendTo("#pieces");
  $.each(positions, function(i, v){
    $('<div>').addClass('sq '+color).appendTo(container).css({ top: v.top*sq, left: v.left*sq });
  });
}
/* 
 Teclas
  38: cima,  40 baixo, 37 esquerda, 39 direita 
*/

 function key_d(piece){
   pos = piece.position();
   piece.css({ top: pos.top+sq, left: pos.left});
   
 }
 function key_l(piece){
   pos = piece.position();
   piece.css({ top: pos.top, left: pos.left-sq});
 }
 function key_r(piece){
   pos = piece.position();
   piece.css({ top: pos.top, left: pos.left+sq});
 }
 function key_up(){}

$(document).ready(function(){  

  game_screen();
  //spear();
  //square();
  hookR("peca-1");
  hookL("peca-2");
  
  arraw("peca-3");
  sneakR("peca-4");
  sneakL("peca-5");
  
  $(".peca-2").css({top: 2*sq, left:sq});
  $(".peca-3").css({top: 6*sq, left:sq});
  $(".peca-4").css({top: 9*sq, left:sq});
  $(".peca-5").css({top: 12*sq, left:sq});
  $(".peca-6").css({top: 15*sq, left:sq});
  
  $(".peca-1").appendTo("#screen");
  getPositions();
});

// Teclas
$(document).keydown(function(e) {
  //alert(e.keyCode);
  
  piece = $(".peca-1");
  console.log("peca: " + $(".peca-1").position().left +" X " + $(".peca-1").position().top);
  $(".peca-1 div").each(function(a){
    console.log(a + " - sq: " + $(this).position().left +" X " + $(this).position().top);
  });
  
  if(e.keyCode == 40){ // Down
    key_d(piece);
  }
  
  if(e.keyCode == 37){ // left
    key_l(piece);
  }

  if(e.keyCode == 39){ // Right
    key_r(piece);
  }
  
  
});

