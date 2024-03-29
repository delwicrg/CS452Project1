/*  Rosalina Delwiche and Holly Rossmann  |  CS452 Project 1   |    March 11, 2022  */

"use strict";
    
var gl;
var myShaderSpider; 
var myShaderFruit; 
var myShaderAnt; 
var myShaderRectangle;
var myShaderTriangle;

var mouseCoordinatesUniformSpider; var mouseCoordinatesUniformAnt; var mouseCoordinatesUniformAnt_1; var mouseCoordinatesUniformAnt_2;
var mouseCoordinatesUniformTr_2; var mouseCoordinatesUniformTr_1;
var arrayOfPointsSpider = []; 
var arrayOfPointsFruit = []; var arrayOfPointsFruit2 = []; var arrayOfPointsFruit3 = []; var arrayOfPointsFruit4 = []; var arrayOfPointsFruit5 = []; 
var arrayOfPointsAnt = []; var arrayOfPointsAnt_1 = []; var arrayOfPointsAnt_2 = [];
var bufferIdSpider; 

var bufferIdTr_1; var bufferIdTr_2;
var bufferIdFruit; var bufferIdFruit2; var bufferIdFruit3; var bufferIdFruit4; var bufferIdFruit5; 
var bufferIdAnt; var bufferIdAnt_1; var bufferIdAnt_2;
var count;
var thetaSpider; 
var thetaFruit; var thetaFruit2; var thetaFruit3; var thetaFruit4; var thetaFruit5; 
var thetaAnt; var thetaAnt_1; var thetaAnt_2;
var tx = 0.0; var ty = 0.0;
var tx_ant; var ty_ant; var direction_ant;
var tx_ant_1; var ty_ant_1; var direction_ant_1;
var tx_ant_2; var ty_ant_2; var direction_ant_2;
var tx_fruit1; var ty_fruit1; var touched_fruit1;
var tx_fruit2; var ty_fruit2; var touched_fruit2;
var tx_fruit3; var ty_fruit3; var touched_fruit3;
var tx_fruit4; var ty_fruit4; var touched_fruit4;
var tx_fruit5; var ty_fruit5; var touched_fruit5;
var bufferIdRect; 
var ty_rect; var tx_rect; var touched_rect; var arrayOfPoints_rect = []; var mouseCoordinatesUniformRect;
var timeOutStart; var timeOutEnd;


var tx_Tr_1; var ty_Tr_1; var touched_Tr_1;
var tx_Tr_2; var ty_Tr_2; var touched_Tr_2;

var arrayOfPointsTr_1 = []; var bufferIdTr_1;
var arrayOfPointsTr_2 = []; var bufferIdTr_2;




var offset = 0.1;
const INCREMENT  = .05; 
var myPoint;
var gameOver = false;
var score; 
var winGame;

var interval;
var timer;
var minutes;
var seconds;


