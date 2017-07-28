function getHash(){
	url = document.URL;
	if(url.indexOf("#")==0){return false;}
    hash = url.substring(url.indexOf("#")+1);
    autoplay = hash[0] == "!";
    if (autoplay) { hash = hash.substring(1)};
    split = hash.split("+");
    customtitle = hash.split("+").pop();
    customtitle = customtitle.trim();
    customtitle = customtitle.replace(/_/g, " ");
    if (customtitle.trim().length != 0) {$("#customtitle").text(customtitle);}
    console.log(customtitle);
    parts = [];
    lastid = split[0];
    for (i=0;i<split.length-1;i+=3){
        if(split[i].length <= 1) {split[i] = lastid;}
        else {lastid = split[i];}
        p = newClip(split[i], parseInt(split[i+1]), parseInt(split[i+2]))
		parts.push(p);
    }
    setIndexButton(parts);
    return parts;
}


// make new clip, ensure valid
function newClip(vid, startSeconds, endSeconds){
    clip = new Object();
    clip.vid = vid;
    clip.startSeconds = startSeconds;
    clip.endSeconds = endSeconds;
    if (isNaN(clip.endSeconds)) {return false;}
    return clip;
}

// Write the partition

function updateHash(){
	window.location.hash = constructHash();
}

//pads with spaces on the left
function leftPad(str,len){
	spaces = "&nbsp;".repeat(len - str.toString().length);
	return spaces + ""+ str;
}


function writePartitions(p,boldIndex){
	updateHash();
    $("#partition_list").empty();
    maxLengthNumber = 0;
    for(i=0;i<p.length;i++){
		s = p[i].startSeconds.toString();
		e = p[i].endSeconds.toString();
		curmax = Math.max(s.length, e.length);
		maxLengthNumber = Math.max(maxLengthNumber, curmax);
	}
    for (i=0;i<p.length;i++){
		element = "";
		if (i==boldIndex){element+= "<strong>";}
		element+=
			'<li>'+'<span id="vidli'+i+'" style="cursor:pointer;" onclick="playSingleClip('+i+')"> &#9658;</span>' +
			'&nbsp;<input id=start'+i+' oninput="startChange('+i+');" type="number" pattern=[0-9] value='+p[i].startSeconds+'>-'+
			'<input   id=end'+i+' oninput="endChange('+i+');"   type="number" pattern=[0-9] value='+p[i].endSeconds+'>'+
			"&nbsp;&nbsp;<a href=https://youtu.be/"+p[i].vid+"?t="+p[i].startSeconds+">"+p[i].vid+"</a>" +
			'&nbsp;&nbsp;<span onclick="moveUp('+i+')" style="cursor:pointer;">&#8593;</span>'+
			'&nbsp;<span onclick=moveDown('+i+') style="cursor:pointer;">&#8595;</span>'+
			'&nbsp;<span style="cursor:pointer;" onclick="deleteClip('+i+');"> &#215;</span>  </li>';
		if(i==boldIndex){element+="</strong>";}
		$("#partition_list").append($(element));
    }
    $("#indexid").attr({
		"max" : i+1,
		"min" : 0
	});
}

function bolden(i){
	for(n=0;n<videos.length;n++){
		$("#vidli"+n).css('color', 'black');
		if(n==i){
			$("#vidli"+n).css('color', 'red');
		}
	}
}

function playButton(){
	playTheseVideos(videos,0);
}

function constructHash(){
	setIndexButton(videos.length);
	hash_string = "";
    lastid = "";
    v = videos;
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
    customtitle = $("#customtitle").text();
    customtitle = customtitle.trim();
    customtitle = customtitle.replace(/\s/g, "_");
    customtitle= customtitle.replace(/\W/g, '');
    hash_string += customtitle;
    return hash_string;
}

function sendButton(){
	v=videos;
    hash_string = constructHash();
    sendUrl = "http://www.kevinleutzinger.com/ytpartition/#" + hash_string;
    //if (window.location.href.indexOf("local") != -1) {sendUrl = "http://localhost:8000/#" + hash_string;}
    window.prompt("Copy to clipboard: Ctrl+C (Cmd + C on mac)", sendUrl);
}

function timestampShortcut(){
	_id = $("#addvideoid").val();
	if (!_id){ _id = "";}
	t_index = Math.max(_id.indexOf("&t="), t_index = _id.indexOf("?t="));
	if(t_index != -1){ // there is a timestamp in the yt link
		timestr = _id.substring(t_index+3, _id.length);
		timeint = parseInt(timestr);
		$("#startid").val(timeint);
		$("#endid").val(timeint+1);
		console.log(timestr);
	}
}

function addButton(){
	_original_id = _id = document.getElementById('addvideoid').value;
    _id = youtube_parser(_id);
    _start = document.getElementById('startid').value;
    _start = hmsToSecondsOnly(_start);
    _end = document.getElementById('endid').value
    _end = hmsToSecondsOnly(_end);
	clip = newClip(_id,_start,_end);
	
	index = $("#indexid").val();
	if (clip != false && _id != false){
		player.stopVideo();
		if (index == "end"){
			videos.push(clip);
		}
		else{
			videos.splice(parseInt(index-1), 0, clip);
		}
		writePartitions(videos,-1);
	}
}

function setIndexButton(length){
	$('#indexid').empty();
	
	option = '';
	option += '<option value=end>' + "end" + '</option>';
	for (var i=0;i<length;i++){
		option += '<option value="'+ (i+1) + '">' + (i+1) + '</option>';
	}
	$('#indexid').append(option);
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function deleteClip(i){
	player.stopVideo();
	videos.splice(i,1);
	writePartitions(videos,-1);
}

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}

function startChange(i){
	player.stopVideo();
	val = $("#start"+i).val();
	videos[i].startSeconds = parseInt(val);
	updateHash();
}

function endChange(i){
	player.stopVideo();
	val = $("#end"+i).val();
	videos[i].endSeconds = parseInt(val);
	updateHash();
}


function moveUp(i){
	if(i>0){
		player.stopVideo();
		temp = videos[i];
		videos[i] = videos[i-1];
		videos[i-1] = temp;
		writePartitions(videos, -1);
	}
}

function moveDown(i){
	if (i < videos.length-1){
		player.stopVideo();
		temp = videos[i];
		videos[i] = videos[i+1];
		videos[i+1] = temp;
		writePartitions(videos, -1);
	}
}
