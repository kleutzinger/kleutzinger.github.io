
//Select english/american voice
meSpeak.loadConfig("mespeak_config.json");
meSpeak.loadVoice("voices/en/en-us.json")

//Play a sound


function speak(){
    var words = document.getElementById('textbox').value;
    meSpeak.speak(words)
}
