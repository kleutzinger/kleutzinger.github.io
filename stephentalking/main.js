function rot13(input){
    //taken from http://stackoverflow.com/a/617685
    return input.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}

function speak(text){
	text = text.replace(/\./g,","); //periods don't work. replace w/ commas
    saying = meSpeak.speak(text, {speed:130, pitch:40});
    return;
}

function init(){
    meSpeak.loadConfig("./mespeak_config.json");
    meSpeak.loadVoice("./en-us.json");

    var url = document.URL;
    var hash = url.substring(url.indexOf("#"));
    var welcome;
    if (url.indexOf('#') === -1){
        welcome = "welcome  to stephen talking";
    }
    else{
        welcome = hash.substring(1);
        if (welcome[0] === "!"){
            welcome = rot13(welcome).substring(1);
            welcome = welcome.replace(/_/g," ");
            box = document.getElementById('textbox');
            box.value = welcome;
        }
    }
    speak(welcome);
}

function speakClicked(){
    var words = document.getElementById('textbox').value;
    speak(words);
}

function send(){
    var sendWords = document.getElementById('textbox').value;
    sendWords = "!"+sendWords.replace(/ /g,"_");
    sendWords = rot13(sendWords);
    var sendUrl = "http://kevinleutzinger.com/stephentalking.com/#" + sendWords;
    window.prompt("Copy to clipboard: Ctrl+C (Cmd + C on mac)", sendUrl);
}


function addMacro(){
    //adding soon
}

function twitch(){
	pic = document.getElementById("pic");
	if (pic.src.slice(-5)[0] == "1"){
		pic.src = "frame2.jpg";
	}
	else{
		pic.src="frame1.jpg";
	}
}

function hey(){
   speak("the name's stephen, that's with a PH, as in PHD.");
}


$(document).keypress(function(e) {
  if(e.which == 13) {
        speakClicked();
		twitch();
  }
});
