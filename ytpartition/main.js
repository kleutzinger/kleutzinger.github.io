var video_id;
var partitions = [];

function rot13(input){
    //taken from http://stackoverflow.com/a/617685
    return input.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}

function getHash(){
    hash = url.substring(url.indexOf("#")+1);
    autoplay = hash[0] == "!";
    if (autoplay) { hash = hash.substring(1)};
    split = hash.split("+");
    parts = [];
    lastid = split[0];
    for (i=0;i<split.length-1;i+=3){
        if(split[i].length <= 1) {split[i] = lastid;}
        else {lastid = split[i];}
        p = newPartition(split[i], parseInt(split[i+1]), parseInt(split[i+2]))
        parts.push(p);
    }
    partitions = parts;
    writePartitions(partitions);
    if (autoplay) {play()};
}

function writePartitions(p){
    $("#partition_list").empty();
    for (i=0;i<p.length;i++){
        $("#partition_list").append( '<li>' +p[i].start + "-" + p[i].end +  ", "+ p[i].id + '</li>' );
    }
}

function newPartition(id, start, end){
    var partition = new Object();
    partition.id = id;
    partition.start = start;
    partition.end = end;
    return partition;
}


function init(){
    url = document.URL;
    hash = url.substring(url.indexOf("#"));
    var vidlink = "";
    if (url.indexOf('#') === -1){
        //vidlink = "vidlink  to stephen talking";
    }
    else{
        getHash();
        if (vidlink[0] === "!"){
            vidlink = rot13(vidlink).substring(1);
            vidlink = vidlink.replace(/_/g," ");
            box = document.getElementById('textbox');
            box.value = vidlink;
        }
    }
    video_id = 'M7lc1UVf-VE';
    //~ var handlesSlider = document.getElementById('slider');
    //~ noUiSlider.create(handlesSlider, {
        //~ start: [ 4000.99, 8000.99 ],
        //~ tooltips: true,

        //~ range: {
            //~ 'min': [  -10000 ],
            //~ 'max': [ 10000 ]
        //~ }
    //~ });
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


function putHash(){
    p = partitions;

    hash_string = "";
    lastid = "";
    for(i=0;i<p.length;i++){
        if(i>0){lastid = p[i-1].id;}
        if (p[i].id == lastid){ temp = "!"; }
        else {temp = p[i].id};
        h = temp + "+" + p[i].start + "+" + p[i].end + "+";
        hash_string+= h;
    } 
    checked = document.getElementById('autoCheckBox').checked;
    
    if (checked) { hash_string = "!" + hash_string;}
    sendUrl = "http://www.kevinleutzinger.com/ytpartition/#" + hash_string;
    if (window.location.href.indexOf("local") != -1) {sendUrl = "http://localhost:8000/#" + hash_string;}
    window.prompt("Copy to clipboard: Ctrl+C (Cmd + C on mac)", sendUrl);
    
}

function selectButton(){
    words = document.getElementById('textbox').value;
    id = youtube_parser(words);
    video_id = id;
    player.loadVideoById(id, 0.1, "large")
    player.pauseVideo();
    location.href = "#"+words;
}

function add(n){
    _id = video_id;
    _start  = document.getElementById('startid').value;
    _end = document.getElementById('endid').value
    _partition = newPartition(_id, _start, _end);
    partitions.push(_partition);
    writePartitions(partitions);
}
function writePartitions(p){
    $("#partition_list").empty();
    for (i=0;i<p.length;i++){
        $("#partition_list").append( '<li onclick="playSingleClip('+i+');">' +p[i].start + "-" + p[i].end +  ", "+ p[i].id + '</li>' );
    }
}

function playSingleClip(i){
    play(partitions.slice(i,i+1));
}

function play(partitions){
    if (partitions.length == 0){return;}
    i = 0;
    player.loadVideoById(partitions[0].id, .1, "large")
    player.playVideo();
    player.seekTo(partitions[0].start);
    function ensurePlaying(){
    }
    function checkVid(){
        if (i >= partitions.length){
            clearInterval(refreshIntervalId); 
            player.stopVideo();
            return;
        }
        p = partitions;
        if (player.getCurrentTime() >= p[i].end){
            console.log("going to : " + p[i].start);
            i+=1;
            if (i < partitions.length) {
                player.loadVideoById(p[i].id,p[i].start , "large");
                player.seekTo(p[i].start);
            }
        }
    };
    
    var refreshIntervalId = setInterval(checkVid, 1000);
    
    console.log("DONE!");
};