function init(){
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }

    gl.viewport( 0, 0, 500, 500 );   // set up viewport
    gl.clearColor( 0.416, 0.051, 0.514, 1,0) // set up background color
    
    score = 0;
    winGame = false;

    thetaSpider = 0.0;
    thetaFruit = 0.0; thetaFruit2 = 0.0; thetaFruit3 = 0.0; thetaFruit4 = 0.0; thetaFruit5 = 0.0;
    thetaAnt = 0.0; thetaAnt_1 = 0.0; thetaAnt_2 = 0.0;

    tx_fruit1 = 0.5; ty_fruit1 = 0.8; touched_fruit1 = false;
    tx_fruit2 = -0.4; ty_fruit2 = -0.4; touched_fruit2 = false;
    tx_fruit3 = 0.8; ty_fruit3 = -0.8; touched_fruit3 = false;
    tx_fruit4 = -0.7; ty_fruit4 = 0.6; touched_fruit4 = false;
    tx_fruit5 = -0.9; ty_fruit5 = -0.9; touched_fruit5 = false;

    tx_ant = 0.5; ty_ant = 0.5; direction_ant = "up";
    tx_ant_1 = .75; ty_ant_1 = .75; direction_ant_1 = "down";
    tx_ant_2 = -0.5; ty_ant_2 = -0.5; direction_ant_2 = "right";

    tx_Tr_1 = .6; ty_Tr_1 = .4; touched_Tr_1 = false;
    tx_Tr_2 = -.6; ty_Tr_2 = -.6; touched_Tr_2 = false;

    tx_rect = -.1; ty_rect = .5; touched_rect = false;

 

    //INITALIZE PROGRAMS
    myShaderSpider    = initShaders( gl,"vertex-shader", "fragment-shader-spider" );
    myShaderTriangle  = initShaders( gl,"vertex-shader", "fragment-shader-triangle" );
    myShaderFruit     = initShaders( gl,"vertex-shader-fruit", "fragment-shader-fruit" );
    myShaderAnt       = initShaders( gl,"vertex-shader-ant", "fragment-shader-ant" );
    myShaderRectangle = initShaders( gl,"vertex-shader-ant", "fragment-shader-rectangle" );

    //INITALIZE SHAPES AND SET UP BUFFER (INSIDE FUNCTION)
    gl.useProgram(myShaderSpider);

    mouseCoordinatesUniformSpider = gl.getUniformLocation(myShaderSpider, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniformSpider, tx, ty);

    drawSpider();
    drawFruits();
    drawAnts();
    drawSpeedChangers()

    document.getElementById("score").innerHTML = score;

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

function drawSpeedChangers(){

    //-------------------------------------triangle 1-------------------------------------------
    var p0 = vec2(0, 0); 
    var p1 = vec2(0, .1); 
    var p2 = vec2(.1,  0); 

    arrayOfPointsTr_1 = [p0,p1,p2];

    //set up buffer for the triangle
    bufferIdTr_1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdTr_1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsTr_1), gl.STATIC_DRAW);

    //-------------------------------------triangle 2-------------------------------------------
    arrayOfPointsTr_2 = [p0,p1,p2];

    //set up buffer for the triangle
    bufferIdTr_2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdTr_2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsTr_2), gl.STATIC_DRAW);

    //-------------------------------------rectangle------------------------------------------
    var p1 = vec2(0, 0); 
    var p2 = vec2(.1, 0); 
    var p3 = vec2(.1, .1); 
    var p4 = vec2(0, .1); 


    arrayOfPoints_rect = [p1,p2,p3,p4];

    //set up buffer for the rectangle
    bufferIdRect = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdRect);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints_rect), gl.STATIC_DRAW);



}

