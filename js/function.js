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
  l = 4*sq; 
  t = -sq;
  
  for (i=0; i<4; i++){
    $('<div>')
    .addClass('sq red')
    .appendTo('#screen')
    .css({ top: t+=sq, left: l });
  }
}

function square(){
  l = 0; 
  t = 0;
  $('<div>').addClass('sq blue').appendTo(land).css({ top: t, left: l });
  $('<div>').addClass('sq blue').appendTo(land).css({ top: t+sq, left: l });
  $('<div>').addClass('sq blue').appendTo(land).css({ top: t, left: l+sq });
  $('<div>').addClass('sq blue').appendTo(land).css({ top: t+sq, left: l+sq });
  
  
}

function hookL(name){
  pos = {"left": 0, "top": 0};
  container = $("<span>").addClass("hook_l "+name).appendTo("#pieces");
  
  $('<div>').addClass('sq blue').appendTo(container).css({ top: pos.top, left: pos.left });
  $('<div>').addClass('sq blue').appendTo(container).css({ top: pos.top+(2*sq), left: pos.left+sq });
  $('<div>').addClass('sq blue').appendTo(container).css({ top: pos.top, left: pos.left+sq });
  $('<div>').addClass('sq blue').appendTo(container).css({ top: pos.top+sq, left: pos.left+sq });
}

function hookR(){
  container = $("<span>").addClass("hook_l "+name).appendTo("#pieces");
}

function sneak(){
  
}

function arraw(name){
  container = $("<span>").addClass("arrow "+ name).appendTo("#pieces");
  var positions = [{top: 0, left: 1},
                   {top: 1, left: 0},
                   {top: 1, left: 1}, 
                   {top: 1, left: 2}];
                   
  $.each(positions, function(i, v){
    $('<div>').addClass('sq gray').appendTo(container).css({ top: v.top*sq, left: v.left*sq });
  });
}
  
/* 
 Teclas
  38: cima,  40 baixo, 37 esquerda, 39 direita 
*/

 function key_d(piece){
   pos = piece.position();
   piece.css({ top: pos.top+sq, left: pos.left});
   // piece.each(function(a){
   //   pos = $(this).position();
   //   if( pos.top+sq  < $("#screen").height()){
   //     $(this).css({ top: pos.top+sq, left: pos.left});
   //   }
   // });
   
 }
 function key_l(piece){
   pos = piece.position();
   piece.css({ top: pos.top, left: pos.left-sq});
   // piece.each(function(a){
   //   top_now = $(this).position().top;
   //   left_now = $(this).position().left;
   //   $(this).css({ top: top_now, left: left_now-sq });
   // });
 }
 function key_r(piece){
   pos = piece.position();
   piece.css({ top: pos.top, left: pos.left+sq});
   // piece.each(function(a){
   //   top_now = $(this).position().top;
   //   left_now = $(this).position().left;
   //   $(this).css({ top: top_now, left: left_now+sq });
   // });
 }
 function key_up(){}

$(document).ready(function(){  

  game_screen();
  //spear();
  //square();
  hookL("peca-1");
  arraw("piece-2");
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

