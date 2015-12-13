///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
///<reference path="UV.ts" />
///<reference path="Plane.ts" />
///<reference path="Scene.ts" />
///<reference path="Spritesheet.ts" />
/// <reference path="Stage.ts" />
/// <reference path="PlayStage.ts" />

class Game {

	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	texture: WebGLTexture;
	bufferid: WebGLBuffer;
	scene: Scene;
	spritesheet: Spritesheet;
	mvp: Float32Array;
	shader: Shader;
	map: Array<Plane> = new Array();
	stage: Stage;

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById("stage");
		this.gl = <WebGLRenderingContext>this.canvas.getContext("webgl");
		this.canvas.addEventListener("mousemove", this.mouseMove);
		this.canvas.addEventListener("click", this.mouseClick);
	}

	init = () => {
		this.mvp = createOrthographicMatrix(0, 640, 0, 480, -1, -1000);
		this.shader = new Shader(this.gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);
		var clearColor = Color.PURPLE;
		this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	}

	start = () => {
		this.scene = new Scene(this.gl, this.shader, this.texture, 10000*9);
		this.scene.mvp = this.mvp;
		this.stage = new PlayStage();
		this.stage.spritesheet = this.spritesheet;
		this.stage.init();

		this.loop();
	}

	loadTexture = (resource) => {
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, resource);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		console.log("Texture is loaded");
	}

	loadSpritesheet = (resource) =>{
		console.log("Spritesheet is loaded");
		this.spritesheet = new Spritesheet(resource);
	}

	loop = () =>{
		this.stage.update();

		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		
		this.stage.render(this.scene);
		this.scene.render();

		requestAnimationFrame(this.loop);
	}

	mouseMove = (e:MouseEvent) =>{
		this.stage.mouseMove(e);
	}

	mouseClick = (e:MouseEvent) =>{
		this.stage.mouseClick(e);
	}
}