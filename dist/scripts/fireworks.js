// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

var stats;

Fireworks = function(width, height, ID, amount){


var canvasFireworks = document.getElementById( ID ),
   // canvasStars = document.getElementById('canvasStars'),
    canvasSparkles = document.getElementById('canvasSparkles'),
    starsCanvas = document.getElementById('starsCanvas'),
        ctxS =  canvasStars.getContext( '2d' ),
		ctxF = canvasFireworks.getContext( '2d' ),
		ctxSparkles = canvasSparkles.getContext( '2d' ),
		// full screen dimensions
		cw = width - 20,
		ch = height,
		// particle collection
		particles = [],
    fireworksParticles = [],
		stars = [],
        sparkles = [],
        fireworks = [],
        starsImages = [],
        starsHeight = ch / 4,
        starsWidth = cw / 1.3,

		// starting hue
		hue = 20,
        largeSparkle,
        largeSparkles = [],


		timerTotal = 6,
		timerTick = 0,
        loopTick = 0,

        keyFrame = 0;
    // stats = new Stats();
    // stats.setMode(1); // 0: fps, 1: ms
    var stage;
    var queue;
    var sparkleImage;
    var starImage1;
    var starImage2;
    var starImage3;
    var starsShapes = [];
    var starsTimeline;
    var clearedFlare;
    var purpsplosion;
    var bg;
    var levelCompleteText;
    var sparklesArray = [[],[],[]];
    var sparklesRingArray = [[],[],[]];
    var colors = ['#ff0000','#00ffff','#3300ff','#00ff66','#00ff00','#ffff00','#ff9900'];
// Align top-left
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = '0px';
// stats.domElement.style.top = '0px';

// document.body.appendChild( stats.domElement );

// set canvas dimensions
canvasFireworks.width = cw ;
canvasFireworks.height = 860;

//canvasStars.width = cw;

//canvasStars.height = ch;
starsCanvas.width = cw;

starsCanvas.height = ch - 15;

    init();


    function init(){
        stage = new createjs.Stage(starsCanvas);
        queue = new createjs.LoadQueue(false);
        queue.installPlugin(createjs.Sound);
        queue.addEventListener("complete", handleComplete);
        queue.loadManifest([{id:"starImage", src:"images/star-new.png"},
            {id:"bg", src:"images/bg3.png"},
            {id:"bgnew", src:"images/bg-new.png"},
            {id:"sparkleImage", src:"images/sprite-sparkle.png"},
            {id:"levelComplete", src:"images/level-complete.png"},
            {id:"purpsplosion", src:"images/purpsplosion.png"}]);

        starsTimeline = new TimelineLite();
    }

     function handleComplete(event) {
        buildImages();
      //  buildTweens();
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setInterval(15);
        createjs.Ticker.setFPS(25);
     }

    function buildImages(){
                var xOffset = 40;
        var yOffset = 40;
        var scaleX = 151;
        var scaleY = 144;
        var count = 0;
        var starScale = 1;
        bg = new createjs.Bitmap(queue.getResult('bg'));
            bg.x = 700 /2 - 10;
            bg.y = 900/2 + yOffset;
            bg.scaleX = 0;
            bg.scaleY = 0;
            bg.regX = 700 /2;
            bg.regY = 900/2;
        stage.addChild(bg);

           starImage1 = new createjs.Bitmap(queue.getResult('starImage'));
           starImage1.scaleX = starScale;
           starImage1.scaleY = starScale;
           starImage1.alpha = 0;
           starImage1.regX = scaleX / 2 -xOffset / 2;
           starImage1.regY = scaleY / 2 + 10;
           starImage1.rotation = -8;
           starImage1.x = (cw / 3 ) - 10;
           starImage1.y = scaleY * 1.22 + yOffset;
        starImage1.cache(-starImage1.x, -starImage1.y , scaleX * 4, scaleY * 4 );
count++;
        starImage2 = new createjs.Bitmap(queue.getResult('starImage'));
           starImage2.scaleX = starScale;
           starImage2.scaleY = starScale;
           starImage2.regX = scaleX / 2 ;
           starImage2.regY = scaleY / 2 + 15;
           starImage2.alpha = 0;
           starImage2.x = cw / 3 + (scaleX / 1.45 * count) + 12 ;
           starImage2.y = scaleY * 1.16 + yOffset;
        starImage2.cache(-starImage2.x, -starImage2.y , scaleX * 4, scaleY * 4 );
count++;
        starImage3 = new createjs.Bitmap(queue.getResult('starImage'));
           starImage3.scaleX = starScale;
           starImage3.scaleY = starScale;
           starImage3.alpha = 0;
           starImage3.regX = scaleX / 2 + xOffset / 2;
           starImage3.regY = scaleY / 2 + 10;
           starImage3.rotation = 8;
           starImage3.x = cw / 3 + (scaleX/ 1.45 * count) + 35 ;
           starImage3.y = scaleY * 1.22 + yOffset;
        starImage3.cache(-starImage3.x, -starImage3.y , scaleX * 5, scaleY * 4.5 );

        starsShapes.push(starImage1, starImage2, starImage3);

        stage.addChild(starImage1, starImage2, starImage3);
                    var starScaleX = 151;
            var starScaleY = 144;
            var starX = cw / 4 + (starScaleX * starIndex) + 25 ;
            var starY = starScaleY + starScaleY / 2;
        var i = starsShapes.length;
        while(i--){
             buildSparkles(i, starsShapes[i].x  - 60,starsShapes[i].y - 20, random(30,40));
        }
        var circleG = new createjs.Graphics();
      //      circleG.beginFill(createjs.Graphics.getRGB("#fff", 1));
        //    circleG.drawCircle(0,0, 40);
 circleG.beginRadialGradientFill([createjs.Graphics.getRGB(0xffffff, 0.2),createjs.Graphics.getRGB(0xFF44FF, 0.0)], [0, 1], 100, 100, 50, 100, 100, 90).drawCircle(100, 100, 100);
       clearedFlare = new createjs.Shape(circleG);
            clearedFlare.x = cw/2;
            clearedFlare.y = ch/2;
            clearedFlare.regX = 100;
            clearedFlare.regY = 100;
            clearedFlare.alpha = 0;
           // clearedFlare.shadow = new createjs.Shadow("#ff44ff", 0, 0, 10);

         purpsplosion = new createjs.Bitmap(queue.getResult('purpsplosion'));
            purpsplosion.x = cw/2 ;
            purpsplosion.y = ch/2 - 40;
            purpsplosion.alpha = 0.0;
            purpsplosion.scaleX = 0;
            purpsplosion.scaleY = 0;
            purpsplosion.regX = 200;
            purpsplosion.regY = 200;
 levelCompleteText = new createjs.Bitmap(queue.getResult('levelComplete'));
            levelCompleteText.x = cw/2 ;
            levelCompleteText.y = ch/2;
            levelCompleteText.scaleX = 0;
            levelCompleteText.scaleY = 0;
            levelCompleteText.regX = 112;
            levelCompleteText.regY = 36;

        stage.addChild( clearedFlare,purpsplosion, levelCompleteText);
  //      purpsplosion = new createjs.Bitmap();
    }

    function tick(){
        // stats.begin();
        keyFrame ++;
        drawStars();
        drawFireworks();

        // stats.end();

    //    console.log(particles.length)
        stage.update();
    }
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}
//    var sparkle;
    var counter = 0;
    var cloudFlareSpeed = 0.6;
