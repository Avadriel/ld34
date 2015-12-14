/// <reference path="Job.ts" />

class MoveToJob extends Job {
	
	targetX: number;
	targetY: number;

	constructor(targetX:number, targetY:number) {
		super();
		this.targetX = targetX;
		this.targetY = targetY;
	}

	update(){
		if(this.gardener.x > this.targetX){
			this.gardener.move(-1, 0);
		}

		if(this.gardener.x < this.targetX){
			this.gardener.move(1, 0);
		}

		if(this.gardener.y <  this.targetY){
			this.gardener.move(0, 1);
		}

		if(this.gardener.y > this.targetY){
			this.gardener.move(0, -1);
		}

		if(this.gardener.x == this.targetX && this.gardener.y == this.targetY){
			this.status = JobStatus.DONE;
		}
	}
}
