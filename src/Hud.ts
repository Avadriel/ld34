/// <reference path="Plane.ts" />
/// <reference path="Scene.ts" />
/// <reference path="ShovelButton.ts" />

enum Info{ NONE,GRASS,DIRT,EGG}
enum HudAction{PLOW, PLANTEGG}
enum HudMode{NORMAL, PLANT}

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
	seeds: Array<Plane>;
	mode: HudMode = HudMode.NORMAL;

	constructor(delegate:HudDelegate, spritesheet:Spritesheet) {
		this.delegate = delegate;
		this.spritesheet = spritesheet;
		this.background = new Plane(640 / 2, 480 - ((2*32)/2),   22, 640/2 , (2*32)/2,new Color(0x88000000), spritesheet.getUVFromName("white"));
		this.shovelButton = new ShovelButton(16, 480-16, this.spritesheet);

		this.seeds = [
			new Plane(16 + 32, 480 - 16, 30, 16, 16, Color.WHITE, spritesheet.getUVFromName("plantegg"))
		]

		//labels
		this.grassLabel = new Plane(16+16, 480 - 48, 22, 32, 16, Color.WHITE, spritesheet.getUVFromName("label_grass"));
		this.dirtLabel = new Plane(16+16, 480 - 48, 22, 32, 16, Color.WHITE, spritesheet.getUVFromName("label_dirt"));
	}

	hoverOnIndex(index:number){
		if(index == 0 && this.mode == HudMode.NORMAL){
			this.shovelButton.plane.setColor(Color.GREY);
		}
	}

	clickOnIndex(index:number, x:number, y:number){
		if(index == 0 && this.mode == HudMode.NORMAL){
			this.delegate.hudAction(0, 0, HudAction.PLOW);
		}

		if(index == 1 && this.mode == HudMode.PLANT){
			this.delegate.hudAction(x, y, HudAction.PLANTEGG);
		}
	}

	resetActionButtons(){
		this.shovelButton.plane.setColor(Color.WHITE);
	}

	update() {
		if(this.mode == HudMode.PLANT){
			this.shovelButton.plane.setColor(Color.GREY);
		}

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

		if(this.mode == HudMode.PLANT){
			for (var i = 0; i < this.seeds.length; i++){
				scene.addPlane(this.seeds[i]);
			}
		}
	}
}
