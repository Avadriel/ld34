/// <reference path="Plane.ts" />
/// <reference path="Scene.ts" />
/// <reference path="ShovelButton.ts" />

enum Info{ NONE,GRASS,DIRT,EGG}
enum HudAction{PLOW}

interface HudDelegate{
	hudAction(x: number, y: number, type: HudAction);
}

class Hud {
	
	spritesheet: Spritesheet;
	background: Plane;
	shovelButton: ShovelButton;
	grassLabel: Plane;
	dirtLabel: Plane;
	info: Info = Info.NONE;
	label: Plane;
	delegate: HudDelegate;

	constructor(delegate:HudDelegate, spritesheet:Spritesheet) {
		this.delegate = delegate;
		this.spritesheet = spritesheet;
		this.background = new Plane(640 / 2, 480 - ((2*32)/2),   22, 640/2 , (2*32)/2,new Color(0x88000000), spritesheet.getUVFromName("white"));
		this.shovelButton = new ShovelButton(16, 480-16, this.spritesheet);

		//labels
		this.grassLabel = new Plane(16+16, 480 - 48, 22, 32, 16, Color.WHITE, spritesheet.getUVFromName("label_grass"));
		this.dirtLabel = new Plane(16+16, 480 - 48, 22, 32, 16, Color.WHITE, spritesheet.getUVFromName("label_dirt"));
	}

	hoverOnIndex(index:number){
		if(index == 0){
			this.shovelButton.plane.setColor(Color.GREY);
		}
	}

	clickOnIndex(index:number){
		if(index == 0){
			this.delegate.hudAction(0, 0, HudAction.PLOW);
		}
	}

	resetActionButtons(){
		this.shovelButton.plane.setColor(Color.WHITE);
	}

	update() {
		this.shovelButton.update();
		if (this.info == Info.GRASS) {
			this.label = this.grassLabel;
		}
		if(this.info == Info.DIRT){
			this.label = this.dirtLabel;
		}
	}

	render(scene: Scene){
		scene.addPlane(this.background);
		scene.addPlane(this.shovelButton.plane);
		if(this.info != Info.NONE){
			scene.addPlane(this.label);
		}
	}
}
