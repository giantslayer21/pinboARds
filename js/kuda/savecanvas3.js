var x = -1;
var y = -1;
var x2 = -1;
var y2 = -1;
var context;
var canvas;
function loadPad() {
    //bind the 'Reset' function
    //to the click event of reset button
    document.getElementById("resetButton").onclick = Reset;

    //get the reference to the canvas
    const canvas = document.getElementById( 'drawing-canvas' );

    //access the 2D context of the choosen canvas
    context = canvas.getContext('2d');

    canvas.onmousedown = function(e) {
        //here we calculate the position of mouse
        //on the canvas
        x = e.clientX - e.target.offsetLeft;
        y = e.clientY - e.target.offsetTop;

        canvas.addEventListener("mousemove",mouseMoveEventHandler,true);
    }
    canvas.onmouseup = function(e) {
        x = e.clientX - e.target.offsetLeft;
        y = e.clientY - e.target.offsetTop;
        canvas.removeEventListener("mousemove",mouseMoveEventHandler,true);
    }

    document.getElementById("postImageButton").onclick = function(e) {
        document.getElementById("imageDataField").value = canvas.toDataURL();
        return true;
    }
}

function mouseMoveEventHandler(e){
    //here we calculate the position of mouse
    //on the canvas
    x2 = e.clientX - e.target.offsetLeft;
    y2= e.clientY - e.target.offsetTop;

    drawLine(x,y,x2,y2);
    x=x2;
    y=y2;
}

//x1,y1 are the initial coordinates of the line
//x2,y2 are the final coordinates of the line
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    //context moves to the initial point
    context.moveTo(x1,y1);
    //context draws the line to the final point
    context.lineTo(x2,y2);
    //the line is stroked on to the canvas
    context.stroke();
}




//this function clears the canvas
function Reset() {
    context.clearRect(0,0,800,200);
}

window.addEventListener("load",loadPad,true);


function saveImage(){
try{
    var canvas = document.getElementById("canvas");
    var data = canvas.toDataURL("image/png");
    $.ajax({
        url: "saveAsImage.php",
        data:{data:data},
        type:"POST",
        success:function(r){
            $("#result").html(r);
        }

    });
}catch(e){
    alert(e.message);
}
}