function tweenCloudFlare(){
    TweenLite.to(clearedFlare, cloudFlareSpeed,{easel:{scaleX:3,scaleY:3,alpha:1},ease:Power4.easeIn, onComplete:function(){
         TweenLite.to(clearedFlare, 0.2,{easel:{alpha:0},ease:Power4.easeOut, delay:cloudFlareSpeed});
    }});
   // TweenLite.to(purpsplosion, 0.62,{easel:{rotation:180, ease:Ease.linear}});
    TweenLite.to(purpsplosion, cloudFlareSpeed,{easel:{scaleX:2.8,scaleY:2.8,alpha:1,ease:Power4.easeOut}, onComplete:function(){
         TweenLite.to(purpsplosion, 0.2,{easel:{scaleX:0,scaleY:0,alpha:0}, ease:Power4.easeOut, delay:cloudFlareSpeed});
    }});
    TweenLite.to(levelCompleteText, cloudFlareSpeed,{easel:{scaleX:1,scaleY:1, ease:Power3.easeOut },onComplete:function(){
      TweenLite.to(levelCompleteText, 0.2,{easel:{scaleX:0,scaleY:0, ease:Power3.easeOut}, delay: cloudFlareSpeed});
    }});

}

function tweenInUI(){
    var buttonPlay = document.getElementById('play');
    var buttonRetry = document.getElementById('retry');
    var buttonClose = document.getElementById('close');
    var buttonConnect = document.getElementById('connect');
    TweenLite.to(bg, 0.2,{easel:{scaleX:1,scaleY:1, ease:Bounce.easeOut}, onComplete:function(){
        buttonPlay.style.display ="block";
        buttonClose.style.display ="block";
        buttonRetry.style.display ="block";
        buttonConnect.style.display ="block";
    }});
}

