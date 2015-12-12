/// <reference path="Entity.ts" />
/// <reference path="UV.ts" />


class Plant extends Entity {
	
	growTime: number = 0;
	life: number = 0;
	sprites: Array<UV> = new Array();
	spriteIndex:number = 0;
	x: number = 0;
	y: number = 0;

	constructor(spritesheet:Spritesheet, x:number,y:number) {
		super(spritesheet);
		this.spriteIndex = 0;
		this.x = x;
		this.y = y;
	}

	init(){
		this.plane = new Plane(this.x, this.y, 15, 16, 16, Color.WHITE, this.sprites[0]);
	}

	update() {
		this.life++;
		if ((this.life % this.growTime) == 0) {
			this.spriteIndex++;
			if(this.spriteIndex < this.sprites.length){
				this.plane.setUV(this.sprites[this.spriteIndex]);
			}else{
				//EmitEvent
			}
		}
	}
}