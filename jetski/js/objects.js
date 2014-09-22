var cam =  new Object();
cam.x = 0;
cam.y = 0;
cam.plaxX = 0;
PIXI.DisplayObject.prototype.worldX = 100;
PIXI.DisplayObject.prototype.hellothere = "didnt work";
PIXI.DisplayObject.prototype.worldY = 100;
PIXI.DisplayObject.prototype.z = 0;
PIXI.DisplayObject.prototype.spawnX = 0;
PIXI.DisplayObject.prototype.setPosition = function(){
    this.x = this.worldX - cam.x;
    this.y = this.worldY - cam.y;
    this.hellothere = "worked?";
    if (this.z != 0){
        //this.x += jetski.worldX - cam.x * this.z;
        this.y += cam.y * this.z;
        //this.x +=  this.spawnX * this.z;
    }
}
