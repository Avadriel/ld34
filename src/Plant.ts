/// <reference path="Entity.ts" />
/// <reference path="UV.ts" />
/// <reference path="Schedule.ts" />
/// <reference path="Scene.ts" />

class Plant extends Entity {
	
	growTime: number = 0;
	life: number = 0;
	sprites: Array<UV> = new Array();
	spriteIndex:number = 0;
	x: number = 0;
	y: number = 0;
	schedule: Schedule;
	grown: boolean = false;

	constructor(schedule:Schedule, spritesheet:Spritesheet, x:number,y:number) {
		super(spritesheet);
		this.schedule = schedule;
		this.spriteIndex = 0;
		this.x = x;
		this.y = y;
	}

	init(){
		this.plane = new Plane(this.x, this.y, 15, 16, 16, Color.WHITE, this.sprites[0]);
	}

	reset(){
		this.life = 0;
		this.spriteIndex = 0;
		this.grown = false;
	}

	update() {
		this.life++;
		if ((this.life % this.growTime) == 0 && !this.grown) {
			this.spriteIndex++;
			if(this.spriteIndex < this.sprites.length){
				this.plane.setUV(this.sprites[this.spriteIndex]);
			}else{
				this.grown = true;
				this.spriteIndex = 0;
				this.plane.setUV(this.sprites[this.spriteIndex]);
			}
		}
	}

	render(scene:Scene){}
}