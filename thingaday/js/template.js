var url = window.location.pathname.split('/')
var projectNum = url[url.length-2]
document.body.innerHTML += "<h1> Project "+projectNum+"</h1>";
document.body.innerHTML += "<a href=https://github.com/kleutzinger/kleutzinger.github.io/tree/master/thingaday/"+projectNum+">view source on github<a><br>";
