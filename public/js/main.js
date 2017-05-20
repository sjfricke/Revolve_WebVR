var scene = new THREE.Scene(); 
var renderer = new THREE.WebGLRenderer({antialias:true,transparent:true});
renderer.setClearColor( 0xffffff );
renderer.setClearAlpha(.9);
var container = document.getElementById( 'threejsSection' );
container.appendChild(renderer.domElement);
renderer.setSize(innerWidth ,innerHeight * .9 );

var persp = new THREE.PerspectiveCamera(30, innerWidth/innerHeight, .1, 20000);

var light = new THREE.AmbientLight( 0xffffff ); 
scene.add(light);
var light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
light2.position.set( 0, 1, .30 );
scene.add(light2);
var replaceScene = [light, light2];
//light = new THREE.DirectionalLight( 0xffffff );
//light.position.set( 1, 1, 1 );
//scene.add( light );
//
//light = new THREE.DirectionalLight( 0x002288 );
//light.position.set( -1, -1, -1 );
//scene.add( light );
//
//light = new THREE.AmbientLight( 0x222222 );
//scene.add( light );


var targetLookAt = new THREE.Vector3(0,500,0);
//persp.position = {x: -650, y: 300, z: -1200};

    persp.position.z = -1000;
    persp.position.y = 1300;
    persp.position.x = 0;

persp.lookAt(targetLookAt);

var controls
controls = new THREE.OrbitControls( persp, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;

var edges;
var ii = 0;
var firstLoop = true;
var geo = new THREE.Geometry();
var oldGeoVerts = [];

function revolve(pts,segments) {
	geo = new THREE.Geometry();
    geo.vertices = oldGeoVerts;
    
 if (firstLoop && pts.length > 0) {    
    firstLoop = false;
    
	edges = [];
	for(var s = 0; s<segments; s++) { //loops through segments
		var theta = s/segments*Math.PI*2; //divides 2Pi by segments
		var rx = Math.cos(theta); //sets rx and rz to circle coords
		var rz = -Math.sin(theta);        
		var edge = []; //clears edges
		edges.push(edge); //push edge (one set of lines)
		for(var i =0; i<pts.length; i++) { //takes each vec2
			var v3 = new THREE.Vector3(pts[i].x*rx, pts[i].y, pts[i].x*rz); //sets y to y and x an z by circle coords
			geo.vertices.push(v3); //pushs to geo and edge
			edge.push(v3);
		}
	} 
 }
    
	for(var p = 0; p<pts.length-1; p++) {
//		for(var i =0;i<segments;i++) {
		//debugger;
			var side1= edges[ii];
			var side2 = edges[(ii+1)%segments];
			//I want a,b,c,d.
			var a = geo.vertices.indexOf(side1[p]);
			var b = geo.vertices.indexOf(side1[p+1]);
			
			var c = geo.vertices.indexOf(side2[p]);
			var d = geo.vertices.indexOf(side2[p+1]);
			if(a==-1||b==-1||c==-1||d==-1) {
//				debugger;
			}
			if(typeof a === 'undefined'||typeof b === 'undefined'
               ||typeof c === 'undefined'||typeof d === 'undefined') {
			}
			var face1 = new THREE.Face3(a,b,c);
			var face2 = new THREE.Face3(d,c,b);
			geo.faces.push(face1,face2);
//		}
	}
    oldGeoVerts = geo.vertices;
	geo.mergeVertices();
    try {
	   geo.computeFaceNormals();
    }
    catch (err) {
        alert("shape can't produce shadows - shape not supported at moment, sorry!");
        console.log(err);
        location.reload();
    }
//	 geo.computeVertexNormals();
	geo.computeBoundingSphere();

	return geo;
}

var geo = new THREE.Geometry;
var mesh;
var meshs = [];
var mat;
function createGeo(seg) {
    geo = revolve(revolvePoints,seg); //returns THREE.Geometry

    geo.mergeVertices();
    geo.computeVertexNormals();
   
    
    if (wireframeToggle) { mat = new THREE.MeshPhongMaterial({color:0x42A5F5,shading:THREE.SmoothShading,shininess:13,specular:0xffffff, side: THREE.DoubleSide, wireframe: true}); }
    else {mat = new THREE.MeshPhongMaterial({color:0x42A5F5,shading:THREE.SmoothShading,shininess:13,specular:0xffffff, side: THREE.DoubleSide});}
//    var mat = new THREE.MeshPhongMaterial({color:0x42A5F5,shading:THREE.SmoothShading,shininess:13,specular:0xffffff});
    
    mesh = new THREE.Mesh(geo,mat);
    meshs.push(mesh);
    scene.add(mesh);
}


var looping = true;
function render() {
//    var t = new Date().getTime()*0.00015;
//	persp.position.z = 309*Math.sin(t); 
//	persp.position.y = 30.5+Math.sin(t/5);
//	persp.position.x = 309*Math.cos(t); 
//	persp.lookAt(target.position);

	geo.verticesNeedUpdate = true;
    if (onecall) {onecall = false; looping = true;animationLoop();}
	requestAnimationFrame(render);
    controls.update();
    renderer.render(scene,persp);
}
render();

document.getElementById('unviewButton').onclick = function() { 
    location.reload(false);
    
    
    scene.remove(mesh);
    revolvePoints = [];
    document.getElementById('drawingSection').style.display = "block";
    document.getElementById('threejsSection').style.display = "none";
    document.getElementById('threejsSectionButtons').style.display = "none";
    //document.getElementById('drawSectionButtons').style.display = "block";
    document.getElementById('wireframeButton').style.display = "none";
    
    saved = false; //turns save back on for next model
    clearGrid(); //issues when adding more vertex so safe and clearing grid
};
var saved = false;
//document.getElementById('saveButton').onclick = function() { 
//    if (saved) return; //only one save per model
//    saved = true;
//    
//    var tempNumber;
// 
//    $.get("/api/count/56d3ff72779bb81333ffa4a6")
//      .done(function(response) {
//        tempNumber = response[0].count;
//        tempNumber++;
//        $.post("/api/count/56d3ff72779bb81333ffa4a6/" + tempNumber)
//            .done(function(){
//            
//            saveData(tempNumber);
//            
//        });
//   });
//};
//function saveData(codeNumber) {
//    $.post("/api/loadSave/", {
//        "vertexs[]" : drawCanvasVertex,
//        "code": codeNumber
//    })
//        .done(function(){
//        alert("Your saved code is: " + codeNumber);
//    });
//}


function animationLoop() {
    if (looping && !onecall) {
        setTimeout(function(){
            if (ii < divisions - 1) {
                ii++; 
                createGeo(divisions);                
            } else {        
                looping = false;
                setTimeout(function(){
                    for (var i = 0; i < meshs.length; i++) {
                        scene.remove(meshs[i]);
                    }
                    meshs = [];
                    ii = -1;
                    looping = true;
                    onecall = true;
                }, 250);
            }
            
            animationLoop();
        }, 80);
    }
}
//document.getElementById('test').onclick = function() { 
//    if (ii < divisions - 1) {
//        ii++;
//        createGeo(divisions);
//    }
//}