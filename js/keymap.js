t.keys = (function() {
  "use strict";

  // Teclas
  function keymap() {
    $(document).on("keydown",function(e) {


      if(e.keyCode == 40){ // Down
        console.log("Down");
        //piece.move_down();
      }

      if(e.keyCode == 37){ // left
        console.log("Left");
        //piece.move_left();
      }

      if(e.keyCode == 39){ // Right
        console.log("Right");
        //piece.move_right();
      }

      if(e.keyCode == 38){ // up
        console.log("Up");
        //piece.rotate();
      }

      if(e.keyCode == 32){ // space
        console.log("Space");
        //piece.rotate();
      }

    });
  }


  return {
    init: function() {
      keymap();
    }
  };
})();
t.keys.init();