function drawFruits(){
    //Initalize Circle
    
    var theta = 0.0;
    var x;
    var y;
    var i;
    var n = 64;
    var thetastep = 2.0 * Math.PI/n;

    //------------------------------Fruit1--------------------------------
    for(i = 0; i < n; i++) {
        theta = i * thetastep;
        x = 0.03 * Math.cos(theta) + tx_fruit1; // Form: x = c cos(theta) + a
        y = 0.03 * Math.sin(theta) + ty_fruit1; // Form: y = d sin(theta) + b
        myPoint = vec2(x,y);
        arrayOfPointsFruit.push(myPoint);
    }

    //Set up buffer for fruit1
    bufferIdFruit = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFruit );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPointsFruit), gl.STATIC_DRAW );


    
    //------------------------------Fruit2--------------------------------
    for(i = 0; i < n; i++) {
        theta = i * thetastep;
        x = 0.03 * Math.cos(theta) + tx_fruit2; // Form: x = c cos(theta) + a
        y = 0.03 * Math.sin(theta) + ty_fruit2; // Form: y = d sin(theta) + b
        myPoint = vec2(x,y);
        arrayOfPointsFruit2.push(myPoint);
    }

    //Set up buffer for fruit1
    bufferIdFruit2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFruit2 );
    gl.bufferData( gl.ARRAY_BUFFER,
                    flatten(arrayOfPointsFruit2), gl.STATIC_DRAW );

    //------------------------------Fruit3--------------------------------
    for(i = 0; i < n; i++) {
        theta = i * thetastep;
        x = 0.03 * Math.cos(theta) + tx_fruit3; // Form: x = c cos(theta) + a
        y = 0.03 * Math.sin(theta) + ty_fruit3; // Form: y = d sin(theta) + b
        myPoint = vec2(x,y);
        arrayOfPointsFruit3.push(myPoint);
    }

    //Set up buffer for fruit1
    bufferIdFruit3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFruit3);
    gl.bufferData( gl.ARRAY_BUFFER,
                    flatten(arrayOfPointsFruit3), gl.STATIC_DRAW );


    //------------------------------Fruit4--------------------------------
    for(i = 0; i < n; i++) {
        theta = i * thetastep;
        x = 0.03 * Math.cos(theta) + tx_fruit4; // Form: x = c cos(theta) + a
        y = 0.03 * Math.sin(theta) + ty_fruit4; // Form: y = d sin(theta) + b
        myPoint = vec2(x,y);
        arrayOfPointsFruit4.push(myPoint);
    }

    //Set up buffer for fruit1
    bufferIdFruit4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFruit4 );
    gl.bufferData( gl.ARRAY_BUFFER,
                    flatten(arrayOfPointsFruit4), gl.STATIC_DRAW );


    //------------------------------Fruit5--------------------------------
    for(i = 0; i < n; i++) {
        theta = i * thetastep;
        x = 0.03 * Math.cos(theta) + tx_fruit5; // Form: x = c cos(theta) + a
        y = 0.03 * Math.sin(theta) + ty_fruit5; // Form: y = d sin(theta) + b
        myPoint = vec2(x,y);
        arrayOfPointsFruit5.push(myPoint);
    }

    //Set up buffer for fruit1
    bufferIdFruit5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFruit5 );
    gl.bufferData( gl.ARRAY_BUFFER,
                    flatten(arrayOfPointsFruit5), gl.STATIC_DRAW );
}

function drawAnts(){
    var p0 = vec2(-0.025, -0.05); 
    var p1 = vec2(-0.05, -0.025); 
    var p2 = vec2(-0.05,  0.025); 
    var p3 = vec2(-0.025,  0.05); 
    var p4 = vec2( 0.025,  0.05); 
    var p5 = vec2( 0.05,  0.025); 
    var p6 = vec2( 0.05, -0.025); 
    var p7 = vec2( 0.025, -0.05);

    //-------------------------------------ant 1-------------------------------------------
    arrayOfPointsAnt = [p0,p1,p2,p3,p4,p5,p6,p7];

    //set up buffer for the ant
    bufferIdAnt = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsAnt), gl.STATIC_DRAW);

    //-------------------------------------ant 2-------------------------------------------
    arrayOfPointsAnt_1 = [p0,p1,p2,p3,p4,p5,p6,p7];

    //set up buffer for the ant
    bufferIdAnt_1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt_1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsAnt_1), gl.STATIC_DRAW);

    //-------------------------------------ant 3-------------------------------------------
    arrayOfPointsAnt_2 = [p0,p1,p2,p3,p4,p5,p6,p7];

    //set up buffer for the ant
    bufferIdAnt_2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt_2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsAnt_2), gl.STATIC_DRAW);

}

function moveSquareKeys( event ){
    gl.useProgram(myShaderSpider);
    var theKeyCode = event.keyCode;
   
    if(!(touched_rect == true && remaining > timeOutEnd)){
        if(theKeyCode == 65){           // a, move left
            if(tx - offset < .9 && tx - offset > -.9){tx -= offset;}
            else{tx = -.9;}
        } 
        else if(theKeyCode == 68 ){     // d, move right
            if(tx + offset < .9 && tx + offset > -.9){tx += offset;}
            else{tx = .9;}
        } 
        else if(theKeyCode == 87 ){     // w, move up
            if(ty + offset < .9 && ty + offset > -.9){ty += offset;}  
            else{ty = .9;}     
         }
        else if(theKeyCode == 83 ){     // s, move down
            if(ty - offset < .9 && ty - offset > -.9){ty -= offset;} 
            else{ty = -.9;}       
        }
        
        if(theKeyCode == 65 || theKeyCode == 68  || theKeyCode == 87  || theKeyCode == 83){
            var mouseCoordinatesUniform = gl.getUniformLocation(myShaderSpider, "mouseCoordinates");
            gl.uniform2f(mouseCoordinatesUniform,tx,ty);
        }
    }

     if(theKeyCode == 82 ){     // to restart the game
        window.location.reload();

}

}

