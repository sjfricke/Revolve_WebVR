var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias:true,transparent:true});
renderer.setClearColor(0x000000,0);
renderer.setClearAlpha(0);
document.body.appendChild(renderer.domElement);
renderer.setSize(innerWidth,innerHeight);

var persp = new THREE.PerspectiveCamera(30, innerWidth/innerHeight, .1, 1000);

persp.position.z = -10;
persp.lookAt(new THREE.Vector3());

var pawnPts = [
	new THREE.Vector2( 0.0 ,  0.69 ),
	new THREE.Vector2( 0.18 ,  0.69 ),
	new THREE.Vector2( 0.2 ,  0.69 ),
	new THREE.Vector2( 0.2 ,  0.68 ),
	new THREE.Vector2( 0.2 ,  0.65 ),
	new THREE.Vector2( 0.2 ,  0.64 ),
	new THREE.Vector2( 0.19 ,  0.64 ),
	 new THREE.Vector2( 0.12 ,  0.64 ),
	 new THREE.Vector2( 0.12 ,  0.41 ),
	 new THREE.Vector2( 0.15 ,  0.35 ),
	 new THREE.Vector2( 0.15 ,  0.35 ),
	 new THREE.Vector2( 0.162 ,  0.32 ),
	 new THREE.Vector2( 0.195 ,  0.29 ),
	 new THREE.Vector2( 0.23 ,  0.27 ),
	 new THREE.Vector2( 0.24 ,  0.255 ),
	 new THREE.Vector2( 0.24 ,  0.25 ),
	 new THREE.Vector2( 0.24 ,  0.225 ),
	 new THREE.Vector2( 0.25 ,  0.22 ),
	 new THREE.Vector2( 0.26 ,  0.19 ),
	 new THREE.Vector2( 0.35 ,  0.12 ),
	 new THREE.Vector2( 0.4 ,  0.11 ),
	 new THREE.Vector2( 0.4 ,  0.1 ),
	 new THREE.Vector2( 0.4 ,  0.05 ),
	 new THREE.Vector2( 0.4 ,  0.045 ),
	 new THREE.Vector2( 0.35 ,  0.05 ),
	 new THREE.Vector2( 0.36 ,  0.029 ),
	 new THREE.Vector2( 0.366 ,  0.02 ),
	 new THREE.Vector2( 0 ,  0 )

]	

var queenPts = [
new THREE.Vector2(0.171, 0.724),
 new THREE.Vector2(11.368, 3.368),
 new THREE.Vector2(18.932, 7.799),
 new THREE.Vector2(25.208, 21.171),
 new THREE.Vector2(25.208, 28.876),
 new THREE.Vector2(22.984, 36.093),
 new THREE.Vector2(15.541, 45.84),
 new THREE.Vector2(10.583, 48.071),
 new THREE.Vector2(14.797, 49.558),
 new THREE.Vector2(22.729, 57.987),
 new THREE.Vector2(27.856, 68.398),
 new THREE.Vector2(29.174, 80.296),
 new THREE.Vector2(48.758, 75.339),
 new THREE.Vector2(52.228, 75.339),
 new THREE.Vector2(58.673, 81.289),
 new THREE.Vector2(60.41, 86.742),
 new THREE.Vector2(59.417, 91.699),
 new THREE.Vector2(51.485, 95.171),
 new THREE.Vector2(46.031, 100.128),
 new THREE.Vector2(39.833, 117.977),
 new THREE.Vector2(43.429, 134.089),
 new THREE.Vector2(47.271, 140.782),
 new THREE.Vector2(50.617, 142.518),
 new THREE.Vector2(54.335, 148.22),
 new THREE.Vector2(51.732, 155.036),
 new THREE.Vector2(47.271, 156.772),
 new THREE.Vector2(44.792, 157.888),
 new THREE.Vector2(46.62, 159.122),
 new THREE.Vector2(54.438, 160.998),
 new THREE.Vector2(58.816, 170.38),
 new THREE.Vector2(57.878, 177.261),
 new THREE.Vector2(47.558, 181.638),
 new THREE.Vector2(35.987, 181.638),
 new THREE.Vector2(30.358, 186.642),
 new THREE.Vector2(27.856, 229.792),
 new THREE.Vector2(29.227, 259.498),
 new THREE.Vector2(35.394, 290.498),
 new THREE.Vector2(42.207, 309.212),
 new THREE.Vector2(43.456, 312.863),
 new THREE.Vector2(48.562, 312.903),
 new THREE.Vector2(62.056, 313.433),
 new THREE.Vector2(63.599, 315.417),
 new THREE.Vector2(62.277, 318.502),
 new THREE.Vector2(59.192, 323.791),
 new THREE.Vector2(59.192, 328.044),
 new THREE.Vector2(64.294, 333.147),
 new THREE.Vector2(79.603, 341.82),
 new THREE.Vector2(88.959, 354.919),
 new THREE.Vector2(90.745, 364.614),
 new THREE.Vector2(88.109, 372.439),
 new THREE.Vector2(84.536, 377.37),
 new THREE.Vector2(91.679, 377.37),
 new THREE.Vector2(95.592, 379.921),
 new THREE.Vector2(96.953, 384.174),
 new THREE.Vector2(96.273, 410.199),
 new THREE.Vector2(95.082, 416.323),
 new THREE.Vector2(89.639, 416.323),
 new THREE.Vector2(0.171, 417.137)]
 
 queenPts.forEach(function(v) {
	v.x/=250;
	v.y/=-250;
	v.y+=1.6;
 });

