///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("stage");
var gl: WebGLRenderingContext = <WebGLRenderingContext>canvas.getContext("webgl");

var clearColor = new Color(0xFFFF00FF);

var shader = new Shader(gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);

console.log(createOrthographicMatrix(0, 640, 0, 480, -1, -1000));

gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
gl.clear(gl.COLOR_BUFFER_BIT);