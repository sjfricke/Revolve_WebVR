
var textureRedbullCrushed;


// i will use this function's scope for things that will be shared
// across all RedbullCrusheds - they can all have the same buffers and shaders
// note - twgl keeps track of the locations for uniforms and attributes for us!
var shaderProgram = undefined;
var buffers = undefined;

function skyboxInit(drawingState) {
    var gl=drawingState.gl;
    // create the shaders once - for all RedbullCrusheds
    if (!shaderProgram) {
        shaderProgram = twgl.createProgramInfo(gl, ["texture-vs", "texture-fs"]);
    }
    if (!buffers) {

        buffers = twgl.createBufferInfoFromArrays(drawingState.gl, roomArray);           
    }
    textureRedbullCrushed = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureRedbullCrushed);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var imageRedbullCrushed = new Image();
    imageRedbullCrushed.crossOrigin = "anonymous";
//        imageRedbullCrushed.src = redbullBumpImage;  
    imageRedbullCrushed.src = roomImage;

    imageRedbullCrushed.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, textureRedbullCrushed);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageRedbullCrushed);

          // Option 1 : Use mipmap, select interpolation mode
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

};


function drawSkybox(drawingState) {
    // we make a model matrix to place the RedbullCrushed in the world
    var modelM = twgl.m4.scaling([1.0,1.0,1.0]);

    twgl.m4.setTranslation(modelM,[0.0,0.0,0.0],modelM);
    // the drawing coce is straightforward - since twgl deals with the GL stuff for us
    var gl = drawingState.gl;
    gl.useProgram(shaderProgram.program);

    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram.program, "texSampler");
    gl.uniform1i(shaderProgram.texSampler1, 0);

    twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
    twgl.setUniforms(shaderProgram,{
        view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection, model: modelM });
    gl.bindTexture(gl.TEXTURE_2D, textureRedbullCrushed);
    twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
};

