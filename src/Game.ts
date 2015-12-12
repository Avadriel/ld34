///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
///<reference path="UV.ts" />
///<reference path="Plane.ts" />
///<reference path="Scene.ts" />
///<reference path="Spritesheet.ts" />
class Game {

	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	texture: WebGLTexture;
	bufferid: WebGLBuffer;
	plane: Plane;
	plane2: Plane;
	scene: Scene;
	spritesheet: Spritesheet;
	mvp: Float32Array;
	shader: Shader;
	map: Array<Plane> = new Array();

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById("stage");
		this.gl = <WebGLRenderingContext>this.canvas.getContext("webgl");
	}

	init = () => {
		this.mvp = createOrthographicMatrix(0, 640, 0, 480, -1, -1000);
		this.shader = new Shader(this.gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);
		var clearColor = Color.PURPLE;
		this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
	}

	start = () => {
		console.log("Start");
		this.scene = new Scene(this.gl, this.shader, this.texture, 50000*3);
		this.plane = new Plane(50, 40, 10, 32, 32, Color.WHITE, this.spritesheet.getUVFromName("dirt_0"));
		this.plane2 = new Plane(200, 40, 10, 32, 32, Color.WHITE, this.spritesheet.getUVFromName("grass_0"));

		for (var x = 0; x < (640 / 16); x++){
			for (var y = 0; y < (480 / 16); y++){
				this.map.push(new Plane(x * 16 + 8, y * 18 + 8, 10, 16, 16, Color.WHITE, this.spritesheet.getUVFromName("grass_0")));
			}
		}

		console.log(this.map.length)

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

	loadSpritesheet = (resource) =>{
		this.spritesheet = new Spritesheet(resource);
	}

	loop = () =>{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		this.scene.mvp = this.mvp;
		for (var i = 0; i < this.map.length; i++) {
			this.scene.addPlane(this.map[i]);
		}

		this.scene.render();

		requestAnimationFrame(this.loop);
	}
}