function isCloseToAnt(){
    //-------------------------------------ant 1-------------------------------------------
    var tx_ant_arr = [tx_ant, (tx_ant-.05),(tx_ant+.05)];
    var ty_ant_arr = [ty_ant, (ty_ant-.05),(ty_ant+.05)];
    var x = 0;

    for(x = 0; x < 3; x++){
        if((tx_ant_arr[x] > (tx-.1)) && (tx_ant_arr[x]< (tx+.1))) 
        {
             if( (ty_ant_arr[x] > (ty-.1)) && (ty_ant_arr[x]< (ty+.1))) {
                 console.log("DIE\n");
                 gameOver = true;
             }      
        }
    }

    //-------------------------------------ant 2-------------------------------------------
    var tx_ant_arr_1 = [tx_ant_1, (tx_ant_1-.05),(tx_ant_1+.05)];
    var ty_ant_arr_1 = [ty_ant_1, (ty_ant_1-.05),(ty_ant_1+.05)];
    var x = 0;

    for(x = 0; x < 3; x++){
        if((tx_ant_arr_1[x] > (tx-.1)) && (tx_ant_arr_1[x]< (tx+.1))) 
        {
             if( (ty_ant_arr_1[x] > (ty-.1)) && (ty_ant_arr_1[x]< (ty+.1))) {
                 console.log("DIE\n");
                 gameOver = true;
             }      
        }
    }

    //-------------------------------------ant 3-------------------------------------------
    var tx_ant_arr_2 = [tx_ant_2, (tx_ant_2-.05),(tx_ant_2+.05)];
    var ty_ant_arr_2 = [ty_ant_2, (ty_ant_2-.05),(ty_ant_2+.05)];
    var x = 0;

    for(x = 0; x < 3; x++){
        if((tx_ant_arr_2[x] > (tx-.1)) && (tx_ant_arr_2[x]< (tx+.1))) 
        {
             if( (ty_ant_arr_2[x] > (ty-.1)) && (ty_ant_arr_2[x]< (ty+.1))) {
                 console.log("DIE\n");
                 gameOver = true;
             }      
        }
    }

}

function powerChangeProximity(){
    //-------------------------------------triangle 1-------------------------------------------

    if(touched_Tr_1 != true){
        var tx_Tr_arr = [tx_Tr_1, (tx_Tr_1 - .05),(tx_Tr_1 + .05)];
        var ty_Tr_arr = [ty_Tr_1, (ty_Tr_1 - .05),(ty_Tr_1 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_Tr_arr[x] > (tx-.1)) && (tx_Tr_arr[x]< (tx+.1))) 
            {
                if( (ty_Tr_arr[x] > (ty-.1)) && (ty_Tr_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_Tr_1 = true;
                    
                    offset += INCREMENT;
                }      
            }
        }
    }

    //-------------------------------------triangle 2------------------------------------------

    if(touched_Tr_2 != true){
        var tx_Tr_arr = [tx_Tr_2, (tx_Tr_2 - .05),(tx_Tr_2 + .05)];
        var ty_Tr_arr = [ty_Tr_2, (ty_Tr_2 - .05),(ty_Tr_2 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_Tr_arr[x] > (tx-.1)) && (tx_Tr_arr[x]< (tx+.1))) 
            {
                if( (ty_Tr_arr[x] > (ty-.1)) && (ty_Tr_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_Tr_2 = true;

                    offset += INCREMENT;
                }      
            }
        }
    }


    //-------------------------------------rectangle------------------------------------------

    if(touched_rect != true){
        var tx_rect_arr = [tx_rect, (tx_rect - .05),(tx_rect + .05)];
        var ty_rect_arr = [ty_rect, (ty_rect - .05),(ty_rect + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_rect_arr[x] > (tx-.1)) && (tx_rect_arr[x]< (tx+.1))) 
            {
                if( (ty_rect_arr[x] > (ty-.1)) && (ty_rect_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_rect = true;   
                    timeOutStart = remaining;
                    timeOutEnd = timeOutStart - 5; 
                }      
            }
        }
    }
}

