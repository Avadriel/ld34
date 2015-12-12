/// <reference path="Gardener.ts" />

enum JobStatus {WAITING, INPROGRESS, DONE}

class Job {

	targetX: number;
	targetY: number;
	status: JobStatus;
	gardener: Gardener;

	constructor(targetX, targetY) {
		this.targetX = targetX;
		this.targetY = targetY;
		this.status = JobStatus.WAITING;
	}

	assignGardener(gardener:Gardener){
		this.gardener = gardener;
		gardener.state = GardenerState.WORKING;
		this.status = JobStatus.INPROGRESS;
	}

	finished(){
		this.gardener.state = GardenerState.WAITING;
		this.gardener = null;
		this.status = JobStatus.DONE;
	}
	
	update(){}
}