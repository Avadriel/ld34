/// <reference path="Entity.ts" />
/// <reference path="Color.ts" />

class Tile extends Entity {
	build: boolean = false;
	
	constructor(spritesheet:Spritesheet, name:string, x:number, y:number) {
		super(spritesheet);
		this.plane = new Plane(x, y, 10, 16, 16,Color.WHITE, spritesheet.getUVFromName(name));
	}

	update(){}
}