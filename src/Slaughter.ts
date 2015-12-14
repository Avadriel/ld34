/// <reference path="Entity.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Plane.ts" />
/// <reference path="ParticleEmitter.ts" />


class Slaughter extends Entity {
	
	frames: Array<UV>;
	frameSpeed: number = 20;
	ticks: number = 0;
	animationIndex: number = 0;
	emitter:ParticleEmitter;
	spritesheet: Spritesheet;
	x: number;
	y: number;

	constructor(spritesheet:Spritesheet, x:number, y:number) {
		super(spritesheet);
		this.frames = [
			spritesheet.getUVFromName("slaugher_open_0"),
			spritesheet.getUVFromName("slaugher_open_1"),
			spritesheet.getUVFromName("slaugher_open_2"),
			spritesheet.getUVFromName("slaugher_open_3"),
			spritesheet.getUVFromName("slaugher_open_4"),
			spritesheet.getUVFromName("slaugher_open_5")
		];
		this.emitter = new ParticleEmitter(spritesheet, x, y, "blood");
		this.plane = new Plane(x, y, 20, 16, 16, Color.WHITE, this.frames[this.animationIndex]);
		this.x = x;
		this.y = y;
		this.spritesheet = spritesheet;
	}

	emit(){
		if(this.emitter.finished){
			this.emitter = new ParticleEmitter(this.spritesheet, this.x, this.y, "blood");
		}
	}

	render(scene: Scene) {
		scene.addPlane(this.plane);
		this.emitter.render(scene);
	}

	update(){
		this.ticks++;
		if(this.ticks%this.frameSpeed == 0){
			this.animationIndex++;
			this.plane.setUV(this.frames[this.animationIndex % this.frames.length]);
		}
		this.emitter.update();
	}
}