function drawStar(x, y, radius, points, fraction, ctx){

        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0,0-radius);
        for (var i = 0; i < points; i++)
        {
            ctx.rotate(Math.PI / points);
            ctx.lineTo(0, 0 - (radius*fraction));
            ctx.rotate(Math.PI / points);
            ctx.lineTo(0, 0 - radius);
        }
        ctx.fill();
        ctx.restore();
    }
function drawFireworkParticle(data){


    }

    function updateFireworParticle(data, shape){

    }
// create particle
function Particle( x, y, decay, speed, hue, brightness,star, color) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 3;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 10 ) + speed;
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 1;
	// set the hue to a random number +-20 of the overall hue variable
	//this.hue = random( hue - 20, hue + 20 );
    this.hue = hue;
    this.saturation = random( 74, 100);
	//this.brightness = random( 49, 80 );
	this.brightness = brightness;
	this.alpha = 0.7;
	// set how fast the particle fades out
	this.decay = random( 0.015, 0.03) - decay;
    this.rotation = 0;
    this.scale = random(0, 10);
    this.star = star;
    var pointsArray = [5, 7];
    this.points = pointsArray[Math.floor(Math.random() * 2)];
    this.dead = false;
    this.image= new Image();
    this.image.src = sparkleArray[Math.floor(random(0, 2))];
    this.isImage = Math.floor(random(0, 3));
    this.randomHexColor = color;
    this.fireworksShape = new createjs.Shape();
  //  this.fireworksShape.shadow = new createjs.Shadow( this.randomHexColor, 0, 0, 30);
    this.fireworksShape.shadow = new createjs.Shadow('#fff', 0, 0, 10);
     //  this.fireworksShape.graphics.beginFill('#CC0099').drawPolyStar(this.x , this.y, this.scale/6, 4, 0.75, -90);


        this.fireworksShape.x = this.x;
        this.fireworksShape.y = this.y;
        this.fireworksShape.alpha = this.alpha;
        this.fireworksShape.regX = this.x;
        this.fireworksShape.regY = this.y;
        this.fireworksShape.scaleX = this.scale/8;
        this.fireworksShape.scaleY = this.scale/8;
    if(star == 'blobs'){
        if(Math.floor(Math.random() * 4) % 2 == 0){
               this.fireworksShape.graphics.beginFill('#CC0099');
        }
     else{
              this.fireworksShape.graphics.beginFill('#fff');
            this.alpha = 0.6;
        }

        this.fireworksShape.graphics.bezierCurveTo(this.x + 3,this.y + 0,this.x + 0,this.y + 3,this.x + 0,this.y + 6);
        this.fireworksShape.graphics.bezierCurveTo(this.x + 1,this.y + random(5,9),this.x + 4,this.y + random(5,9),this.x + 6,this.y + random(5,9));
        this.fireworksShape.graphics.bezierCurveTo(this.x + random(5,9),this.y + random(5,9),this.x + random(5,9),this.y + 5,this.x + random(5,9),this.y + 2);
        this.fireworksShape.graphics.bezierCurveTo(this.x + 8,this.y + 0,this.x + 3,this.y + 0,this.x + 3,this.y + 0);
        stage.addChild(this.fireworksShape);
    }
    else if(star == 'whiteStars'){

             this.fireworksShape.graphics.beginFill('#fff').drawPolyStar(this.x , this.y, this.scale/1.5, 4, 0.75, -90);


        stage.addChild(this.fireworksShape);

    }
    else if(star == 'confettiStars'){
           this.fireworksShape.graphics.beginFill(this.randomHexColor);
                this.fireworksShape.graphics.moveTo(this.x + 2,this.y +1);
                this.fireworksShape.graphics.lineTo(this.x + 0,this.y +5);
                this.fireworksShape.graphics.lineTo(this.x + 8,this.y +5);
                this.fireworksShape.graphics.lineTo(this.x + 9,this.y +1);
                this.fireworksShape.graphics.lineTo(this.x + 2,this.y +1);
             stage.addChild(this.fireworksShape);
    }
    else if(star == 'coloredStars'){


//           if(Math.floor(Math.random() * 4) % 2 == 0){
          this.fireworksShape.graphics.beginFill(this.randomHexColor).drawPolyStar(this.x , this.y, this.scale/1.5, 4, 0.9, -90);
     //   }

          stage.addChild(this.fireworksShape);


    }

  //  drawFireworkParticle(this);
    //this.singleShot = singleShot;
}

