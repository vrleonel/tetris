var sq = 31,
    count = 1,
    land = "#screen",
    rotate = 0,
    type = "hookR",
    json = {
   "spear": {
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
  piece = newPiece(("peca-"+count), type, "yellow");

  move2screen(piece);
  //getPositions();
}


$(document).ready(function(){  
  game_screen();
  rePiece();
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
  
  // if(e.keyCode == 38){ // up
  //   piece.rotate();
  // }

  if(e.keyCode == 32){ // space
    piece.rotate();
  }
  
  
});