function revolve(pts,segments) {
	var geo = new THREE.Geometry();

	var edges = [];


	for(var s = 0;s<segments;s++) {
		var theta = s/segments*Math.PI*2;
		var rx = Math.cos(theta);
		var rz = -Math.sin(theta);
		var edge = [];
		edges.push(edge);
		for(var i =0;i<pts.length;i++) {
			var v3 = new THREE.Vector3(pts[i].x*rx, pts[i].y, pts[i].x*rz);
			geo.vertices.push(v3);
			edge.push(v3);
		}
	}

	for(var p = 0;p<pts.length-1;p++) {
		for(var i =0;i<segments;i++) {
		
			var side1= edges[i];
			var side2 = edges[(i+1)%segments];
			//I want a,b,c,d.
			var a = geo.vertices.indexOf(side1[p]);
			var b = geo.vertices.indexOf(side1[p+1]);
			
			var c = geo.vertices.indexOf(side2[p]);
			var d = geo.vertices.indexOf(side2[p+1]);
			if(a==-1||b==-1||c==-1||d==-1) {
				debugger;
			}
			
			var face1 = new THREE.Face3(a,b,c);
			var face2 = new THREE.Face3(d,c,b);
			geo.faces.push(face1,face2);
		}
	}

	geo.mergeVertices();
	geo.computeFaceNormals();
	// geo.computeVertexNormals();
	geo.computeBoundingSphere();

	return geo;
}

var light = new THREE.PointLight(0xccffff,1,22);
scene.add(light);
light.position.z+=9;
light.position.y+=3;
light.position.x+=9;
var light = new THREE.PointLight(0xfff0cf,1,22);
scene.add(light);
light.position.z+=9;
light.position.y+=3;
light.position.x-=9;


var geo = revolve(pawnPts,32);
// var geo = revolve(queenPts,32);



geo.mergeVertices();
geo.computeVertexNormals();
var mat = new THREE.MeshPhongMaterial({color:0xffffff,shading:THREE.SmoothShading,shininess:13,specular:0xffffff});
var mat2 = new THREE.MeshPhongMaterial({color:0x202020,shading:THREE.SmoothShading,shininess:140,specular:0x101010});

var mesh = new THREE.Mesh(geo,mat);
var sphere = new THREE.SphereGeometry(0.19, 18,18);
sphere.vertices.forEach(function(v) { v.y+=0.84;});
geo.merge(sphere);
// var s = 3;
// mesh.scale.set(s,s,s);

scene.add(mesh);
for(var i =-4;i<4;i++) {
	var mI = new THREE.Mesh(geo,mat2);
	scene.add(mI);
	mI.position.x = 1*i;
	mI.position.z = 5;

	if(i==0) continue;
	var mI = new THREE.Mesh(geo,mat);
	scene.add(mI);
	mI.position.x = 1*i;
}

var tile = new THREE.CubeGeometry(1,.03,1);
tile.computeFaceNormals();
tile.vertices.forEach(function(v) {if(v.y>0) v.x*=0.975, v.z*=0.975;});
for(var j = -1;j<7;j++) {
	for(var i =-4;i<4;i++) {
		var tileIJ = new THREE.Mesh(tile, ((i+j)%2==0)?mat:mat2);
		scene.add(tileIJ);
		tileIJ.position.x = i;
		tileIJ.position.z = j;
	}
}


var target = new THREE.Mesh(new THREE.SphereGeometry(1/19,10,10), new THREE.MeshBasicMaterial({color:0xff0000}));
// scene.add(target);

var queen = new THREE.Mesh(revolve(queenPts,32),mat);
queen.geometry.computeFaceNormals();
queen.geometry.computeVertexNormals();
queen.position.z+=1;
scene.add(queen);
queen = new THREE.Mesh(queen.geometry, mat2);
scene.add(queen);
queen.position.z+=4;


target.position.set(1,0,3);
function render() {
	var t = new Date().getTime()*0.00015;
	persp.position.z = 9*Math.sin(t); 
	persp.position.y = 1.5+Math.sin(t/5);
	persp.position.x = 9*Math.cos(t); 
	persp.lookAt(target.position);

	geo.verticesNeedUpdate = true;
	renderer.render(scene,persp);
	requestAnimationFrame(render);
}

render();