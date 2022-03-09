/*  Rosalina Delwiche and Holly Rossmann  |  CS452 Project 1   |    March 11, 2022  */

"use strict";
    
var gl;
var myShaderSpider; var myShaderFruit; var myShaderAnt;
var mouseCoordinatesUniformSpider; var mouseCoordinatesUniformAnt;
var arrayOfPointsSpider = []; var arrayOfPointsFruit = []; var arrayOfPointsAnt = [];
var bufferIdSpider; var bufferIdFruit; var bufferIdAnt;
var count;
var thetaSpider; var thetaFruit; var thetaAnt;
var tx = 0.0; var ty = 0.0;
var tx_ant; var ty_ant; var direction_ant;
var offset = 0.01;
const INCREMENT  = .001; 
var myPoint;

function init(){
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }

    gl.viewport( 0, 0, 700, 700 );   // set up viewport
    gl.clearColor( 0.4, 0.4, 0.4, 1.0); // set up background color

    thetaSpider = 0.0;
    thetaFruit = 0.0;
    thetaAnt = 0.0;
    
    tx_ant = 0.0;
    ty_ant = 0.0;
    direction_ant = "up";

    //INITALIZE PROGRAMS
    myShaderSpider = initShaders( gl,"vertex-shader", "fragment-shader-spider" );
    myShaderFruit  = initShaders( gl,"vertex-shader-fruit", "fragment-shader-fruit" );
    myShaderAnt    = initShaders( gl,"vertex-shader-ant", "fragment-shader-ant" );

    //INITALIZE SHAPES AND SET UP BUFFER (INSIDE FUNCTION)
    gl.useProgram(myShaderSpider);

    mouseCoordinatesUniformSpider = gl.getUniformLocation(myShaderSpider, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniformSpider, tx, ty);

    drawSpider();
    drawFruit(0.5,0.8);
    drawAnt();

    render();
}

function drawSpider(){
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

function drawFruit(xFruit, yFruit){
    //Initalize Circle
    var theta = 0.0;
    var x;
    var y;
    var i;
    var n = 64;
    var thetastep = 2.0 * Math.PI/n;

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

function drawAnt(){
    console.log("begin");

    var p0 = vec2(-0.025, -0.05); 
    var p1 = vec2(-0.05, -0.025); 
    var p2 = vec2(-0.05,  0.025); 
    var p3 = vec2(-0.025,  0.05); 
    var p4 = vec2( 0.025,  0.05); 
    var p5 = vec2( 0.05,  0.025); 
    var p6 = vec2( 0.05, -0.025); 
    var p7 = vec2( 0.025, -0.05); 

    arrayOfPointsAnt = [p0,p1,p2,p3,p4,p5,p6,p7];

    //set up buffer for the ant
    bufferIdAnt = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsAnt), gl.STATIC_DRAW);

    console.log("end");
}

function render(){
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    //using shader program for the spider
    gl.useProgram(myShaderSpider);

    //update the animation angle for the spider
    mouseCoordinatesUniformSpider = gl.getUniformLocation(myShaderSpider, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniformSpider, tx, ty);

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
    thetaFruit = thetaFruit + 0.01;
    var thetaLocFruit = gl.getUniformLocation(myShaderFruit, "theta");
    gl.uniform1f(thetaLocFruit, thetaFruit);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit);

    //set up attributes for the fruit based on the current buffer
    var myPositionFruit = gl.getAttribLocation( myShaderFruit, "myPosition" );
    gl.vertexAttribPointer( myPositionFruit, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionFruit);

    //draw the fruit
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 64);

/*-------------------------------------------------------------------------------------*/

    //using shader program for the ant_1
    gl.useProgram(myShaderAnt);

    //update the animation angle for the ant_1
    thetaAnt = thetaAnt + 0.1;
    var thetaLocAnt = gl.getUniformLocation(myShaderAnt, "theta");
    gl.uniform1f(thetaLocAnt, thetaAnt);

    //console.log("direction: " + direction_ant + " ty_ant: " + ty_ant);
    if(direction_ant == "down"){
        ty_ant -= 0.01;
    } else if (direction_ant == "up"){
        ty_ant += 0.01;
    }    

    if(ty_ant >= 1){
       direction_ant = "down";
    }else if(ty_ant <= -1){
        direction_ant = "up";
    } 

    mouseCoordinatesUniformAnt = gl.getUniformLocation(myShaderAnt, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniformAnt, tx_ant, ty_ant);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt);

    //set up attributes for the fruit based on the current buffer
    var myPositionAnt = gl.getAttribLocation( myShaderAnt, "myPosition" );
    gl.vertexAttribPointer( myPositionAnt, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionAnt);

    //set up attributes for the fruit based on the current buffer
       gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);  

    requestAnimFrame(render);
}



function moveSquareKeys( event ){
    gl.useProgram(myShaderSpider);
    var theKeyCode = event.keyCode;
   
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
}