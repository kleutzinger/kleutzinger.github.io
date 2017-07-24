function getHash(){
	url = document.URL;
	if(url.indexOf("#")==0){return false;}
    hash = url.substring(url.indexOf("#")+1);
    autoplay = hash[0] == "!";
    if (autoplay) { hash = hash.substring(1)};
    split = hash.split("+");
    parts = [];
    lastid = split[0];
    for (i=0;i<split.length-1;i+=3){
        if(split[i].length <= 1) {split[i] = lastid;}
        else {lastid = split[i];}
        p = newClip(split[i], parseInt(split[i+1]), parseInt(split[i+2]))
		parts.push(p);
    }
    return parts;
}



function newClip(vid, startSeconds, endSeconds){
    clip = new Object();
    clip.vid = vid;
    clip.startSeconds = startSeconds;
    clip.endSeconds = endSeconds;
    return clip;
}

function writePartitions(p,boldIndex){
    $("#partition_list").empty();
    p = videos;
    for (i=0;i<p.length;i++){
        if (i==boldIndex){$("#partition_list").append( '<strong><li onclick="playSingleClip('+i+');">' +p[i].startSeconds + "-" + p[i].endSeconds +  ", "+ p[i].vid + '<span style="cursor:pointer;" onclick="deleteClip('+i+');"> &#215; </span></li></strong>');}
        else{$("#partition_list").append( '<li onclick="playSingleClip('+i+');">' +p[i].startSeconds + "-" + p[i].endSeconds +  ", "+ p[i].vid + '<span style="cursor:pointer;" onclick="deleteClip('+i+');"> &#215; </span></li>');}
    }
}

function playButton(){
	playTheseVideos(videos,0);
}

function sendButton(){
	v=videos;
    hash_string = "";
    lastid = "";
    for(i=0;i<v.length;i++){
        if(i>0){lastid = v[i-1].vid;}
        if (v[i].id == lastid){ temp = "!"; }
        else {temp = v[i].vid};
        h = temp + "+" + v[i].startSeconds + "+" + v[i].endSeconds + "+";
        hash_string+= h;
    } 
    //checked = document.getElementById('autoCheckBox').checked;
    checked = false;
    if (checked) { hash_string = "!" + hash_string;}
    sendUrl = "http://www.kevinleutzinger.com/ytpartition/#" + hash_string;
    if (window.location.href.indexOf("local") != -1) {sendUrl = "http://localhost:8000/#" + hash_string;}
    window.prompt("Copy to clipboard: Ctrl+C (Cmd + C on mac)", sendUrl);
}

function addButton(){
	_id = document.getElementById('addvideoid').value
    _id = youtube_parser(_id);
    _start  = document.getElementById('startid').value;
    _end = document.getElementById('endid').value
	clip = newClip(_id,_start,_end);
	videos.push(clip);
	writePartitions(videos,-1);
}


function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function deleteClip(i){
	videos.splice(i,1);
	writePartitions(videos,-1);
}
