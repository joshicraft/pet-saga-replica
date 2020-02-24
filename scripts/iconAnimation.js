/**
 * Created by Admin on 5/03/14.
 */



	function IconAnimation(x, y, width, height, spriteCols, spriteCount, imageSource, context){
            this.x = x;
            this.y = y;
            this.iconWidth = width;
            this.iconHeight = height;
            this.spriteCols = spriteCols;
            this.spriteCount = spriteCount;
            this.source = imageSource;
            this.ctx = context;
            this.counter = 0;
            this.spritePosX =  x;
            this.spritePosY = y;
            this.img = new Image();
            this.img.src = this.source;
            this.animating = false;
        this.count = 0;
     }

        IconAnimation.prototype.play = function(){
             this.animating = true;

        };
		IconAnimation.prototype.draw = function(){

			//var animation = this;

			if(this.animating){
			    if(this.counter == this.spriteCount){
                    this.counter = 0;
					this.animating = false;
					return;
				}
				else{

				}
                this.count ++;
                this.ctx.fillStyle = "rgb(255, 0 , 0)";
                this.ctx.clearRect(0, 0, 700, 1000);
				this.ctx.drawImage(this.img, this.spritePosX, this.spritePosY, this.iconWidth, this.iconHeight, this.x - 50, this.y - 50, this.iconWidth, this.iconHeight);
                console.log(this.x+ " " + this.y);
                this.spritePosX = (this.count % this.spriteCols) * this.iconWidth; // gets the column of the sprite by dividing the column length by its count index and multiplying the images width;
			    this.spritePosY = Math.floor(this.count / this.spriteCols) * this.iconHeight; // gets the row of the sprite

			}
		};




