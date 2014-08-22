function rot13(input){
    //taken from http://stackoverflow.com/a/617685
    return input.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}

function init(){
    meSpeak.loadConfig("./mespeak_config.json");
    meSpeak.loadVoice("./en-us.json");

    var url = document.URL
    var hash = url.substring(url.indexOf("#"));
    var welcome;
    if (url.indexOf('#') === -1){
        welcome = "welcome  to stephen talking";
    }
    else{
        welcome = hash.substring(1);
        if (welcome[0] === "!"){
            welcome = rot13(welcome).substring(1);
            box = document.getElementById('textbox');
            box.value = welcome.replace(/_/g," ");
        }
    }
    meSpeak.speak(welcome);
}

function speak(){
    var words = document.getElementById('textbox').value;
    meSpeak.speak(words);
}

function send(){
    var sendWords = document.getElementById('textbox').value;
    sendWords = "!"+sendWords.replace(/ /g,"_");
    sendWords = rot13(sendWords);
    var sendUrl = "http://stephentalking.neocities.org/#" + sendWords;
    window.prompt("Copy to clipboard: Ctrl+C (Cmd + C on mac), Enter", sendUrl);
}

function hey(){
    meSpeak.speak("get out of my face");
}


function addMacro(){
    //adding soon
}

$(document).keypress(function(e) {
  if(e.which == 13) {
        speak();
  }
});