var sparkleArray = ['images/sparkle.png', 'images/sparkle2.png', 'images/sparkle-ring.png'];
// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
    this.rotation +=  Math.cos( this.angle ) * this.speed;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
        particles.slice(index,1);
     //   console.log('removed, ' + index);
       this.dead = true;
	}
    this.fireworksShape.alpha = this.alpha;
    this.fireworksShape.x = this.x;
    this.fireworksShape.y = this.y;
    this.fireworksShape.rotation = this.rotation;
};

// draw particle
Particle.prototype.draw = function() {
   ctxF.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        ctxF.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation  + "%, " + this.brightness + '%, ' + this.alpha + ')';
        if(this.isImage == 0 && !this.dead && this.star =='whiteStars'){
            ctxF.save();
            ctxF.globalCompositeOperation = "lighter";
            ctxF.globalAlpha = this.alpha;
            ctxF.drawImage(this.image, this.x, this.y );
            ctxF.restore();
        }
        else if(this.isImage == 1 &&  !this.dead){
            ctxF.save();
            ctxF.shadowBlur = 10; ctxF.shadowColor = 'hsla(' + this.hue + ', ' + this.saturation  + "%, " + this.brightness + '%, ' + this.alpha + ')';
      //      drawStar(this.x, this.y, this.scale, this.points, 0.5, ctxF);
            ctxF.restore();
        }


        ctxF.beginPath();
     //   ctxF.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
    //    ctxF.lineTo( this.x, this.y );

        ctxF.stroke();
  //      this.update();
 //   ctxF.restore();
};




