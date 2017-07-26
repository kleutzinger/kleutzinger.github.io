//var videos = [];
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
  height: '390',
  width: '640',
  color: 'WHITE',
  events: {
	'onReady': onPlayerReady,
	'onStateChange': onPlayerStateChange
  }
});
}

var index = 0;
//~ function setVideos(v){
	//~ videos = v;
//~ };
//~ function getVideos(){
	//~ return videos;
//~ }
function playTheseVideos(v, startIndex){
	if(!v) {return false;}
	index = startIndex;
	writePartitions(v,index);
	player.stopVideo();
	player.cueVideoById({videoId: v[index].vid,
	startSeconds: v[index].startSeconds,
	endSeconds: v[index].endSeconds})
	player.playVideo();
}

function playSingleClip(i){
	playTheseVideos(videos, i);
}

function onPlayerReady(event) {
	if(videos.length>0){
		playTheseVideos(videos, index);
	}
}

function onPlayerStateChange(event) {
//console.log("State change: " + event.data + " for index: " + index);

	if (event.data === YT.PlayerState.ENDED && player.getVideoLoadedFraction() > 0) {
	  //console.log(index);
	  if (index < videos.length - 1) {
		index++;
		event.target.loadVideoById({
		  videoId: videos[index].vid,
		  startSeconds: videos[index].startSeconds,
		  endSeconds: videos[index].endSeconds
		});
		writePartitions(videos,index);
		}
	}
}

