/// <reference path="Entity.ts" />

class ShovelButton extends Entity {
	
	x: number;
	y: number;

	frames: Array<UV> = new Array();
	speed: number = 10;
	ticks: number = 0;
	animationIndex: number = 0;

	constructor(x:number, y:number,spritesheet:Spritesheet) {
		super(spritesheet);
		this.frames = [
			spritesheet.getUVFromName("shovel_hover_0"),
			spritesheet.getUVFromName("shovel_hover_1"),
			spritesheet.getUVFromName("shovel_hover_2")
		];
		this.plane = new Plane(x, y, 20, 16, 16, Color.WHITE, this.frames[0]);
	}

	update(){
		this.ticks++;
		if(this.ticks%this.speed == 0){
			this.animationIndex++;
			this.plane.setUV(this.frames[this.animationIndex % this.frames.length]);
		}

	}
}
