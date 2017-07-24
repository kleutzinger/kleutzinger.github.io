potentialVideos = getHash();
if (potentialVideos > -1){
	console.log(potentialVideos);
	videos = potentialVideos;
	writePartitions(videos,-1);
}
else{
	videos = [];
}
if (url.indexOf("localhost")!=-1){document.body.style.backgroundColor = "palegreen";}
console.log(potentialVideos);
