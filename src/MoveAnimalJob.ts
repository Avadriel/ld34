/// <reference path="Job.ts" />
/// <reference path="WaitJob.ts" />
/// <reference path="MoveToJob.ts" />
/// <reference path="Animal.ts" />
/// <reference path="Slaughter.ts" />


interface MoveAnimalJobDelegate{
	take();
}

class MoveAnimalJob extends Job {

	jobIndex: number = 0;
	targetX: number;
	targetY: number;
	plane: Animal;
	delegate: MoveAnimalJobDelegate;
	slaughter:Slaughter;
	
	constructor(delegate:MoveAnimalJobDelegate, targetX:number, targetY:number, plane:Animal, slaughter:Slaughter) {
		super();
		this.jobs = [new MoveToJob(targetX, targetY), new WaitJob(10), new MoveToJob( 640-16, 16), new WaitJob(10)];
		this.plane = plane;
		this.delegate = delegate;
		this.slaughter = slaughter;
	}

	update() {
		//If all jobs are finished
		if (this.jobIndex >= this.jobs.length){
			//this.delegate.finishedJob(this.targetX, this.targetY, JobType.PLANT);
			//this.gardener.front = null;
			this.slaughter.emit();
			this.gardener.front = null;
			this.finished();
		}else{
			var actualJob = this.jobs[this.jobIndex];
			actualJob.gardener = this.gardener;
			actualJob.update();

			if(this.jobIndex == 1){
				this.gardener.front = this.plane;
				this.delegate.take();
			}

			if(actualJob.status == JobStatus.DONE){
				this.jobIndex++;
			}
		}

	}
}


