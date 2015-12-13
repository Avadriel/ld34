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




class PlayStage extends Stage implements JobDelegate{

	gardeners: Array<Gardener> = new Array();
	tiles: Array<Tile> = new Array();
	mode: JobType = JobType.NONE;
	plants: Array<Plant> = new Array();
	schedule: Schedule;
	shovel: ShovelButton;


	constructor() {
		super();
	}

	init(){
		this.schedule = new Schedule();
		//init map
		for (var y = 0; y < (480 / 32); y++){
			for (var x = 0; x < (640 / 32); x++){
				this.tiles.push(new Tile(this.spritesheet, "grass_0", 16+x*32, 16+y*32));
			}
		}


		this.shovel = new ShovelButton(640-16, 16, this.spritesheet);
		this.gardeners.push(new Gardener(16, 16, this.spritesheet));
		this.gardeners.push(new Gardener(16, 16, this.spritesheet));
	}

	update() {
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


		//Hover button
		this.shovel.plane.setColor(Color.WHITE);
		if (this.mouseX >= (640 / 32) - 1 && this.mouseY == 0 || this.mode == JobType.PLOW){
			this.shovel.plane.setColor(Color.GREY);
		}

		/*this.menubutton.setColor(Color.WHITE);
		this.eggbutton.setColor(Color.WHITE);
		if (this.mouseX >= (640 / 32)-3 && this.mouseY == 0 || this.mode == JobType.PLOW) {
			this.menubutton.setColor(Color.GREY);
		}

		if (this.mouseX >= (640 / 32)-3 && this.mouseY == 1 || this.mode == JobType.PLANT) {
			this.eggbutton.setColor(Color.GREY);
		}*/

		this.shovel.update();

	}

	render(scene: Scene) {
		for (var i = 0; i < this.tiles.length; i++) {
			scene.addPlane(this.tiles[i].plane);
		}

		for (var i = 0; i < this.plants.length; i++){
			scene.addPlane(this.plants[i].plane);
		}

		for (var i = 0; i < this.gardeners.length; i++){
			scene.addPlane(this.gardeners[i].plane);
		}

		scene.addPlane(this.shovel.plane);
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

		if (this.mouseX >= (640 / 32) - 1 && this.mouseY == 0 && this.mode == JobType.NONE){
			this.mode = JobType.PLOW;
		}
	}

	finishedJob(x, y, type: JobType) {
		var nx = Math.floor(x / 32);
		var ny = Math.floor(y /  32);
		if(type == JobType.PLOW){
			this.tiles[nx + ny * (640 / 32)].plane.setColor(Color.WHITE);
			this.tiles[nx + ny * (640 / 32)].build = false;
		}

		if(type == JobType.PLANT){
			var plant = new EggPlant(this.spritesheet, nx * 32 + 16, ny * 32 + 16);
			this.plants.push(plant);
			console.log(this.plants.length)
		}
	}


}