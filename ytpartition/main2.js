$(document).ready(function() {
	videos = getHash();
	writePartitions(videos);
	if (url.indexOf("localhost")!=-1){document.body.style.backgroundColor = "palegreen";}
	$("#addvideoid").on("input", timestampShortcut);
	$("#customtitle").on("focusin", updateHash);
	$("#customtitle").on("focusout",updateHash);
});
