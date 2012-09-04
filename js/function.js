// 38 cima
// 40 baixo
// 37 esquerda
// 39 direita
// 66 B
// 65 A

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
q = 32;

$(document).ready(function(){
  $("button").click(function(event){
    spear();
  });

  function spear(){
    l = 4*q; 
    t = -q; 
    $(".square-1").each(function(a){   
      $(this).css({ top: t+=31, left: l });
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
      $(this).css({ top: t+=q, left: l });
    });
  }
  
});

