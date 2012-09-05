// 38 cima
// 40 baixo
// 37 esquerda
// 39 direita
// 66 B
// 65 A

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
sq = 31;


$(document).ready(function(){
  $("button").click(function(event){
    spear();
  });
  
  function game_screen(){
    $("#screen").height(sq*20);
    $("#screen").width(sq*10);
  }
  
  
  function spear(){ 
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
    $('<div>').addClass('sq blue').appendTo('#screen').css({ top: t, left: l });
    $('<div>').addClass('sq blue').appendTo('#screen').css({ top: t+sq, left: l });
    $('<div>').addClass('sq blue').appendTo('#screen').css({ top: t, left: l+sq });
    $('<div>').addClass('sq blue').appendTo('#screen').css({ top: t+sq, left: l+sq });
    
  }

  function sneak(){
    
  }

  game_screen();
  spear();
  square();
  
});

// Teclas
$(document).keydown(function(e) {
  //alert(e.keyCode);
  
  piece = $(".red");
  
  if(e.keyCode == 40){ // Down
    piece.each(function(a){
      pos = $(this).position();
      $(this).css({ top: pos.top+sq, left: pos.left, of: "#screen", collision: "fit" });
    });
  }
  
  if(e.keyCode == 37){ // left
    piece.each(function(a){
      top_now = $(this).position().top;
      left_now = $(this).position().left;
      $(this).css({ top: top_now, left: left_now-sq });
    });
  }

  if(e.keyCode == 39){ // Right
    piece.each(function(a){
      top_now = $(this).position().top;
      left_now = $(this).position().left;
      $(this).css({ top: top_now, left: left_now+sq });
    });
  }
  
  
});

