var sq = 31;
var land = "#screen";
var rotate = 0;
var type = $_GET["type"] != undefined ? $_GET["type"] : "sneakL";

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

var json = 
  {"spear": {
      0: [{top: 0, left: 1},{top: 1, left: 1},{top: 2, left: 1},{top: 3, left: 1}],
      1: [{top: 0, left: 0},{top: 0, left: 1},{top: 0, left: 2},{top: 0, left: 3}]
    },
    "square": { 
      0: [{top: 0, left: 0},{top: 1, left: 0},{top: 0, left: 1},{top: 1, left: 1}]
    },
    "hookL": {
      0: [{top: 0, left: 0},{top: 0, left: 1},{top: 1, left: 1},{top: 2, left: 1}],
      1: [{top: 0, left: 2},{top: 1, left: 2},{top: 1, left: 1},{top: 1, left: 0}],
      2: [{top: 0, left: 0},{top: 1, left: 0},{top: 2, left: 0},{top: 2, left: 1}],
      3: [{top: 0, left: 0},{top: 1, left: 0},{top: 0, left: 1},{top: 0, left: 2}]
      
    },
    "hookR": { 
      0: [{top: 0, left: 0},{top: 1, left: 0},{top: 2, left: 0},{top: 0, left: 1}],
      1: [{top: 0, left: 0},{top: 0, left: 1},{top: 0, left: 2},{top: 1, left: 2}],
      2: [{top: 0, left: 1},{top: 1, left: 1},{top: 2, left: 1},{top: 2, left: 0}],
      3: [{top: 0, left: 0},{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2}]
    },
    "sneakL": { 
      0: [{top: 0, left: 1},{top: 1, left: 2},{top: 0, left: 0},{top: 1, left: 1}],
      1: [{top: 1, left: 0},{top: 2, left: 0},{top: 0, left: 1},{top: 1, left: 1}]
    },
    "sneakR": { 
      0: [{top: 0, left: 1},{top: 0, left: 2},{top: 1, left: 0},{top: 1, left: 1}],
      1: [{top: 0, left: 0},{top: 1, left: 1},{top: 2, left: 1},{top: 1, left: 0}]
      
    },
    "arrow": { 
      0: [{top: 0, left: 1},{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2}],
      1: [{top: 0, left: 1},{top: 1, left: 1},{top: 1, left: 2},{top: 2, left: 1}],
      2: [{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2},{top: 2, left: 1}],
      3: [{top: 0, left: 1},{top: 1, left: 1},{top: 1, left: 0},{top: 2, left: 1}]
    },
    
}; 


function spear(name){ //Cria a peca spear
  var positions = [];
  positions[0] = [{top: 0, left: 0},{top: 1, left: 0},{top: 2, left: 0},{top: 3, left: 0}];
  positions[1] = [{top: 0, left: 0},{top: 0, left: 1},{top: 0, left: 2},{top: 0, left: 3}];
  createPiece(name, positions[0], "blue");  
}


function square(name){
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 0, left: 1},{top: 1, left: 1}];
  createPiece(name, positions, "blue");  
}

function hookL(name){
  var positions = [{top: 0, left: 0},{top: 0, left: 1},{top: 1, left: 1},{top: 2, left: 1}];
  createPiece(name, positions, "blue");
}

function hookR(name){
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 2, left: 0},{top: 0, left: 1}];
  createPiece(name, positions, "red");
}

function sneakL(name){
  var positions = [{top: 0, left: 0},{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2}];
  createPiece(name, positions, "yellow");
}

function sneakR(name){
  var positions = [{top: 0, left: 1},{top: 0, left: 2},{top: 1, left: 0},{top: 1, left: 1}];
  createPiece(name, positions, "green");
}

function arraw(name){
  var positions = [{top: 0, left: 1},{top: 1, left: 0},{top: 1, left: 1},{top: 1, left: 2}];
  createPiece(name, positions, "gray");
}

function createPiece(name, positions, color){
  container = $("<span>").addClass("arrow "+ name).appendTo("#pieces");
  $.each(positions, function(i, v){
    $('<div>').addClass('sq '+color).appendTo(container).css({ top: v.top*sq, left: v.left*sq });
  });
}


/* 
 Teclas
  38: cima,  40 baixo, 37 esquerda, 39 direita 
*/


$.fn.rotate = function(){

  if(json[type][++rotate] === undefined){ rotate=0; }
  console.log(rotate);
  var pos = json[type][rotate];
  this.children().each(function(a, i){
    $(this).css({top: pos[a].top*sq, left: pos[a].left*sq });
  });
}

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


$(document).ready(function(){  


  game_screen();
  
  hookR("peca-1");
  hookL("peca-2");
  arraw("peca-3");
  sneakR("peca-4");
  sneakL("peca-5");
  square("peca-6");
  spear("peca-7");


  
  $(".peca-2").css({top: 2*sq, left:sq});
  $(".peca-3").css({top: 6*sq, left:sq});
  $(".peca-4").css({top: 9*sq, left:sq});
  $(".peca-5").css({top: 12*sq, left:sq});
  $(".peca-6").css({top: 15*sq, left:0});
  $(".peca-7").css({top: 15*sq, left:3*sq});
  
  
  createPiece("peca-8", json[type][rotate], "yellow");
  piece = $(".peca-8").css({top: 0, left:4*sq}).appendTo("#screen");
  //piece.rotate(10);
  getPositions();
});

// Teclas
$(document).keydown(function(e) {
  //alert(e.keyCode);
  
  //piece = $(".peca-1");
  //console.log("peca: " + $(".peca-1").position().left +" X " + $(".peca-1").position().top);
  $(".peca-1 div").each(function(a){
  //  console.log(a + " - sq: " + $(this).position().left +" X " + $(this).position().top);
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
  
  if(e.keyCode == 38){ // Right
    piece.rotate();
  }
  
  
});

