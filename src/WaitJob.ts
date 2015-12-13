/// <reference path="Job.ts" />

class WaitJob extends Job {
	
	wait: number = 0;
	ticks: number=0;

	constructor(wait:number) {
		super();
		this.wait = wait;
	}

	update(){
		this.ticks++;
		if(this.ticks >= this.wait){
			this.status = JobStatus.DONE;
		}
	}
}