function createParticles( x, y, decay, speed, hue, lightness, count, star, color) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = count;
	while( particleCount-- ) {
		particles.push( new Particle( x, y, decay, speed, hue, lightness, star, color) );
	}
}

    function tweenInStar(star, starX, starY , particleCount){

        var shape = starsShapes[star];
              TweenLite.to(shape,.2, {easel:{scaleX: 0.67,
                        scaleY: 0.67,
                        alpha: 1.0},onComplete:function(){
                        createParticles(starX,starY, 0.002,2, random(43,47), random(96,100), 40, 'whiteStars');
              }});
            starX -= 8;
             var largeSparkle = createSparkle(starX , shape.y - 10, 80, 40);
                        TweenLite.to(largeSparkle,.8, {easel:{rotation: 270 }});
                        TweenLite.to(largeSparkle,.4, {easel:{scaleX: 1, scaleY: 1 ,alpha: 0.5 }});
                        TweenLite.to(largeSparkle,.4, {easel:{scaleX: 0, scaleY: 0 ,alpha: 0 }, delay:.4, onComplete: complete(largeSparkle)});
                     //   TweenLite.to(shape,.15, { easel:{exposure:1.25}, onComplete: complete});

             function complete(largeSparkle){
             //  TweenLite.to(shape,.15, { easel:{exposure:1}});
                 largeSparkle.rotation = 0;
                drawSparkles(sparklesArray[star], sparklesRingArray[star]);
             }
        }
    function wiggleButtons(rad, scale){
        var rotation = rad +'';
        if(scale == 1){
            scale = 1.02;
        }
        else{
            scale = 1;
        }
        TweenLite.to([$('#play'),$("#retry"), $('#connect')],1, { rotation: rotation, scaleX: scale, scaleY: scale, ease: Linear.easeIn,onComplete:function(){
          rad = rad - (rad * 2);
        //  scale = scale - (scale * 2);
            console.log(rad);
            wiggleButtons(rad, scale);
        }});
    }


  //  var sparklesTweenArray = [[],[],[]];

    function buildSparkles(star, x, y, scale){
        var i  = Math.floor(random(5,15));
    for(var j = 0; j < i; j ++){
              var xPos = x + random(50, 80);
            var yPos = y + random(-5, 40);
             sparklesRingArray[star].push(createSparkleRing((xPos), (yPos), scale, 20));
            sparklesArray[star].push(createSparkle((xPos), (yPos), scale, 20));

        }
      //  var i = 10;

    //    console.log(sparklesRingArray[star].length + " = rings array length-- " + sparklesArray[star].length + " = sparkle array length");
    }
