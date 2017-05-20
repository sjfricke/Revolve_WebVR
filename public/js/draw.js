//**********************\\
//Globals
//**********************\\
var radian = false;
var gridX;
var gridY;
var drawCanvas = document.getElementById("drawCanvas");
var drawContext = drawCanvas.getContext("2d");
var wireframeToggle = false;

//**********************\\
//Event Listeners
//**********************\\
drawCanvas.addEventListener("mousemove",hoverDot);                          
drawCanvas.addEventListener("mousedown",drawDot); 
document.getElementById('clearButton').onclick = clearGrid;

document.getElementById('toggleRadian').onclick = function() { 

    radian = !radian;
    drawCanvasVertex = [];
    drawContext.clearRect(0,0,500,500);
    drawGrid();
    
    if (radian) {
        $( ".showRadian" ).show();
        $( ".hideRadian" ).hide();
    } else {
        $( ".showRadian" ).hide();
        $( ".hideRadian" ).show();
    }
    hoverDot();
}

    
function clearGrid() { 
    drawCanvasVertex = [];
    drawContext.clearRect(0,0,500,500);
    drawGrid();
    drawVertex();
};
document.getElementById('viewButton').onclick = function() { 
    convertToVector2(drawCanvasVertex); //make revolve-able array
    onecall = true;
    document.getElementById('drawingSection').style.display = "none";
    document.getElementById('threejsSection').style.display = "block";
    document.getElementById('threejsSectionButtons').style.display = "block";
   // document.getElementById('drawSectionButtons').style.display = "none";
    document.getElementById('wireframeButton').style.display = "block";
};

 var offset = 500 / (10*Math.PI);

document.getElementById('functionButton').onclick = function() { 
    
    clearGrid();
    var tempY;
    var equation = document.getElementById('functionInput').value;    
   
    if(!radian){
        for (x = 0; x < 500; x = x + 10 ) {        
            tempY = eval(equation);  
            if (tempY > 500 || tempY < 0) {
                //out of graph range
                continue;
            }
            drawCanvasVertex.push(x);
            drawCanvasVertex.push(500 - tempY);
        }
    } else {

        for (x = 0; x < 51; x = x + (Math.PI / 4) ) {        
            tempY = eval(equation) * offset;  
            if (tempY > 250 || tempY < -250) {
                //out of graph range
                continue;
            }
            drawCanvasVertex.push(x * offset);
            drawCanvasVertex.push(250 - tempY);
        }
    }
    
    drawContext.clearRect(0,0,500,500);
    drawGrid();
    drawVertex();
};
//document.getElementById('loadButton').onclick = function() {
//   $.get("/api/loadSave/" + document.getElementById("loadNumber").value)
//      .done(function(response) {
//        drawCanvasVertex = response[0]["vertexs[]"];
//        convertToVector2(drawCanvasVertex); //make revolve-able array
//        onecall = true;
//        document.getElementById('drawingSection').style.display = "none";
//        document.getElementById('threejsSection').style.display = "block";
//        document.getElementById('threejsSectionButtons').style.display = "block";
//        document.getElementById('drawSectionButtons').style.display = "none";
//        //document.getElementById('wireframeButton').style.display = "none";
//        saved = true;//so they can't save the same model twice
//     })
//     .fail(function(err){
//       alert("Code Not Found!");
//   })
//   ;
//    
//}

document.getElementById('closePathButton').onclick = function() { 
    drawCanvasVertex.push(drawCanvasVertex[0]);
    drawCanvasVertex.push(drawCanvasVertex[1]);
    drawContext.clearRect(0,0,500,500);
    drawGrid();
    drawVertex();
};
document.getElementById('wireframeButton').onclick = function() { 
    wireframeToggle = !wireframeToggle;
    if (wireframeToggle) { this.style.background = "red"; this.style.color = "white";  }
    else {this.style.background = "buttonface"; this.style.color = "buttontext";}
};

//document.getElementById("divisonSelect").onchange = function() {
//    divisions = parseInt(this.value);
//}
//**********************\\
//Grid
//**********************\\
function drawGrid(){ 
    
    if (!radian) {
        
        drawContext.strokeStyle = "grey";
        drawContext.moveTo(0, 500);
        drawContext.lineTo(500, 500);


        drawContext.strokeStyle = "red";
        drawContext.lineWidth=2;      
        drawContext.stroke();
        drawContext.lineWidth=1; 
    
        for (var x = 0; x < 500; x += 10) {
          drawContext.moveTo(x, 0);
          drawContext.lineTo(x, 500);
        }

        for (var y = 0; y < 500; y += 10) {
          drawContext.moveTo(0, y);
          drawContext.lineTo(500, y);
        }

        drawContext.strokeStyle = "grey";
        drawContext.stroke();
    }
    else {
        drawContext.strokeStyle = "grey";
        drawContext.moveTo(0, 80*Math.PI);
        drawContext.lineTo(500, 80*Math.PI);


        drawContext.strokeStyle = "red";
        drawContext.lineWidth=2;      
        drawContext.stroke();
        drawContext.lineWidth=1; 

        for (var x = 0; x < 500; x += 10*Math.PI) {
          drawContext.moveTo(x, 0);
          drawContext.lineTo(x, 500);
        }

        for (var y = 0; y < 500; y += 10*Math.PI) {
          drawContext.moveTo(0, y);
          drawContext.lineTo(500, y);
        }

        drawContext.strokeStyle = "grey";
        drawContext.stroke();
    
    }
}


//**********************\\
//collection of all the vertexes
//**********************\\
var drawCanvasVertex = [];

function drawVertex() {
    for (var i = 0; i < drawCanvasVertex.length; i+=2){
        drawContext.beginPath();
        drawContext.arc(drawCanvasVertex[i],drawCanvasVertex[i+1],2.5,0,2*Math.PI);
        drawContext.fill(); 
        if (i > 1) {
            drawContext.moveTo(drawCanvasVertex[i-2],drawCanvasVertex[i-1]);
            drawContext.lineTo(drawCanvasVertex[i],drawCanvasVertex[i+1]);
            drawContext.stroke();
        }
    }
}

//**********************\\
//Hover dot function when selecting position
//**********************\\
function hoverDot(event) {
    event = event || window.event;
    
    drawContext.clearRect(0,0,500,500);
    drawGrid();
    drawVertex();
    
    gridX = event.pageX - drawCanvas.offsetLeft,
    gridY = event.pageY - drawCanvas.offsetTop;
    
    drawContext.beginPath();
    drawContext.arc(gridX,gridY,2.5,0,2*Math.PI);
    drawContext.fill(); 
}

//**********************\\
//when cavnas gets click - draws a dot
//**********************\\
function drawDot(event) {
    event = event || window.event;
       
    drawCanvasVertex.push(gridX);
    drawCanvasVertex.push(gridY);
}

window.onload = startFunction;

function startFunction(){
    drawGrid;
     $( ".showRadian" ).hide();
     $( ".hideRadian" ).show();
    hoverDot();
}
    
    