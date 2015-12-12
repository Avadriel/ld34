///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
///<reference path="UV.ts" />
///<reference path="Plane.ts" />
class Game {

	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	texture: WebGLTexture;
	bufferid: WebGLBuffer;
	plane: Plane;
	
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
		this.bufferid = this.gl.createBuffer();
	}

	start = () => {
		console.log("Start");
		this.loop();
	}

	loadTexture = (resource) => {
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, resource);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}


	loop = () =>{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		var data = new Array<number>(9 * 6);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferid);

		var j = 0;
		for (var i = 0; i < this.plane.v.length; i++){
			var vertex = this.plane.v[i];
			data[j+0] = vertex.x
			data[j+1] = vertex.y
			data[j+2] = vertex.z
			data[j+3] = vertex.r
			data[j+4] = vertex.g
			data[j+5] = vertex.b
			data[j+6] = vertex.a
			data[j+7] = vertex.u
			data[j+8] = vertex.v
			j += 9;
		}

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

		var p = this.shader.program;
		this.gl.useProgram(p);

		var mvp_matrix = this.gl.getUniformLocation(p, "u_mvp_matrix");
		this.gl.uniformMatrix4fv(mvp_matrix, false, this.mvp);

		this.gl.activeTexture(this.gl.TEXTURE0);
  		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

  		var u_sampler = this.gl.getUniformLocation(p, "u_sampler");
		this.gl.uniform1i(u_sampler, 0);

		var a_vertex = this.gl.getAttribLocation(p, "a_vertex");
		this.gl.enableVertexAttribArray(a_vertex);
		this.gl.vertexAttribPointer(a_vertex, 3, this.gl.FLOAT, false, 9*4, 0);

		var a_color = this.gl.getAttribLocation(p, "a_color");
		this.gl.enableVertexAttribArray(a_color);
		this.gl.vertexAttribPointer(a_color, 4, this.gl.FLOAT, false, 9*4, 3*4);

		var a_texcoord = this.gl.getAttribLocation(p, "a_texcoord");
		this.gl.enableVertexAttribArray(a_texcoord);
		this.gl.vertexAttribPointer(a_texcoord, 2, this.gl.FLOAT, false, 9*4, 7*4);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

		requestAnimationFrame(this.loop);
	}
}