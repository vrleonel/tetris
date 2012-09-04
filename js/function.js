// 38 cima
// 40 baixo
// 37 esquerda
// 39 direita
// 66 B
// 65 A

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).ready(function(){
  $("button").click(function(event){
    $("#teste").toggle();
  });

  function spear(){
    l = 50; 
    t = 30; 
    $(".square-1").each(function(a){   
      $(this).css({ top: t+=32, left: 2 });
      //console.log($(this).position().top);
    });
    
  }
  
  spear();
  
});

// Teclas
t = 30;
$(document).keydown(function(e) {
  //alert(e.keyCode);
  
  if(e.keyCode == 40){
    $(".square-1").each(function(a){   
      $(this).css({ top: t+=32, left: 2 });
    });
  }
  
});
