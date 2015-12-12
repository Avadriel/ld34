///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
class Game {

	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	texture: WebGLTexture;

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById("stage");
		this.gl = <WebGLRenderingContext>this.canvas.getContext("webgl");
	}

	init(){
		var clearColor = new Color(0xFFFF00FF);
		var shader = new Shader(this.gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);

		var mvp = createOrthographicMatrix(0, 640, 0, 480, -1, -1000);

		this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	start(){
		console.log("Start");
	}

	loadTexture(resource){
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, resource);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}
}