///<reference path="Shader.ts" />
///<reference path="Color.ts" />
var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("stage");
var gl: WebGLRenderingContext = <WebGLRenderingContext>canvas.getContext("webgl");

var clearColor = new Color(0xFFFF00FF);

var shader = new Shader(gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);

gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
gl.clear(gl.COLOR_BUFFER_BIT);