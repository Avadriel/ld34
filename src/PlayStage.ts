/// <reference path="Stage.ts" />
/// <reference path="Tile.ts" />
/// <reference path="Job.ts" />
/// <reference path="Gardener.ts" />


class PlayStage extends Stage {

	gardeners: Array<Gardener> = new Array();
	jobs: Array<Job> = new Array();
	tiles: Array<Tile> = new Array();
	button_dirt: Plane;

	constructor() {
		super();
	}

	init(){
		//init map
		for (var y = 0; y < (480 / 32); y++){
			for (var x = 0; x < (640 / 32); x++){
			
				this.tiles.push(new Tile(this.spritesheet, "grass_0", 16+x*32, 16+y*32));
			}
		}

		this.gardeners.push(new Gardener(20, 20, this.jobs, this.spritesheet));
		

		this.button_dirt = new Plane(400, 480 - 32, 11, 16, 16, Color.WHITE, this.spritesheet.getUVFromName("dbutton"));
	}

	update() {
		for (var i = 0; i < this.tiles.length; i++){
			this.tiles[i].plane.setColor(Color.WHITE);
			this.tiles[i].update();
		}
		var tohighlight = this.tiles[this.mouseX + this.mouseY * (640 / 32)]
		if(tohighlight){
			tohighlight.plane.setColor(Color.GREY);
		}

		for (var i = 0; i < this.gardeners.length; i++){
			this.gardeners[i].update(this.jobs);
		}
	}

	render(scene: Scene) {
		for (var i = 0; i < this.tiles.length; i++) {
			scene.addPlane(this.tiles[i].plane);
		}

		for (var i = 0; i < this.gardeners.length; i++){
			scene.addPlane(this.gardeners[i].plane);
		}


		scene.addPlane(this.button_dirt);
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
		this.jobs.push(new Job(this.mouseX*32+16, this.mouseY*32+16, JobType.PLOW));
		console.log(this.jobs.length);
	}


}