function isCloseToFruit(){
    //-------------------------------------fruit 1-------------------------------------------
    if(touched_fruit1 != true){
        var tx_fruit1_arr = [tx_fruit1, (tx_fruit1 - .05),(tx_fruit1 + .05)];
        var ty_fruit1_arr = [ty_fruit1, (ty_fruit1 - .05),(ty_fruit1 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_fruit1_arr[x] > (tx-.1)) && (tx_fruit1_arr[x]< (tx+.1))) 
            {
                if( (ty_fruit1_arr[x] > (ty-.1)) && (ty_fruit1_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_fruit1 = true;
                    document.getElementById("score").innerHTML = score;
                }      
            }
        }
    }

    //-------------------------------------fruit 2-------------------------------------------
    if(touched_fruit2 != true){
        var tx_fruit2_arr = [tx_fruit2, (tx_fruit2 - .05),(tx_fruit2 + .05)];
        var ty_fruit2_arr = [ty_fruit2, (ty_fruit2 - .05),(ty_fruit2 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_fruit2_arr[x] > (tx-.1)) && (tx_fruit2_arr[x]< (tx+.1))) 
            {
                if( (ty_fruit2_arr[x] > (ty-.1)) && (ty_fruit2_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_fruit2 = true;
                    document.getElementById("score").innerHTML = score;
                }      
            }
        }
    }

    //-------------------------------------fruit 3-------------------------------------------
    if(touched_fruit3 != true){
        var tx_fruit3_arr = [tx_fruit3, (tx_fruit3 - .05),(tx_fruit3 + .05)];
        var ty_fruit3_arr = [ty_fruit3, (ty_fruit3 - .05),(ty_fruit3 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_fruit3_arr[x] > (tx-.1)) && (tx_fruit3_arr[x]< (tx+.1))) 
            {
                if( (ty_fruit3_arr[x] > (ty-.1)) && (ty_fruit3_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_fruit3 = true;
                    document.getElementById("score").innerHTML = score;
                }      
            }
        }
    }

    //-------------------------------------fruit 4-------------------------------------------
    if(touched_fruit4 != true){
        var tx_fruit4_arr = [tx_fruit4, (tx_fruit4 - .05),(tx_fruit4 + .05)];
        var ty_fruit4_arr = [ty_fruit4, (ty_fruit4 - .05),(ty_fruit4 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_fruit4_arr[x] > (tx-.1)) && (tx_fruit4_arr[x]< (tx+.1))) 
            {
                if( (ty_fruit4_arr[x] > (ty-.1)) && (ty_fruit4_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_fruit4 = true;
                    document.getElementById("score").innerHTML = score;
                }      
            }
        }
    }

    //-------------------------------------fruit 5-------------------------------------------
    if(touched_fruit5 != true){
        var tx_fruit5_arr = [tx_fruit5, (tx_fruit5 - .05),(tx_fruit5 + .05)];
        var ty_fruit5_arr = [ty_fruit5, (ty_fruit5 - .05),(ty_fruit5 + .05)];
        var x = 0;

        for(x = 0; x < 3; x++){
            if((tx_fruit5_arr[x] > (tx-.1)) && (tx_fruit5_arr[x]< (tx+.1))) 
            {
                if( (ty_fruit5_arr[x] > (ty-.1)) && (ty_fruit5_arr[x]< (ty+.1))) {
                    console.log("POINT\n");
                    touched_fruit5 = true;
                    document.getElementById("score").innerHTML = score;
                }      
            }
        }
    }
}

function calculateScore(){
    score = 0;
    if(touched_fruit1 == true){score += 1;}
    if(touched_fruit2 == true){ score += 1;}
    if(touched_fruit3 == true){ score += 1;}
    if(touched_fruit4 == true){ score += 1;}
    if(touched_fruit5 == true){ score += 1;}
}

