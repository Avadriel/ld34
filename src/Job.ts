/// <reference path="Gardener.ts" />

enum JobStatus {WAITING, INPROGRESS, DONE}

class Job {

	status: JobStatus;
	gardener: Gardener;
	jobs: Array<Job> = new Array();

	constructor() {
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