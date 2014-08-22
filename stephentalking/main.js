//Select english/american voice
meSpeak.loadConfig("./mespeak_config.json");
meSpeak.loadVoice("./en-us.json")

var url = document.URL
var hash = url.substring(url.indexOf("#"));
var welcome;
if (url.indexOf('#') === -1){
    welcome = "welcome  to stephen talking";
}
else{
    welcome = hash.substring(1)
}
meSpeak.speak(welcome);
//Play a sound


function speak(){
    var words = document.getElementById('textbox').value;
    meSpeak.speak(words)
}

function send(){
    var sendWords = document.getElementById('textbox').value;
    var sendUrl = "kevinleutzinger.com/stephentalking#" + sendWords;
    window.prompt("Copy to clipboard: Ctrl+C (Cmd + C on mac), Enter", sendUrl);
}

function hey(){
    meSpeak.speak("get out of my face");
}

$(document).keypress(function(e) {
  if(e.which == 13) {
        speak();
        console.log(meSpeak.getVolume())
  }
});