function win(){
    if(score == 5){
        winGame = true;
        gameOver = true;
    }
}



function render(){  
    var divScore = document.getElementById("score");
    const div = document.getElementById("score");   

    if(score == 5){
        remaining = 1;

        divScore.innerHTML = score + " YOU WIN!";
        div.style.color = "#05e305";
        gameOver = true;
    }

    else if((remaining == 0 && score !=5) || (gameOver == true && score != 5)){
        remaining = 1; 
        divScore.innerHTML = score + " YOU LOST";
        div.style.color = "crimson";
        gameOver = true;
    }
    else{
        divScore.innerHTML = score;
        div.style.color = "black";
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    /*----------------------------------Spider------------------------------------------*/
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

/*--------------------------------Fruit 1-----------------------------------------------------*/
    if(touched_fruit1 != true){
        //using shader program for the fruit
        gl.useProgram(myShaderFruit);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit);

        //set up attributes for the fruit based on the current buffer
        var myPositionFruit = gl.getAttribLocation( myShaderFruit, "myPosition" );
        gl.vertexAttribPointer( myPositionFruit, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( myPositionFruit);

        //draw the fruit
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 64);
    }


/*---------------------------------Fruit 2-----------------------------------------------------*/
if(touched_fruit2 != true){
    //using shader program for the fruit
    gl.useProgram(myShaderFruit);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit2);

    //set up attributes for the fruit based on the current buffer
    var myPositionFruit2 = gl.getAttribLocation( myShaderFruit, "myPosition" );
    gl.vertexAttribPointer( myPositionFruit2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionFruit2);

    //draw the fruit
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 64);
}

/*---------------------------------Fruit 3-----------------------------------------------------*/
if(touched_fruit3 != true){
    //using shader program for the fruit
    gl.useProgram(myShaderFruit);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit3);

    //set up attributes for the fruit based on the current buffer
    var myPositionFruit3 = gl.getAttribLocation( myShaderFruit, "myPosition" );
    gl.vertexAttribPointer( myPositionFruit3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionFruit3);

    //draw the fruit
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 64);
}

/*---------------------------------Fruit 4-----------------------------------------------------*/
if(touched_fruit4 != true){
    //using shader program for the fruit
    gl.useProgram(myShaderFruit);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit4);

    //set up attributes for the fruit based on the current buffer
    var myPositionFruit4 = gl.getAttribLocation( myShaderFruit, "myPosition" );
    gl.vertexAttribPointer( myPositionFruit4, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionFruit4);

    //draw the fruit
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 64);
}

/*---------------------------------Fruit 5-----------------------------------------------------*/
if(touched_fruit5 != true){
    //using shader program for the fruit
    gl.useProgram(myShaderFruit);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdFruit5);

    //set up attributes for the fruit based on the current buffer
    var myPositionFruit5 = gl.getAttribLocation( myShaderFruit, "myPosition" );
    gl.vertexAttribPointer( myPositionFruit5, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionFruit5);

    //draw the fruit
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 64);
}

