
var gl;   // The webgl context.

 var isValidGraphicsObject = function (object) {
   

    return true;
 }



//the canvas
var canvas;

var projM = twgl.m4.identity();
var cameraM = twgl.m4.identity();
var viewM = twgl.m4.identity();

window.onload = function() {
    "use strict";


    canvas = document.getElementById('canvasMain');
    var gl = twgl.getWebGLContext(canvas);    
    
    var drawingState = {
        gl : gl,
        proj : twgl.m4.identity(),
        view : twgl.m4.identity(),
        camera : twgl.m4.identity(),
        sunDirection : [0,1,0]
    }
    

    // information for the cameras
    var lookAt = [0,0,0]; 
    var lookFrom = [0,5,-10];
    var fov = 1.1;

    var arcball = new ArcBall(canvas);

    // for timing
    var realtime = 0
    var lastTime = Date.now();

    // cheesy keyboard handling
    var keysdown = {};

    
    skyboxInit(drawingState);    
    
    
    // the actual draw function - which is the main "loop"
    function draw() {
        // advance the clock appropriately (unless its stopped)
        var curTime = Date.now();
            realtime += (curTime - lastTime);
        lastTime = curTime;

        // first, let's clear the screen
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // figure out the transforms
        projM = twgl.m4.perspective(fov, 1, 0.1, 1000);
        cameraM = twgl.m4.lookAt(lookFrom,lookAt,[0,1,0]);
        viewM = twgl.m4.inverse(cameraM);

 

        // get lighting information
        var tod = 6;
        var sunAngle = Math.PI * (tod)/24;
        var sunDirection = [Math.cos(sunAngle),Math.sin(sunAngle),0];

//        // gets wind info
//        var wind = Number(windSlider.Wind.value);
        
        // make a real drawing state for drawing
        var drawingState = {
            gl : gl,
            proj : projM,   // twgl.m4.identity(),
            view : viewM,   // twgl.m4.identity(),
            camera : cameraM,
            timeOfDay : tod,
            sunDirection : sunDirection,
            realtime : realtime
        }
        
        drawSkybox(drawingState);

        window.requestAnimationFrame(draw);
    };
    draw();
};
