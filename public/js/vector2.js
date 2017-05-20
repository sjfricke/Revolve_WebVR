var revolvePoints = [];

function convertToVector2(vertexs) {
    for (var i = 0; i < vertexs.length; i+=2) {
        revolvePoints.push(new THREE.Vector2(vertexs[i], 500 - vertexs[i+1]));
    }
    createGeo(divisions);
}

