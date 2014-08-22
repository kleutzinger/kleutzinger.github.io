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

function speak(){
    var words = document.getElementById('textbox').value;
    meSpeak.speak(words)
}

function send(){
    var sendWords = document.getElementById('textbox').value;
    sendWords = sendWords.replace(/ /g,"_");
    var sendUrl = "http://stephentalking.neocities.org/#" + sendWords;
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
