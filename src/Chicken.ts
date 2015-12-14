/// <reference path="Animal.ts" />

class Chicken extends Animal {
	
	plane: Plane;
	frames: Array<UV>;
	animationIndex: number = 0;
	animationSpeed: number = 10;
	ticks: number = 0;

	constructor(spritesheet:Spritesheet, x, y) {
		super(spritesheet);
		this.frames = [
			spritesheet.getUVFromName("chicken_idle_0"),
			spritesheet.getUVFromName("chicken_idle_1"),
			spritesheet.getUVFromName("chicken_idle_2")
		]
		this.plane = new Plane(x, y, 12, 16, 16, Color.WHITE, this.frames[0]);
	}

	update(){
		this.ticks++;
		if(this.ticks%this.animationSpeed == 0){
			this.animationIndex++;
			this.plane.setUV(this.frames[this.animationIndex % this.frames.length]);
		}
	}
}