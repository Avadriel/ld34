/// <reference path="Entity.ts" />

enum GardenerState{WAITING, WORKING}

class Gardener extends Entity {
	
	state: GardenerState = GardenerState.WAITING;
	speed: number = 1;
	x: number = 0;
	y: number = 0;

	constructor(x, y, spritesheet:Spritesheet) {
		super(spritesheet);
		this.x = x;
		this.y = y;
		this.plane = new Plane(x, y, 11, 16, 16, Color.WHITE, spritesheet.getUVFromName("worker"));
	}

	move(vx, vy){
		this.x += this.speed * vx;
		this.y += this.speed * vy;
		this.plane.setPosition(this.x, this.y);
	}

	update(){
	}
}