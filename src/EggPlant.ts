/// <reference path="Plant.ts" />
/// <reference path="ParticleEmitter.ts" />
/// <reference path="Chicken.ts" />
/// <reference path="MoveAnimalJob.ts" />
/// <reference path="Slaughter.ts" />


class EggPlant extends Plant implements MoveAnimalJobDelegate{
	
	emitter: ParticleEmitter;
	chicken: Chicken;
	once: boolean = true;
	spritesheet: Spritesheet;
	slaughter: Slaughter;

	constructor(schedule:Schedule, spritesheet:Spritesheet, x:number,y:number, slaughter:Slaughter) {
		super(schedule, spritesheet, x, y);
		this.spritesheet = spritesheet;
		this.sprites = [
			spritesheet.getUVFromName("egg_0"),
			spritesheet.getUVFromName("egg_1"),
			spritesheet.getUVFromName("egg_2")
		];
		this.emitter = new ParticleEmitter(spritesheet, x, y, "eggparticle");
		this.chicken = new Chicken(spritesheet, x, y);
		this.growTime = 120;
		this.init();
		this.slaughter = slaughter;
	}

	update(){
		super.update();
		if(this.grown){
			this.emitter.update();
			this.chicken.update();
			if(this.once){
				this.schedule.addJob(new MoveAnimalJob(this, this.x, this.y, this.chicken, this.slaughter));	
				this.once = false;
			}
		}

	}

	take(){
		this.reset();
		this.once = true;
		this.chicken = new Chicken(this.spritesheet, this.x, this.y);
		this.emitter = new ParticleEmitter(this.spritesheet, this.x, this.y, "eggparticle");
	}

	render(scene: Scene) {
		scene.addPlane(this.plane);
		if (this.grown){
			this.emitter.render(scene);
			scene.addPlane(this.chicken.plane);
		}
	}
}