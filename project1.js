/*  Rosalina Delwiche and Holly Rossmann  |  CS452 Project 1   |    March 11, 2022  */

"use strict";
    
var gl;
var myShaderSpider;
var myShaderFruit;

var arrayOfPointsSpider = [];
var arrayOfPointsFruit = [];

var bufferIdSpider;
var bufferIdFruit;

var count;
var n = 64;

var thetaAnim = 0.0;
var thetaLoc;
var stopStartFlag = 0.0;

var tx = 0.0;
var ty = 0.0;

var flagX = 0;
var flagY = 0;
    
var offset = 0.01;

const INCREMENT  = .001; 

var theta = 0.0;
var x;
var y;
var i;
var n = 64;
var thetastep = 2.0 * Math.PI/n;

var myPoint;

function init(){
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }

    gl.viewport( 0, 0, 700, 700 );   // set up viewport
    gl.clearColor( 1.0, 0.0, 0.0, 1.0); // set up background color
    //gl.clear( gl.COLOR_BUFFER_BIT );

    //INITALIZE PROGRAMS
    myShaderSpider = initShaders( gl,"vertex-shader", "fragment-shader-spider" );
    myShaderFruit   = initShaders( gl,"vertex-shader", "fragment-shader-fruit" );

    //INITALIZE SHAPES AND SET UP BUFFER (INSIDE FUNCTION)
    gl.useProgram(myShaderSpider);
    setUpSpider();

    gl.useProgram(myShaderFruit);
    drawFruit(0.5,0.8);

    render();
    
}


function drawFruit(xFruit, yFruit){
    //Initalize Circle
    //var arrayOfPointsFruit=[];

    for(i = 0; i < n; i++) {
        theta = i * thetastep;
        x = 0.1 * Math.cos(theta) + xFruit; // Form: x = c cos(theta) + a
        y = 0.1 * Math.sin(theta) + yFruit; // Form: y = d sin(theta) + b
        myPoint = vec2(x,y);
        arrayOfPointsFruit.push(myPoint);
    }

    //Set up buffer for the circle
    bufferIdFruit = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFruit );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPointsFruit), gl.STATIC_DRAW );
}


function setUpSpider(){
    //initalize spider
    console.log("beginning of spider setup");

    var p0 = vec2(-.1,0);
    var p1 = vec2(-.05, .1);
    var p2 = vec2(.05, .1);
    var p3 = vec2(.1, 0);
    var p4 = vec2(.05, -.1);
    var p5 = vec2(-.05, -.1);

    arrayOfPointsSpider = [p0,p1,p2,p3,p4,p5];

     //set up buffer for the spider
    bufferIdSpider = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdSpider );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPointsSpider), gl.STATIC_DRAW );  
    
}


function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);

    //using shader program for the spider
    gl.useProgram(myShaderSpider);

    //update the animation angle for the spider
    thetaAnim += .03 * stopStartFlag;
    var thetaUniform = gl.getUniformLocation(myShaderSpider, "theta");
    gl.uniform1f(thetaUniform, thetaAnim)

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdSpider);

    //set up attributes for the spider based on the current buffer
    var myPositionSpider = gl.getAttribLocation( myShaderSpider, "myPosition" );
    gl.vertexAttribPointer( myPositionSpider, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionSpider );


    //draw the spider
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6); 

/*-------------------------------------------------------------------------------------*/
    //using shader program for the fruit
    gl.useProgram(myShaderFruit);

    //update the animation angle for the fruit ---- (none needed?)
    //thetaAnim += .03 * stopStartFlag;
    //var thetaUniform = gl.getUniformLocation(myShaderSpider, "theta");
    //gl.uniform1f(thetaUniform, thetaAnim)

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit);

    //set up attributes for the fruit based on the current buffer
    var myPositionFruit = gl.getAttribLocation( myShaderFruit, "myPosition" );
    gl.vertexAttribPointer( myPositionFruit, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionFruit);


    //draw the fruit
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);

    requestAnimFrame(render);
}



function moveSquareKeys( event ){
    console.log("moving spider now")
    gl.useProgram(myShaderSpider);
    var theKeyCode = event.keyCode;
    //offset;     
   
    if(theKeyCode == 65){           // a, move left
        tx -= offset;
    } 
    else if(theKeyCode == 68 ){     // d, move right
        tx += offset;
    } 
    else if(theKeyCode == 87 ){     // w, move up
        ty += offset;
    }
    else if(theKeyCode == 83 ){     // s, move down
        ty -= offset;
    }

    var mouseCoordinatesUniform = gl.getUniformLocation(myShaderSpider, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniform,tx,ty);

    console.log("done moving. tx was " + tx + " ty was "+ ty);

    
}


    
/*
function moveSpider(event){
    console.log("start move spider");
    var canvasX = event.clientX;
    var canvasY = event.clientY;

    tx =  2.0 * canvasX/700.0 - 1;
    ty = -2.0 * canvasY/700.0 + 1;

    var mouseCoordinatesUniform = gl.getUniformLocation(myShaderSpider, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniform,tx,ty);

    render()
    ;console.log("end move spider");

}
*/


/*
function startRotate(){ stopStartFlag = 1;}
function stopRotate(){ stopStartFlag = 0.0;}


function incSpeed(){ offset += INCREMENT;}

function decSpeed(){ 
    if((offset - INCREMENT) >= 0){
        offset -= INCREMENT;
    }
    else{ offset = 0;}
}    
*/


/*
function drawSpider(){
    gl.clear( gl.COLOR_BUFFER_BIT ); // force the webgl context to clear the color buffer
    //drawFruit(0.5,0.8);
    gl.useProgram(myShaderProgram);
    
    thetaAnim += .03 * stopStartFlag;
    var thetaUniform = gl.getUniformLocation(myShaderProgram, "theta");
    gl.uniform1f(thetaUniform, thetaAnim)

    gl.drawArrays(gl.TRIANGLE_FAN,0,6);

    

    gl.useProgram(myShaderProgram);
    requestAnimFrame(drawSpider);

    gl.useProgram(myShaderFruit);
    drawFruit(0.5,0.8);
}

*/


/*
function drawAnts(){

}

function moveAnts(){

}
*/