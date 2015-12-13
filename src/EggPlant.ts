/// <reference path="Plant.ts" />
/// <reference path="ParticleEmitter.ts" />
/// <reference path="Chicken.ts" />



class EggPlant extends Plant {
	
	emitter: ParticleEmitter;
	chicken: Chicken;

	constructor(schedule:Schedule, spritesheet:Spritesheet, x:number,y:number) {
		super(schedule, spritesheet, x, y);
		this.sprites = [
			spritesheet.getUVFromName("egg_0"),
			spritesheet.getUVFromName("egg_1"),
			spritesheet.getUVFromName("egg_2")
		];
		this.emitter = new ParticleEmitter(spritesheet, x, y);
		this.chicken = new Chicken(spritesheet, x, y);
		this.growTime = 120;
		this.init();
	}

	update(){
		super.update();
		if(this.grown){
			console.log("update");
			this.emitter.update();
			this.chicken.update();
		}

	}

	render(scene:Scene){
		if(this.grown){
			this.emitter.render(scene);
			scene.addPlane(this.chicken.plane);
		}
	}
}