var tween1, tween2, tween3, tween4, tween5 ;
var star1Sparkle1, star1Sparkle2, star1Sparkle3, star1Ring1, star1Ring2,
    star2Sparkle1, star2Sparkle2, star2Sparkle3, star2Ring1, star2Ring2,
    star3Sparkle1, star3Sparkle2, star3Sparkle3, star3Ring1, star3Ring2;

       function drawSparkles(sparkles,sparklesRings){
         for(var j = 0; j < sparkles.length; j++){

             var sparkle = sparkles[j];

             tween1 = TweenLite.to(sparkle,1.2, {easel:{rotation: 270 }, onComplete:resetRotate(sparkle)});
             tween2 = TweenLite.to(sparkle,.6, {easel:{scaleX: 1, scaleY: 1 ,alpha: 0.8 }, delay:.1});
             tween3 = TweenLite.to(sparkle,.6, {easel:{scaleX: 0, scaleY: 0 ,alpha: 0 }, delay:.4});

             function resetRotate(sparkle){
                sparkle.rotation = 0;
            }
        }
         for(var i = 0; i < sparklesRings.length; i++){
             var sparkleRing = sparklesRings[i];
             TweenLite.to(sparkleRing,.6, {easel:{scaleX: 1, scaleY: 1 ,alpha: 0.2 }});
             TweenLite.to(sparkleRing,.6, {easel:{scaleX: 0, scaleY: 0 ,alpha: 0 }, delay:.4});
         }
    }
 var sparklesTweenArray = [[star1Sparkle1, star1Sparkle2, star1Sparkle3],[star2Sparkle1, star2Sparkle2, star2Sparkle3],[star3Sparkle1, star3Sparkle2, star3Sparkle3]];

    function drawRandomSparkles(star){
         var randomSparkle = Math.floor(random(0,  sparklesArray.length));
        var sparkleAlpha = 0.6;
        if(sparklesTweenArray[star][0] != undefined){
             sparklesTweenArray[star][0].totalProgress(1).kill();
             sparklesTweenArray[star][1].totalProgress(1).kill();
             sparklesTweenArray[star][2].totalProgress(1).kill();

        }
        if(sparklesTweenArray[star][3] != undefined){
            sparklesTweenArray[star][3].totalProgress(1).kill();
            sparklesTweenArray[star][4].totalProgress(1).kill();
        }

   //      for(var j = 0; j < sparklesArray.length; j++){
             var sparkle = sparklesArray[star][randomSparkle];
            // var sparkle = sparkles[randomSparkle];
             var scale = random(.7, 1.1);
            var speed = 1.2;
      //  var tween1, tween2, tween3;
            sparkle.rotation = 0;
           sparklesTweenArray[star][0] = TweenLite.to(sparkle,speed,{easel:{rotation: 400 }, onComplete:resetRotate(sparkle)});
           sparklesTweenArray[star][1] = TweenLite.to(sparkle,speed/2, {easel:{scaleX: scale, scaleY: scale ,alpha: sparkleAlpha }});
           sparklesTweenArray[star][2] =  TweenLite.to(sparkle,speed/2, {easel:{scaleX: 0, scaleY: 0 ,alpha: 0 }, delay:speed/2});

            function resetRotate(sparkle){
                    sparkle.rotation = 0;
              //  TweenLite.from(sparkle,1.2, {easel:{rotation: 0 }});
            }
 //       }
 //       for(var i = 0; i < sparklesRingArray.length; i++){
         //      var sparkleRing = sparklesRings[i];
             var sparkleRing = sparklesRingArray[star][randomSparkle];
            sparklesTweenArray[star][3] = TweenLite.to(sparkleRing,speed/2, {easel:{scaleX: scale, scaleY: scale ,alpha: sparkleAlpha }});
            sparklesTweenArray[star][4] = TweenLite.to(sparkleRing,speed/2, {easel:{scaleX: 0, scaleY: 0 ,alpha: 0 }, delay:speed/2});

  //      }
    }

    function createSparkle(x, y, scale, shadowBlur){
        var sparkle = new createjs.Shape();
         sparkle.shadow = new createjs.Shadow("#fff", 0, 0, 40);
         sparkle.graphics.beginFill("#fff").drawPolyStar(x , y, scale, 4, 0.87, -90);
            sparkle.x = x;
            sparkle.y = y;
            sparkle.regX = x ;
            sparkle.regY = y ;
            sparkle.scaleX = 0;
            sparkle.scaleY = 0;
            sparkle.alpha = 0;
        stage.addChild(sparkle);
        return sparkle;
    }

    function createSparkleRing(x, y, scale, shadowBlur){
       var graphics = new createjs.Graphics();
       graphics.beginRadialGradientFill([createjs.Graphics.getRGB(0xffffff, 0.9),createjs.Graphics.getRGB(0xffffff, 0.0)], [0, 1], x, y, scale/2, x, y, scale).drawCircle(x, y, scale);
       var sparkleRing = new createjs.Shape(graphics);
            sparkleRing.x = x;
            sparkleRing.y = y;
            sparkleRing.regX = x ;
            sparkleRing.regY = y ;
            sparkleRing.scaleX = 0;
            sparkleRing.scaleY = 0;
            sparkleRing.alpha = 0;
        stage.addChild(sparkleRing);
        return sparkleRing;
    }


    function drawFireworks(){
        ctxF.clearRect( 0, 0, cw, ch );

        // loop over each particle, draw it, update it
        var j = particles.length;
        while( j-- ) {
            particles[ j ].draw();
            particles[ j ].update( j );
        }

        // launch fireworks at each star location when all stars are loaded
        if(starIndex >= 4 && keyFrame == 60 * 4 + 120){
                for(var i = 0; i < stars.length; i ++){
                //    createParticles(stars[i].x, stars[i].y);
                }
                if( timerTick >= timerTotal ) {
                //    createParticles(random( 0, cw ), random( 0 + ch / 6, ch - ch / 6 ));
                    timerTick = 0;

            } else {
                timerTick++;
                loopTick ++;
            }
        }
    }


    function drawStars(){
            var starScaleX = 150;
            var starScaleY = 95;
            var starX = cw / 3 + (starScaleX / 1.8 * starIndex) + 25 ;
            var starY = starScaleY + starScaleY / 2;
        var particleCount = 100;
            if(keyFrame > tweenInUIFrame + 50 && keyFrame % 5 == 0 && starIndex == 3){
                 starIndex++;
                 starX =  cw / 4 + (starScaleX * 0) + 25 ;
                 tweenInStar(0, starImage1.x + 10, starImage1.y, particleCount);
            }
             if(keyFrame > tweenInUIFrame + 20 && keyFrame % 6 == 0 && starIndex == 4){
                     starIndex++;
                     starX =  cw / 4 + (starScaleX * 1) + 25 ;
                     tweenInStar(1, starImage2.x , starImage2.y, particleCount);
                }
             if(keyFrame > tweenInUIFrame + 20 && keyFrame % 7 == 0 && starIndex == 5){
                     starIndex++;
                     starX =  cw / 4 + (starScaleX * 2) + 25 ;
                     tweenInStar(2, starImage3.x , starImage3.y, particleCount);
                }
            if(keyFrame > tweenInUIFrame + 10 &&keyFrame % 10 == 0 && starIndex == 0){
                 starIndex++;
                 starX =  cw / 4 + (starScaleX * 0) + 25 ;
                 tweenInStar(0, starImage1.x + 10, starImage1.y, particleCount);
            }
             if(keyFrame > tweenInUIFrame + 10 &&keyFrame % 19 == 0 && starIndex == 1){
                     starIndex++;
                     starX =  cw / 4 + (starScaleX * 1) + 25 ;
                     tweenInStar(1, starImage2.x , starImage2.y, particleCount);
                }
             if(keyFrame > tweenInUIFrame + 10 &&keyFrame % 26 == 0 && starIndex == 2){
                     starIndex++;
                     starX =  cw / 4 + (starScaleX * 2) + 25 ;
                     tweenInStar(2, starImage3.x , starImage3.y, particleCount);
                }

            if(keyFrame==10){
            tweenCloudFlare();
            createParticles(cw/2, ch/2, 0, 18, random(1,100), 50, 90, 'blobs');
        }

        if(keyFrame > 35 && keyFrame < tweenInUIFrame-45){
            if( timerTick >= timerTotal ) {
                    createParticles(random( 0, cw ), random( 0 + ch / 6, ch - ch / 6 ), 0, 15, random(1,100), 50, 80, starTypes[Math.floor(random(0, starTypes.length))], randomColor());
                    timerTick = 0;

            } else {
                timerTick++;
                loopTick ++;
            }
        }
        if(keyFrame >= tweenInUIFrame-25 && keyFrame <= tweenInUIFrame-10){
            console.log(particles.length);
            var i = Math.floor(random(particles.length / 8, particles.length));
            while(i--){
                particles[i].alpha = random(0, 0.5);
            }
        }
        if(keyFrame == tweenInUIFrame){

            tweenInUI();
            wiggleButtons(0.6, 1.02);
        }
        if(keyFrame > tweenInUIFrame + 10 && keyFrame % 10 == 0 && starIndex < 3){
       //     var starX = cw / starIndex;

           // tweenInStar(starIndex, starX, starY, 60);
          //  starIndex ++;

        }
        if(keyFrame > tweenInUIFrame + 30 && keyFrame % Math.floor(random(40,50)) == 0){
            drawRandomSparkles(0);
        }
        if(keyFrame > tweenInUIFrame + 30 && keyFrame % Math.floor(random(40,50)) == 0){
            drawRandomSparkles(1);
        }
        if(keyFrame > tweenInUIFrame + 30 && keyFrame % Math.floor(random(40,50)) == 0){
            drawRandomSparkles(2);
        }


    }
    var starTypes = ['coloredStars', 'confettiStars'];
    var tweenInUIFrame = 140;
    function randomColor(){
        return colors[Math.floor(random(0, colors.length - 1))];
    }


document.addEventListener( 'keydown', function( e ) {
    if(e.keyCode === 32){

    }
});


};

var starCount = 5;
var starIndex = 0;
