var Color = (function () {
    function Color(argb) {
        this.a = ((argb >> 24) & 255) / 255;
        this.r = ((argb >> 16) & 255) / 255;
        this.g = ((argb >> 8) & 255) / 255;
        this.b = (argb & 255) / 255;
    }
    Color.WHITE = new Color(0xFFFFFFFF);
    Color.PURPLE = new Color(0xFFFF00FF);
    Color.GREY = new Color(0xFF888888);
    return Color;
})();
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
    Plane.prototype._update = function () {
        var color = this.color;
        this.v[0] = new Vertex(this.cx - this.hw, this.cy - this.hh, this.z, color.r, color.g, color.b, color.a, this.uv.u, this.uv.v);
        this.v[1] = new Vertex(this.cx - this.hw, this.cy + this.hh, this.z, color.r, color.g, color.b, color.a, this.uv.u, this.uv.v2);
        this.v[2] = new Vertex(this.cx + this.hw, this.cy - this.hh, this.z, color.r, color.g, color.b, color.a, this.uv.u2, this.uv.v);
        this.v[3] = new Vertex(this.cx + this.hw, this.cy - this.hh, this.z, color.r, color.g, color.b, color.a, this.uv.u2, this.uv.v);
        this.v[4] = new Vertex(this.cx + this.hw, this.cy + this.hh, this.z, color.r, color.g, color.b, color.a, this.uv.u2, this.uv.v2);
        this.v[5] = new Vertex(this.cx - this.hw, this.cy + this.hh, this.z, color.r, color.g, color.b, color.a, this.uv.u, this.uv.v2);
    };
    Plane.prototype.setUV = function (uv) {
        this.uv = uv;
        this._update();
    };
    Plane.prototype.setPosition = function (x, y) {
        this.cx = x;
        this.cy = y;
        this._update();
    };
    Plane.prototype.setColor = function (color) {
        this.color = color;
        this._update();
    };
    return Plane;
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
        return new UV(obj.x / w, obj.y / h, (obj.x + obj.w) / w, (obj.y + obj.h) / h);
    };
    return Spritesheet;
})();
/// <reference path="Plane.ts" />
/// <reference path="Spritesheet.ts" />
var Entity = (function () {
    function Entity(spritesheet) {
    }
    Entity.prototype.update = function () { };
    return Entity;
})();
/// <reference path="Entity.ts" />
/// <reference path="UV.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant(spritesheet, x, y) {
        _super.call(this, spritesheet);
        this.growTime = 0;
        this.life = 0;
        this.sprites = new Array();
        this.spriteIndex = 0;
        this.x = 0;
        this.y = 0;
        this.spriteIndex = 0;
        this.x = x;
        this.y = y;
    }
    Plant.prototype.init = function () {
        this.plane = new Plane(this.x, this.y, 15, 16, 16, Color.WHITE, this.sprites[0]);
    };
    Plant.prototype.update = function () {
        this.life++;
        if ((this.life % this.growTime) == 0) {
            this.spriteIndex++;
            if (this.spriteIndex < this.sprites.length) {
                this.plane.setUV(this.sprites[this.spriteIndex]);
            }
            else {
            }
        }
    };
    return Plant;
})(Entity);
/// <reference path="Plant.ts" />
var EggPlant = (function (_super) {
    __extends(EggPlant, _super);
    function EggPlant(spritesheet, x, y) {
        _super.call(this, spritesheet, x, y);
        this.sprites = [
            spritesheet.getUVFromName("egg_0"),
            spritesheet.getUVFromName("egg_1"),
            spritesheet.getUVFromName("egg_2")
        ];
        this.growTime = 120;
        this.init();
    }
    EggPlant.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return EggPlant;
})(Plant);
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
/// <reference path="Scene.ts" />
/// <reference path="Spritesheet.ts" />
var Stage = (function () {
    function Stage() {
    }
    Stage.prototype.init = function () { };
    Stage.prototype.update = function () { };
    Stage.prototype.render = function (scene) { };
    Stage.prototype.mouseMove = function (e) { };
    Stage.prototype.mouseClick = function (e) { };
    return Stage;
})();
/// <reference path="Entity.ts" />
/// <reference path="Color.ts" />
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(spritesheet, name, x, y) {
        _super.call(this, spritesheet);
        this.build = false;
        this.plane = new Plane(x, y, 10, 16, 16, Color.WHITE, spritesheet.getUVFromName(name));
    }
    Tile.prototype.update = function () { };
    return Tile;
})(Entity);
/// <reference path="Entity.ts" />
var GardenerState;
(function (GardenerState) {
    GardenerState[GardenerState["WAITING"] = 0] = "WAITING";
    GardenerState[GardenerState["WORKING"] = 1] = "WORKING";
})(GardenerState || (GardenerState = {}));
var Gardener = (function (_super) {
    __extends(Gardener, _super);
    function Gardener(x, y, spritesheet) {
        _super.call(this, spritesheet);
        this.state = GardenerState.WAITING;
        this.speed = 1;
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
        this.plane = new Plane(x, y, 11, 16, 16, Color.WHITE, spritesheet.getUVFromName("worker"));
    }
    Gardener.prototype.move = function (vx, vy) {
        this.x += this.speed * vx;
        this.y += this.speed * vy;
        this.plane.setPosition(this.x, this.y);
    };
    Gardener.prototype.update = function () {
        if (this.state == GardenerState.WAITING) {
            if (this.x < 20) {
                this.move(1, 0);
            }
            if (this.x > 20) {
                this.move(-1, 0);
            }
            if (this.y < 20) {
                this.move(0, 1);
            }
            if (this.y > 20) {
                this.move(0, -1);
            }
        }
    };
    return Gardener;
})(Entity);
/// <reference path="Gardener.ts" />
var JobStatus;
(function (JobStatus) {
    JobStatus[JobStatus["WAITING"] = 0] = "WAITING";
    JobStatus[JobStatus["INPROGRESS"] = 1] = "INPROGRESS";
    JobStatus[JobStatus["DONE"] = 2] = "DONE";
})(JobStatus || (JobStatus = {}));
var Job = (function () {
    function Job(targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
        this.status = JobStatus.WAITING;
    }
    Job.prototype.assignGardener = function (gardener) {
        this.gardener = gardener;
        gardener.state = GardenerState.WORKING;
        this.status = JobStatus.INPROGRESS;
    };
    Job.prototype.finished = function () {
        this.gardener.state = GardenerState.WAITING;
        this.gardener = null;
        this.status = JobStatus.DONE;
    };
    Job.prototype.update = function () { };
    return Job;
})();
var JobType;
(function (JobType) {
    JobType[JobType["NONE"] = 0] = "NONE";
    JobType[JobType["PLOW"] = 1] = "PLOW";
    JobType[JobType["PLANT"] = 2] = "PLANT";
})(JobType || (JobType = {}));
;
/// <reference path="Job.ts" />
/// <reference path="JobDelegate.ts" />
var PlowJob = (function (_super) {
    __extends(PlowJob, _super);
    function PlowJob(targetX, targetY, delegate) {
        _super.call(this, targetX, targetY);
        this.wait = 0;
        console.log(targetX);
        this.delegate = delegate;
    }
    PlowJob.prototype.update = function () {
        if (this.gardener.x > this.targetX) {
            this.gardener.move(-1, 0);
        }
        if (this.gardener.x < this.targetX) {
            this.gardener.move(1, 0);
        }
        if (this.gardener.y < this.targetY) {
            this.gardener.move(0, 1);
        }
        if (this.gardener.y > this.targetY) {
            this.gardener.move(0, -1);
        }
        if (this.gardener.x == this.targetX && this.gardener.y == this.targetY) {
            if (this.wait >= 120) {
                this.delegate.finishedJob(this.targetX, this.targetY, JobType.PLOW);
                this.finished();
            }
            this.wait++;
        }
    };
    return PlowJob;
})(Job);
/// <reference path="Job.ts" />
/// <reference path="JobDelegate.ts" />
var PlantJob = (function (_super) {
    __extends(PlantJob, _super);
    function PlantJob(targetX, targetY, delegate) {
        _super.call(this, targetX, targetY);
        this.wait = 0;
        this.delegate = delegate;
    }
    PlantJob.prototype.update = function () {
        if (this.gardener.x > this.targetX) {
            this.gardener.move(-1, 0);
        }
        if (this.gardener.x < this.targetX) {
            this.gardener.move(1, 0);
        }
        if (this.gardener.y < this.targetY) {
            this.gardener.move(0, 1);
        }
        if (this.gardener.y > this.targetY) {
            this.gardener.move(0, -1);
        }
        if (this.gardener.x == this.targetX && this.gardener.y == this.targetY) {
            if (this.wait >= 120) {
                this.delegate.finishedJob(this.targetX, this.targetY, JobType.PLANT);
                this.finished();
            }
            this.wait++;
        }
    };
    return PlantJob;
})(Job);
/// <reference path="Stage.ts" />
/// <reference path="Tile.ts" />
/// <reference path="Job.ts" />
/// <reference path="Gardener.ts" />
/// <reference path="JobDelegate.ts" />
/// <reference path="PlowJob.ts" />
/// <reference path="Plant.ts" />
/// <reference path="EggPlant.ts" />
/// <reference path="PlantJob.ts" />
var PlayStage = (function (_super) {
    __extends(PlayStage, _super);
    function PlayStage() {
        _super.call(this);
        this.gardeners = new Array();
        this.jobs = new Array();
        this.tiles = new Array();
        this.mode = JobType.NONE;
        this.plants = new Array();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    PlayStage.prototype.init = function () {
        //init map
        for (var y = 0; y < (480 / 32); y++) {
            for (var x = 0; x < (640 / 32); x++) {
                this.tiles.push(new Tile(this.spritesheet, "grass_0", 16 + x * 32, 16 + y * 32));
            }
        }
        this.gardeners.push(new Gardener(16, 16, this.spritesheet));
        this.gardeners.push(new Gardener(16, 16, this.spritesheet));
        this.menubutton = new Plane(640 - 48, 16, 11, 48, 16, Color.WHITE, this.spritesheet.getUVFromName("plowbutton"));
        this.eggbutton = new Plane(640 - 48, 48, 11, 48, 16, Color.WHITE, this.spritesheet.getUVFromName("eggbutton"));
    };
    PlayStage.prototype.update = function () {
        for (var i = 0; i < this.tiles.length; i++) {
            if (!this.tiles[i].build) {
                this.tiles[i].plane.setColor(Color.WHITE);
            }
            this.tiles[i].update();
        }
        var tohighlight = this.tiles[this.mouseX + this.mouseY * (640 / 32)];
        if (tohighlight && this.mode != JobType.NONE) {
            tohighlight.plane.setColor(Color.GREY);
        }
        for (var i = 0; i < this.gardeners.length; i++) {
            this.gardeners[i].update();
        }
        for (var i = 0; i < this.plants.length; i++) {
            this.plants[i].update();
        }
        for (var i = 0; i < this.jobs.length; i++) {
            var job = this.jobs[i];
            if (job.status == JobStatus.WAITING) {
                for (var j = 0; j < this.gardeners.length; j++) {
                    var gardener = this.gardeners[j];
                    if (gardener.state == GardenerState.WAITING) {
                        job.assignGardener(gardener);
                        return;
                    }
                }
            }
            if (job.status == JobStatus.DONE) {
                this.jobs.splice(i, 1);
                i--;
            }
            if (job.status == JobStatus.INPROGRESS) {
                job.update();
            }
        }
        this.menubutton.setColor(Color.WHITE);
        this.eggbutton.setColor(Color.WHITE);
        if (this.mouseX >= (640 / 32) - 3 && this.mouseY == 0 || this.mode == JobType.PLOW) {
            this.menubutton.setColor(Color.GREY);
        }
        if (this.mouseX >= (640 / 32) - 3 && this.mouseY == 1 || this.mode == JobType.PLANT) {
            this.eggbutton.setColor(Color.GREY);
        }
    };
    PlayStage.prototype.render = function (scene) {
        for (var i = 0; i < this.tiles.length; i++) {
            scene.addPlane(this.tiles[i].plane);
        }
        for (var i = 0; i < this.plants.length; i++) {
            scene.addPlane(this.plants[i].plane);
        }
        for (var i = 0; i < this.gardeners.length; i++) {
            scene.addPlane(this.gardeners[i].plane);
        }
        scene.addPlane(this.menubutton);
        scene.addPlane(this.eggbutton);
    };
    PlayStage.prototype.mouseMove = function (e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var nx = Math.floor(x / 32);
        var ny = Math.floor(y / 32);
        this.mouseX = nx;
        this.mouseY = ny;
    };
    PlayStage.prototype.mouseClick = function (e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var nx = Math.floor(x / 32);
        var ny = Math.floor(y / 32);
        if (this.mode == JobType.PLOW) {
            var newtile = new Tile(this.spritesheet, "dirt_0", nx * 32 + 16, ny * 32 + 16);
            newtile.plane.setColor(Color.GREY);
            newtile.build = true;
            this.tiles[nx + ny * (640 / 32)] = newtile;
            this.jobs.push(new PlowJob(this.mouseX * 32 + 16, this.mouseY * 32 + 16, this));
            this.mode = JobType.NONE;
        }
        if (this.mode == JobType.PLANT) {
            this.jobs.push(new PlantJob(this.mouseX * 32 + 16, this.mouseY * 32 + 16, this));
            this.mode = JobType.NONE;
        }
        if (this.mode == JobType.NONE) {
            if (this.mouseX >= (640 / 32) - 3 && this.mouseY <= 0) {
                this.mode = JobType.PLOW;
            }
            if (this.mouseX >= (640 / 32) - 3 && this.mouseY == 1 || this.mode == JobType.PLANT) {
                this.mode = JobType.PLANT;
            }
        }
    };
    PlayStage.prototype.finishedJob = function (x, y, type) {
        var nx = Math.floor(x / 32);
        var ny = Math.floor(y / 32);
        if (type == JobType.PLOW) {
            this.tiles[nx + ny * (640 / 32)].plane.setColor(Color.WHITE);
            this.tiles[nx + ny * (640 / 32)].build = false;
        }
        if (type == JobType.PLANT) {
            var plant = new EggPlant(this.spritesheet, nx * 32 + 16, ny * 32 + 16);
            this.plants.push(plant);
            console.log(this.plants.length);
        }
    };
    return PlayStage;
})(Stage);
///<reference path="Shader.ts" />
///<reference path="Color.ts" />
///<reference path="Util.ts" />
///<reference path="UV.ts" />
///<reference path="Plane.ts" />
///<reference path="Scene.ts" />
///<reference path="Spritesheet.ts" />
/// <reference path="Stage.ts" />
/// <reference path="PlayStage.ts" />
var Game = (function () {
    function Game() {
        var _this = this;
        this.map = new Array();
        this.init = function () {
            _this.mvp = createOrthographicMatrix(0, 640, 0, 480, -1, -1000);
            _this.shader = new Shader(_this.gl, document.getElementById("vs").innerText, document.getElementById("fs").innerText);
            var clearColor = Color.PURPLE;
            _this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
            _this.gl.enable(_this.gl.BLEND);
            _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);
        };
        this.start = function () {
            _this.scene = new Scene(_this.gl, _this.shader, _this.texture, 50000 * 3);
            _this.stage = new PlayStage();
            _this.stage.spritesheet = _this.spritesheet;
            _this.stage.init();
            _this.loop();
        };
        this.loadTexture = function (resource) {
            _this.texture = _this.gl.createTexture();
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.texture);
            _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, resource);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.NEAREST);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.NEAREST);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_S, _this.gl.CLAMP_TO_EDGE);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_T, _this.gl.CLAMP_TO_EDGE);
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, null);
            console.log("Texture is loaded");
        };
        this.loadSpritesheet = function (resource) {
            console.log("Spritesheet is loaded");
            _this.spritesheet = new Spritesheet(resource);
        };
        this.loop = function () {
            _this.stage.update();
            _this.gl.clear(_this.gl.COLOR_BUFFER_BIT);
            _this.scene.mvp = _this.mvp;
            _this.stage.render(_this.scene);
            _this.scene.render();
            requestAnimationFrame(_this.loop);
        };
        this.mouseMove = function (e) {
            _this.stage.mouseMove(e);
        };
        this.mouseClick = function (e) {
            _this.stage.mouseClick(e);
        };
        this.canvas = document.getElementById("stage");
        this.gl = this.canvas.getContext("webgl");
        this.canvas.addEventListener("mousemove", this.mouseMove);
        this.canvas.addEventListener("click", this.mouseClick);
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
