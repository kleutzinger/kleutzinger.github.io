var cam =  new Object();
cam.x = 0;
cam.y = 0;
PIXI.DisplayObject.prototype.worldX = 100;
PIXI.DisplayObject.prototype.hellothere = "didnt work";
PIXI.DisplayObject.prototype.worldY = 100;
PIXI.DisplayObject.prototype.setPosition = function(){
    this.x = this.worldX - cam.x;
    this.y = this.worldY - cam.y;
    this.hellothere = "worked?";
}
