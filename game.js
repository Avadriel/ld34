var Color = (function () {
    function Color(argb) {
        this.a = ((argb >> 24) & 255) / 255;
        this.r = ((argb >> 16) & 255) / 255;
        this.g = ((argb >> 8) & 255) / 255;
        this.b = (argb & 255) / 255;
    }
    Color.WHITE = new Color(0xFFFFFFFF);
    Color.PURPLE = new Color(0xFFFF00FF);
    return Color;
})();
var Shader = (function () {
    function Shader(gl, vertexShaderSource, fragmentShaderSource) {
        this.gl = gl;
        this.program = gl.createProgram();
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vertexShader));
        }
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(fragmentShader));
        }
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            var lastError = gl.getProgramInfoLog(this.program);
            console.warn("Error in program linking:" + lastError);
            gl.deleteProgram(this.program);
        }
    }
    return Shader;
})();
function createOrthographicMatrix(left, right, top, bottom, near, far) {
    var a = 2 / (right - left);
    var b = 2 / (top - bottom);
    var c = -2 / (far - near);
    var d = -((right + left) / (right - left));
    var e = -((top + bottom) / (top - bottom));
    var f = -((far + near) / (far - near));
    return new Float32Array([
        a, 0, 0, 0,
        0, b, 0, 0,
        0, 0, c, 0,
        d, e, f, 1
    ]);
}
var UV = (function () {
    function UV(u, v, u2, v2) {
        this.u = u;
        this.v = v;
        this.u2 = u2;
        this.v2 = v2;
    }
    UV.STDUV = new UV(0, 0, 1, 1);
    return UV;
})();
var Vertex = (function () {
    function Vertex(x, y, z, r, g, b, a, u, v) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.u = u;
        this.v = v;
    }
    return Vertex;
})();
///<reference path="Color.ts" />
///<reference path="UV.ts" />
///<reference path="Vertex.ts" />
///<reference path="UV.ts" />
var Plane = (function () {
    function Plane(cx, cy, z, hw, hh, color, uv) {
        //TODO may implement if use
        this.rotation = 0;
        this.v = new Array(6);
        this.cx = cx;
        this.cy = cy;
        this.z = z;
        this.hw = hw;
        this.hh = hh;
        this.color = color;
        this.uv = uv;
        this.v[0] = new Vertex(cx - hw, cy - hh, z, color.r, color.g, color.b, color.a, uv.u, uv.v);
        this.v[1] = new Vertex(cx - hw, cy + hh, z, color.r, color.g, color.b, color.a, uv.u, uv.v2);
        this.v[2] = new Vertex(cx + hw, cy - hh, z, color.r, color.g, color.b, color.a, uv.u2, uv.v);
        this.v[3] = new Vertex(cx + hw, cy - hh, z, color.r, color.g, color.b, color.a, uv.u2, uv.v);
        this.v[4] = new Vertex(cx + hw, cy + hh, z, color.r, color.g, color.b, color.a, uv.u2, uv.v2);
        this.v[5] = new Vertex(cx - hw, cy + hh, z, color.r, color.g, color.b, color.a, uv.u, uv.v2);
    }
    return Plane;
})();
///<reference path="Plane.ts" />
///<reference path="Shader.ts" />
var Scene = (function () {
    function Scene(gl, shader, texture, numberOfTriangles) {
        this.vertexCount = 0;
        this.numberOfTriangles = numberOfTriangles;
        this.data = new Float32Array(this.numberOfTriangles);
        this.shader = shader;
        this.gl = gl;
        this.bufferid = this.gl.createBuffer();
        this.texture = texture;
    }
    Scene.prototype.addPlane = function (plane) {
        var j = this.vertexCount * 9;
        for (var i = 0; i < plane.v.length; i++) {
            var vertex = plane.v[i];
            this.data[j + 0] = vertex.x;
            this.data[j + 1] = vertex.y;
            this.data[j + 2] = vertex.z;
            this.data[j + 3] = vertex.r;
            this.data[j + 4] = vertex.g;
            this.data[j + 5] = vertex.b;
            this.data[j + 6] = vertex.a;
            this.data[j + 7] = vertex.u;
            this.data[j + 8] = vertex.v;
            j += 9;
        }
        this.vertexCount += plane.v.length;
    };
    Scene.prototype.render = function () {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferid);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW);
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
        this.gl.vertexAttribPointer(a_vertex, 3, this.gl.FLOAT, false, 9 * 4, 0);
        var a_color = this.gl.getAttribLocation(p, "a_color");
        this.gl.enableVertexAttribArray(a_color);
        this.gl.vertexAttribPointer(a_color, 4, this.gl.FLOAT, false, 9 * 4, 3 * 4);
        var a_texcoord = this.gl.getAttribLocation(p, "a_texcoord");
        this.gl.enableVertexAttribArray(a_texcoord);
        this.gl.vertexAttribPointer(a_texcoord, 2, this.gl.FLOAT, false, 9 * 4, 7 * 4);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
        this.vertexCount = 0;
    };
    return Scene;
})();
///<reference path="UV.ts" />
var Spritesheet = (function () {
    function Spritesheet(texturepacker) {
        this.texturepacker = texturepacker;
    }
    Spritesheet.prototype.getUVFromName = function (name) {
        var obj = this.texturepacker.frames[name].frame;
        var w = this.texturepacker.meta.size.w;
        var h = this.texturepacker.meta.size.h;
        console.log(new UV(obj.x / w, obj.y / h, obj.w / w, (obj.y + obj.h) / h));
        return new UV(obj.x / w, obj.y / h, (obj.x + obj.w) / w, (obj.y + obj.h) / h);
    };
    return Spritesheet;
})();
///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
///<reference path="UV.ts" />
///<reference path="Plane.ts" />
///<reference path="Scene.ts" />
///<reference path="Spritesheet.ts" />
var Game = (function () {
    function Game() {
        var _this = this;
        this.init = function () {
            _this.mvp = createOrthographicMatrix(0, 640, 0, 480, -1, -1000);
            _this.shader = new Shader(_this.gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);
            var clearColor = Color.PURPLE;
            _this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
        };
        this.start = function () {
            console.log("Start");
            _this.scene = new Scene(_this.gl, _this.shader, _this.texture, 1000 * 3);
            _this.plane = new Plane(50, 40, 10, 32, 32, Color.WHITE, _this.spritesheet.getUVFromName("dirt_0"));
            _this.plane2 = new Plane(200, 40, 10, 32, 32, Color.WHITE, _this.spritesheet.getUVFromName("grass_0"));
            _this.loop();
        };
        this.loadTexture = function (resource) {
            _this.texture = _this.gl.createTexture();
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.texture);
            _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, resource);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.NEAREST);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.NEAREST);
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, null);
            console.log("Texture is loaded");
        };
        this.loadSpritesheet = function (resource) {
            _this.spritesheet = new Spritesheet(resource);
        };
        this.loop = function () {
            _this.gl.clear(_this.gl.COLOR_BUFFER_BIT);
            _this.scene.mvp = _this.mvp;
            _this.scene.addPlane(_this.plane);
            _this.scene.addPlane(_this.plane2);
            _this.scene.render();
            requestAnimationFrame(_this.loop);
        };
        this.canvas = document.getElementById("stage");
        this.gl = this.canvas.getContext("webgl");
    }
    return Game;
})();
///<reference path="Game.ts" />
var game = new Game();
game.init();
var loader = new Loader();
loader.add("texture", "res/ld34.png");
loader.add("spritesheet", "res/ld34.json");
loader.load(function (loader, resources) {
    game.loadTexture(resources.texture.data);
    game.loadSpritesheet(resources.spritesheet.data);
});
loader.on('complete', game.start);
