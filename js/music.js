t.music = (function() {
  "use strict";

  var musicBg = "music",
      fxFit   = "fx-fit",
      fxLine  = "fx-line";

  function playBgMusic(){
    var audio = document.getElementById(musicBg);

    if(audio.paused){
      audio.play();
    }else {
      audio.pause();
    }
  }

  function playFxLine(){
    document.getElementById(fxLine).play();
  }

  function playFxFit(){
    document.getElementById(fxFit).play();
  }

  function bind(){
    $("body").on("startGame", function(){
      playBgMusic();
    });

    $("body").on("fitTetramino", function(){
      playFxFit();
    });

    $("body").on("lineClear", function(){
      playFxLine();
    });

    $("body").on("pauseBgMusic", function(){
      playBgMusic();
    })

  }

  return {
    init: function() {
      bind();
    },
  };
})();
t.music.init();
