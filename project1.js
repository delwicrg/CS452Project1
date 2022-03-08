/*  
    Rosalina Delwiche and Holly Rossmann
    CS452 Project 1
    March 11, 2022
*/

    "use strict";
    
    var canvas;
    var gl;
    var myShaderProgram;
    
    var thetaAnim = 0.0;
    var thetaLoc;
    var stopStartFlag = 0.0;
    
    var tx = 0.0;
    var ty = 0.0;

    var flagX = 0;
    var flagY = 0;
        
    var offset = 0.1;
    
    const INCREMENT  = .001; 

    
    
    
    function init(){
        // Set up the canvas
        canvas = document.getElementById("gl-canvas");
        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) { alert( "WebGL is not available" ); }
    
        gl.viewport( 0, 0, 700, 700 );   // set up viewport
        
        gl.clearColor( 0.0, 0.0, 128.0, 1.0); // set up background color
    
    
        myShaderProgram = initShaders( gl,"vertex-shader", "fragment-shader-hexagon" ); // pink
        gl.useProgram( myShaderProgram );
    
    
    
        gl.clear( gl.COLOR_BUFFER_BIT ); // force the webgl context to clear the color buffer
    
        thetaAnim = 0.0;
        stopStartFlag = 0.0;
        tx = 0.0;
        ty = 0.0;
    
    
    
        var mouseCoordinatesUniform = gl.getUniformLocation(myShaderProgram, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniform,tx,ty);
    
    
        setUpHexagon();
    
        requestAnimFrame(drawHexagon);
    }
    
    function moveSquareKeys( event ){
        var theKeyCode = event.keyCode;
        offset;     
       
        if(theKeyCode == 65){           // a, move left
            tx -= offset;
            flagX = -1.0;
            flagY = 0.0;
        } 
        else if(theKeyCode == 68 ){     // d, move right
            tx += offset;
            flagX = 1.0;
            flagY = 0.0;
        } 
        else if(theKeyCode == 87 ){     // w, move up
            ty += offset;
            flagX = 0.0;
            flagY = 1.0;
        }
        else if(theKeyCode == 83 ){     // s, move down
            ty -= offset;
            flagX = 0.0;
            flagY = -1.0;
        }
    
        var mouseCoordinatesUniform = gl.getUniformLocation(myShaderProgram, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniform,tx,ty);
    }
    
    
        
    function setUpHexagon() {
        var p0 = vec2(-.1,0);
        var p1 = vec2(-.05, .1);
        var p2 = vec2(.05, .1);
        var p3 = vec2(.1, 0);
        var p4 = vec2(.05, -.1);
        var p5 = vec2(-.05, -.1);
    
        var arrayOfPoints = [p0,p1,p2,p3,p4,p5];
    
    
         // Create a buffer on the graphics card and send array to the buffer for use in the shaders
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER,
                      flatten(arrayOfPoints), gl.STATIC_DRAW );  
        
        // Create a pointer that iterates over the array of points in the shader code
        var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
        gl.vertexAttribPointer( myPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( myPosition );
         
        // Force a draw of the triangle using the 'drawArrays()' call
        
    }
    
    function moveHexagon(event){
        var canvasX = event.clientX;
        var canvasY = event.clientY;
    
        tx =  2.0 * canvasX/700.0 - 1;
        ty = -2.0 * canvasY/700.0 + 1;
    
        var mouseCoordinatesUniform = gl.getUniformLocation(myShaderProgram, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniform,tx,ty);
    
    }
    

    function startRotate(){ stopStartFlag = 1;}
    function stopRotate(){ stopStartFlag = 0.0;}

    
    function incSpeed(){ offset += INCREMENT;}
    function decSpeed(){ 
    if((offset - INCREMENT) >= 0){
        offset -= INCREMENT;
    }
    else{ offset = 0;}
}    
    
    
    function drawHexagon(){
        gl.clear( gl.COLOR_BUFFER_BIT ); // force the webgl context to clear the color buffer
    
        thetaAnim += .03 * stopStartFlag;
        var thetaUniform = gl.getUniformLocation(myShaderProgram, "theta");
        gl.uniform1f(thetaUniform, thetaAnim)
    
        gl.drawArrays(gl.TRIANGLE_FAN,0,6);
    
        requestAnimFrame(drawHexagon);
    }