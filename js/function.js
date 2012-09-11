var sq = 31;
var land = "#screen";
var rotate = 0;
var type = "spear";

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

function game_screen(){ // Cria a tela do jogo no tamanho certo
  $("#screen").height((sq*20)-1);
  $("#screen").width((sq*10)-1);
}

function getPositions(){ // Pega a posição atual da peca e adiciona a um array
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
  return piece.css({top: 0, left:4*sq}).appendTo("#screen");
}

$.fn.drop = function(){
  pos = this.position();
  console.log(pos.top);
    for(var i = 0; i < 20; i ++){
    this.animate({
      top: pos.top + i*sq
    });
    this.animate({top: pos.top + i*sq}, 300);
  }
  console.log(pos.top);
  //debugger;
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
  piece.css({ top: pos.top+sq, left: pos.left});
 
}
$.fn.move_left = function(){
  pos = piece.position();
  piece.css({ top: pos.top, left: pos.left-sq});
}
$.fn.move_right = function(){
  pos = piece.position();
  piece.css({ top: pos.top, left: pos.left+sq});
}


$(document).ready(function(){  


  game_screen();
  
  // hookR("peca-1");
  // hookL("peca-2");
  // arraw("peca-3");
  // sneakR("peca-4");
  // sneakL("peca-5");
  // square("peca-6");
  // spear("peca-7");
  // 
  // 
  // 
  // $(".peca-2").css({top: 2*sq, left:sq});
  // $(".peca-3").css({top: 6*sq, left:sq});
  // $(".peca-4").css({top: 9*sq, left:sq});
  // $(".peca-5").css({top: 12*sq, left:sq});
  // $(".peca-6").css({top: 15*sq, left:0});
  // $(".peca-7").css({top: 15*sq, left:3*sq});
  
  
  piece = newPiece("peca-8", type, "yellow");
  move2screen(piece);
  
  piece.drop();
  //piece.rotate(10);
  getPositions();
});

// Teclas
$(document).keydown(function(e) {
  
  if(e.keyCode == 40){ // Down
    piece.move_down();
  }
  
  if(e.keyCode == 37){ // left
    piece.move_left();
  }

  if(e.keyCode == 39){ // Right
    piece.move_right();
  }
  
  if(e.keyCode == 38){ // Right
    piece.rotate();
  }
  
  
});

