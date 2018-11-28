/**
 * Created by Admin on 26/03/14.
 */
  function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }
      function drawImages(images) {
        var stage = new Kinetic.Stage({
          container: 'canvasStars',
          width: 578,
          height: 200
        });
        var layer = new Kinetic.Layer();

        // darth vader
        var width = 200;
        var height = 137;
        var darthVaderImg = new Kinetic.Image({
          image: images.darthVader,
          offset: {x: width / 2, y: height / 2},
          width: width,
          height: height
        });

        darthVaderImg.on('mouseover', function() {
          this.scale({x:1.2, y:1.2});
          stage.draw();
        });
        darthVaderImg.on('mouseout', function() {
          this.scale({x:1, y:1});
          stage.draw();
        });

        darthVaderImg.position({x:200, y:100});
        layer.add(darthVaderImg);

        // yoda
        var width = 93;
        var height = 104;
        var yodaImg = new Kinetic.Image({
          image: images.yoda,
          offset: {x: width / 2, y: height / 2},
          width: width,
          height: height
        });

        yodaImg.on('mouseover', function() {
          this.scale({x:1.2, y:1.2});
          stage.draw();
        });
        yodaImg.on('mouseout', function() {
          this.scale({x:1, y:1});
          stage.draw();
        });

        yodaImg.position({x:400, y:100});
        layer.add(yodaImg);

        stage.add(layer);
      }
      var sources = {
        darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
        yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg'
      };
      loadImages(sources, drawImages);
