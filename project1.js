/*  
    Rosalina Delwiche and Holly Rossmann
    CS452 Project 1
    March 11, 2022
*/

    "use strict";
    
    var canvas;
    var gl;
    var myShaderProgram;
    
    var thetaAnim;
    var thetaLoc;
    var stopStartFlag;

    var tx;
    var ty;   
    
    
    function init(){
        canvas = document.getElementById("gl-canvas"); // Set up the canvas

        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) { alert( "WebGL is not available" ); }
    
        gl.viewport( 0, 0, 700, 700 );   // set up viewport
        
        gl.clearColor( 0.0, 0.0, 0.0, 0); // set up background color
    
        myShaderProgram = initShaders( gl,"vertex-shader", "fragment-shader-spider" ); // pink
    
        gl.useProgram( myShaderProgram );
    
        gl.clear( gl.COLOR_BUFFER_BIT ); // force the webgl context to clear the color buffer
    
        thetaAnim = 0.0;
        stopStartFlag = 0;
        tx = 0.0;
        ty = 0.0;
    
        var mouseCoordinatesUniform = gl.getUniformLocation(myShaderProgram, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniform,tx,ty);
    
    
        setUpSpider();

       //drawSpider();
    }
        
    function setUpSpider(){
        console.log("begin setup");
        var arrayOfPoints=[];

        var theta = 0.0;
        var x = 0.0;
        var y = 0.0;
        var n = 64;
        var thetastep = 2.0 * Math.PI/n;
        var i = 0;

        var myPoint;

        for( i = 0; i < n; i++) {
            theta = i * thetastep;
            x = 0.08*Math.cos(theta); // Form: x = c cos(theta) + a (a would offset from origin)
            y = 0.08*Math.sin(theta); // Form: y = d sin(theta) + b
            myPoint = vec2(x,y);
            arrayOfPoints.push(myPoint);
            console.log("point (" + x + " , "+ y + ") added");
        }

        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER,
                      flatten(arrayOfPoints), gl.STATIC_DRAW );
       
        var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
        gl.vertexAttribPointer( myPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPosition );
    
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
        console.log("end setup");
    }
    

    /*
   function increase(){
    speed = speed * 1.75;
    }

    function decrease(){
        speed = speed * .75;
    }

    function startRotate(){
        stopStartFlag = 1;   
    }

    function stopRotate(){
        stopStartFlag = 0;   
    }
    */



/*
    function moveSpider(event){
        var theKeyCode = event.keyCode;
        var offset = 0.1;
        if (theKeyCode==65) {       //a
            console.log("a key hit");
            direction = "left";
        } else if(theKeyCode==68){  //d
            console.log("d key hit");
            direction = "right";
        } else if(theKeyCode==83){  //s
            console.log("s key hit");
            direction="down";
        } else if (theKeyCode ==87) {  //w
            console.log("w key hit");
            direction = "up";
        }
        var mouseCoordinatesUniform = gl.getUniformLocation(myShaderProgram, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniform, tx, ty);
    }

    */
  
  
  /*  function drawSpider(){
        gl.clear( gl.COLOR_BUFFER_BIT ); // force the webgl context to clear the color buffer
        thetaAnim += .03 * stopStartFlag;
        var thetaUniform = gl.getUniformLocation(myShaderProgram, "theta");

        if(direction == "left"){
            tx = tx - speed;
        }else if(direction=="right"){
            tx = tx + speed;
        }else if(direction=="down"){
            ty = ty - speed;
        }else if(direction=="up"){
            ty = ty + speed;
        }

        gl.uniform1f(thetaUniform, thetaAnim)
    
        gl.drawArrays(gl.TRIANGLE_FAN,0,6);
    
        requestAnimFrame(drawSpider);
    }
*/

/*
    function drawAnts(){

    }

    function moveAnts(){

    }

    */