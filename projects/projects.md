## Projects by Kevin Leutzinger

### Survive Simon's Rock College Game
http://www.kevinleutzinger.com/surviveSRC/
An avoider game featuring every student's face from my old school Simon's Rock. Dodge the faces and try to make it to the end of the song.
Technologies used: HTML/JS, Firebase, Facebook API
[source](https://github.com/kleutzinger/kleutzinger.github.io/tree/master/surviveSRC)
![](./img/src.png "")

***

### Planetary Motion Simulator
http://www.kevinleutzinger.com/projects/final/
Set the initial conditions for the bodies and see how they react.
Technologies used: HTML/JS
[source](https://github.com/kleutzinger/kleutzinger.github.io/tree/master/projects/final)
![](./img/planet.png "")

***

### Hearthstone Card Sound Identification Game
http://www.kevinleutzinger.com/projects/final/
Play the sounds and try to guess the card name.
Technologies used: HTML/JS
[source](https://github.com/kleutzinger/kleutzinger.github.io/tree/master/hearth)
![](./img/hs.png "")

***

### kevinleutzinger.com Homepage
http://www.kevinleutzinger.com/
Click refresh to get a new background.
Technologies used: HTML/CSS/JS, D3.js
[source](https://github.com/kleutzinger/kleutzinger.github.io/blob/master/index.html)
![](./img/kevinleutzinger.png "")

***

### This Project Page
Technologies used: HTML/CSS

***

### Hosting Multiple Websites and Domains
I set up a remote server from scratch to host multiple websites such as http://davismelee.club, http://kevbot.xyz:3000
Technologies used: Lighttpd, Nodejs, VPS, Custom Domains

***

### Python Game of Life One-Liner
```python
def life(board):
  return [[int(int(sum(board[(y+y_d)%len(board)][(x+x_d)%len(board[0])] for y_d in range(-1,2) for x_d in range(-1,2)))+val*9 in (3,12,13)) for x, val  in enumerate(row)] for y, row in enumerate(board)]```
![](./img/life.png "")

[Read about the game of life here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)