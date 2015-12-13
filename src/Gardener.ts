/// <reference path="Entity.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Animal.ts" />



enum GardenerState{WAITING, WORKING}

class Gardener extends Entity {
	
	state: GardenerState = GardenerState.WAITING;
	speed: number = 1;
	x: number = 0;
	y: number = 0;
	front: Animal;

	constructor(x, y, spritesheet:Spritesheet) {
		super(spritesheet);
		this.x = x;
		this.y = y;
		this.plane = new Plane(x, y, 11, 16, 16, Color.WHITE, spritesheet.getUVFromName("gardener_idle_0"));
	}

	move(vx, vy){
		this.x += this.speed * vx;
		this.y += this.speed * vy;
		this.plane.setPosition(this.x, this.y);
		if(this.front != null){
			this.front.plane.setPosition(this.x, this.y);
		}
	}

	render(scene:Scene){
		scene.addPlane(this.plane);
		if(this.front != null){
			scene.addPlane(this.front.plane);
		}
	}

	update() {
		if (this.state == GardenerState.WAITING){
			if(this.x < 20){
				this.move(1, 0);
			}

			if(this.x > 20){
				this.move(-1, 0);
			}

			if(this.y < 20){
				this.move(0, 1);
			}

			if(this.y > 20){
				this.move(0, -1);
			}
		}
	}
}