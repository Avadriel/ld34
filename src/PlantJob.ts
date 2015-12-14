/// <reference path="Job.ts" />
/// <reference path="JobDelegate.ts" />
/// <reference path="MoveToJob.ts" />
/// <reference path="WaitJob.ts" />


class PlantJob extends Job {

	delegate: JobDelegate;
	jobIndex: number = 0;
	targetX: number;
	targetY: number;

	constructor(targetX, targetY, delegate:JobDelegate){
		super();
		this.jobs = [new MoveToJob( targetX, targetY), new WaitJob(120)];
		this.delegate = delegate;
		this.targetX = targetX;
		this.targetY = targetY;
	}
	
	update (){
		//If all jobs are finished
		if(this.jobIndex >= this.jobs.length){
				this.delegate.finishedJob(this.targetX, this.targetY, JobType.PLANT);
				this.finished();
		}else{
			var actualJob = this.jobs[this.jobIndex];
			actualJob.gardener = this.gardener;
			actualJob.update();

			if(actualJob.status == JobStatus.DONE){
				this.jobIndex++;
			}
		}
		
	}
}