///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
///<reference path="UV.ts" />
///<reference path="Plane.ts" />
///<reference path="Scene.ts" />
class Game {

	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	texture: WebGLTexture;
	bufferid: WebGLBuffer;
	plane: Plane;
	scene: Scene;
	
	mvp: Float32Array;
	shader: Shader;


	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById("stage");
		this.gl = <WebGLRenderingContext>this.canvas.getContext("webgl");
	}

	init = () => {
		this.mvp = createOrthographicMatrix(0, 640, 0, 480, -1, -1000);
		this.shader = new Shader(this.gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);
		var clearColor = Color.PURPLE;
		this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
		this.plane = new Plane(16, 16, 10, 32, 32, Color.WHITE, UV.STDUV);

	}

	start = () => {
		console.log("Start");
		this.scene = new Scene(this.gl, this.shader, this.texture, 1000*3);
		this.loop();
	}

	loadTexture = (resource) => {
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, resource);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		console.log("Texture is loaded");
	}


	loop = () =>{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		this.scene.mvp = this.mvp;
		this.scene.addPlane(this.plane);
		this.scene.render();

		requestAnimationFrame(this.loop);
	}
}