/*--------------------------------ant 0---------------------------------------------------*/

    //using shader program for the ant
    gl.useProgram(myShaderAnt);

    //update the animation angle for the ant
    thetaAnt = thetaAnt + 0.1;
    var thetaLocAnt = gl.getUniformLocation(myShaderAnt, "theta");
    gl.uniform1f(thetaLocAnt, thetaAnt);

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


    //-------------------------------------------ant 1----------------------------------------------

    //using shader program for the ant_1
    gl.useProgram(myShaderAnt);

    //update the animation angle for the ant_1
    thetaAnt_1 = thetaAnt_1 + 0.1;
    var thetaLocAnt = gl.getUniformLocation(myShaderAnt, "theta");
    gl.uniform1f(thetaLocAnt, thetaAnt_1);

    if(direction_ant_1 == "down"){
        ty_ant_1 -= 0.01;
    } else if (direction_ant_1 == "up"){
        ty_ant_1 += 0.01;
    }    

    if(ty_ant_1 >= 1){
       direction_ant_1 = "down";
    }else if(ty_ant <= -0.25){
        direction_ant_1 = "up";
    } 

    mouseCoordinatesUniformAnt_1 = gl.getUniformLocation(myShaderAnt, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniformAnt_1, tx_ant_1, ty_ant_1);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt_1);

    //set up attributes for the fruit based on the current buffer
    var myPositionAnt = gl.getAttribLocation( myShaderAnt, "myPosition" );
    gl.vertexAttribPointer( myPositionAnt, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionAnt);

    //set up attributes for the fruit based on the current buffer
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);  


 //------------------------------ant 2 (this one will move left to right) ------------------------------------

    //using shader program for the ant_1
    gl.useProgram(myShaderAnt);

    //update the animation angle for the ant_1
    thetaAnt_2 = thetaAnt_2 + 0.1;
    var thetaLocAnt = gl.getUniformLocation(myShaderAnt, "theta");
    gl.uniform1f(thetaLocAnt, thetaAnt_2);

    if(direction_ant_2 == "left"){
        tx_ant_2 -= 0.01;
    } else if (direction_ant_2 == "right"){
        tx_ant_2 += 0.01;
    }    

    if(tx_ant_2 >= 1){
       direction_ant_2 = "left";
    }else if(tx_ant_2 <= -1){
        direction_ant_2 = "right";
    } 

    mouseCoordinatesUniformAnt_2 = gl.getUniformLocation(myShaderAnt, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniformAnt_2, tx_ant_2, ty_ant_2);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdAnt_2);

    //set up attributes for the fruit based on the current buffer
    var myPositionAnt = gl.getAttribLocation( myShaderAnt, "myPosition" );
    gl.vertexAttribPointer( myPositionAnt, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionAnt);

    //set up attributes for the fruit based on the current buffer
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);  


    /*--------------------------------Triangle 1-----------------------------------------------------*/
    if(touched_Tr_1 != true){
        //using shader program for the fruit
        gl.useProgram(myShaderTriangle);

        mouseCoordinatesUniformTr_1 = gl.getUniformLocation(myShaderTriangle, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniformTr_1, tx_Tr_1, ty_Tr_1);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdTr_1);

        //set up attributes for the triangle based on the current buffer
        var myPositionTr = gl.getAttribLocation( myShaderTriangle, "myPosition" );
        gl.vertexAttribPointer( myPositionTr, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( myPositionTr);

        //draw the triangle
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    }


    /*--------------------------------Triangle 2-----------------------------------------------------*/
    if(touched_Tr_2 != true){
        //using shader program for the fruit
        gl.useProgram(myShaderTriangle);


        mouseCoordinatesUniformTr_2 = gl.getUniformLocation(myShaderTriangle, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniformTr_2, tx_Tr_2, ty_Tr_2);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdTr_2);

        //set up attributes for the triangle based on the current buffer
        var myPositionTr = gl.getAttribLocation( myShaderTriangle, "myPosition" );
        gl.vertexAttribPointer( myPositionTr, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( myPositionTr);

        //draw the triangle
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

    }

    /*--------------------------------Rectangle-----------------------------------------------------*/  
    if(touched_rect != true){

        //using shader program for the fruit
        gl.useProgram(myShaderRectangle);

        mouseCoordinatesUniformRect = gl.getUniformLocation(myShaderRectangle, "mouseCoordinates");
        gl.uniform2f(mouseCoordinatesUniformRect, tx_rect, ty_rect);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdRect);

        //set up attributes for the rectangle based on the current buffer
        var myPositionRect = gl.getAttribLocation( myShaderRectangle, "myPosition" );
        gl.vertexAttribPointer( myPositionRect, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( myPositionRect);

        //draw the rectangle
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }



    
    if(gameOver == false){
        calculateScore();
        requestAnimFrame(render);
        isCloseToAnt();
        isCloseToFruit();
        powerChangeProximity();

        if(touched_rect == true && remaining > timeOutEnd){
            var time_left = remaining - timeOutEnd; 
            divScore.innerHTML = score + " YOU ARE IN TIMEOUT - " + time_left + " SECONDS LEFT";
            div.style.color = "orange";            
        }

        win();
    }
}


