/// <reference path="Stage.ts" />
/// <reference path="Tile.ts" />
/// <reference path="Job.ts" />
/// <reference path="Gardener.ts" />
/// <reference path="JobDelegate.ts" />
/// <reference path="PlowJob.ts" />
/// <reference path="Plant.ts" />
/// <reference path="EggPlant.ts" />
/// <reference path="PlantJob.ts" />
/// <reference path="Schedule.ts" />
/// <reference path="ShovelButton.ts" />
/// <reference path="Hud.ts" />


class PlayStage extends Stage implements JobDelegate{

	infoLookup: Array<Info> = new Array();
	gardeners: Array<Gardener> = new Array();
	tiles: Array<Tile> = new Array();
	mode: JobType = JobType.NONE;
	plants: Array<Plant> = new Array();
	schedule: Schedule;
	bottom: Plane;
	hud: Hud;
	focusX: number;
	focusY: number;

		constructor() {
		super();
	}

	init(){
		this.schedule = new Schedule();
		//init map
		this.infoLookup = new Array((480/32)*(640/32));
		for (var y = 0; y < (480 / 32); y++){
			for (var x = 0; x < (640 / 32); x++){
				this.tiles.push(new Tile(this.spritesheet, "grass_0", 16+x*32, 16+y*32));
				this.infoLookup[x+y*(640/32)] = Info.GRASS;
			}
		}

		this.hud = new Hud(this, this.spritesheet);
		
		this.gardeners.push(new Gardener(16, 16, this.spritesheet));
		this.gardeners.push(new Gardener(16, 16, this.spritesheet));
	}

	update(){
		for (var i = 0; i < this.tiles.length; i++) {
			if (!this.tiles[i].build) {
				this.tiles[i].plane.setColor(Color.WHITE);	
			}
			this.tiles[i].update();
		}
		var tohighlight = this.tiles[this.mouseX + this.mouseY * (640 / 32)]
		if(tohighlight && this.mode != JobType.NONE){
			tohighlight.plane.setColor(Color.GREY);
		}

		for (var i = 0; i < this.gardeners.length; i++){
			this.gardeners[i].update();
		}

		for (var i = 0; i < this.plants.length; i++){
			this.plants[i].update();
		}

		for (var j = 0; j < this.gardeners.length; j++) {
				var gardener = this.gardeners[j];
				if (gardener.state == GardenerState.WAITING) {
					var jobToAssign = this.schedule.findJob();
					if(jobToAssign !== null){
						jobToAssign.assignGardener(gardener);
					}
			}
		}

		this.schedule.update();

		var nx = Math.floor(this.mouseX);
		var ny = Math.floor(this.mouseY);
		
		this.hud.info = Info.NONE;
		if (this.mouseY <= (480/32-3)) {
			var t = this.infoLookup[nx + ny * (640 / 32)];
			this.hud.info = t;
		}

		this.hud.update();
	}

	render(scene: Scene) {
		for (var i = 0; i < this.tiles.length; i++) {
			scene.addPlane(this.tiles[i].plane);
		}

		for (var i = 0; i < this.plants.length; i++){
			scene.addPlane(this.plants[i].plane);
			this.plants[i].render(scene);
		}

		for (var i = 0; i < this.gardeners.length; i++){
			scene.addPlane(this.gardeners[i].plane);
		}

		this.hud.render(scene);
	}

	mouseX: number = 0;
	mouseY: number = 0;

	mouseMove(e:MouseEvent){
		var x = e.offsetX;
		var y = e.offsetY;
		var nx = Math.floor(x / 32);
		var ny = Math.floor(y / 32);
		this.mouseX = nx;
		this.mouseY = ny;

		this.hud.resetActionButtons();
		if(ny == (480/32)-1){
			this.hud.hoverOnIndex(nx);
		}
	}

	mouseClick(e:MouseEvent){
		var x = e.offsetX;
		var y = e.offsetY;
		var nx = Math.floor(x / 32);
		var ny = Math.floor(y /  32);

		if (this.mode == JobType.PLOW) {
			var newtile = new Tile(this.spritesheet, "dirt_0", nx * 32 + 16, ny * 32 + 16);
			newtile.plane.setColor(Color.GREY);
			newtile.build = true;
			this.tiles[nx + ny * (640 / 32)] = newtile;

			this.schedule.addJob(new PlowJob(this.mouseX * 32 + 16, this.mouseY * 32 + 16, this));
			this.mode = JobType.NONE;
		}

		if (ny == (480/32)-1){
			this.hud.clickOnIndex(nx, this.focusX, this.focusY);
		}

		//if tile is pressed
		if(nx <= (480/32-3)){
			var tileInfo = this.infoLookup[nx + ny * (640 / 32)];
			this.hud.mode = HudMode.NORMAL;
			this.hud.resetActionButtons();
			if(tileInfo == Info.DIRT){
				this.focusX = nx * 32 + 16;
				this.focusY = ny * 32 + 16;
				this.hud.mode = HudMode.PLANT;
			}
		}


	}

	finishedJob(x, y, type: JobType) {
		var nx = Math.floor(x / 32);
		var ny = Math.floor(y /  32);
		if(type == JobType.PLOW){
			this.tiles[nx + ny * (640 / 32)].plane.setColor(Color.WHITE);
			this.tiles[nx + ny * (640 / 32)].build = false;
			this.infoLookup[nx + ny * (640 / 32)] = Info.DIRT;
		}

		if (type == JobType.PLANT) {
			var plant = new EggPlant(this.schedule,this.spritesheet, nx * 32 + 16, ny * 32 + 16);
			this.plants.push(plant);
		}
	}

	hudAction(x: number, y: number, type: HudAction){
		if(type == HudAction.PLOW){
			this.mode = JobType.PLOW;
		}

		if(type == HudAction.PLANTEGG){
			this.schedule.addJob(new PlantJob(x, y, this));
		}
	}


}