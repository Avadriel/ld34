/// <reference path="Job.ts" />

class Schedule {

	jobs: Array<Job> = new Array();
	
	constructor() {}

	addJob(job: Job){
		this.jobs.push(job);
	}

	update(){
		for (var i = 0; i < this.jobs.length; i++) {
			var job = this.jobs[i];

			if(job.status == JobStatus.DONE){
				this.jobs.splice(i, 1);
				i--;
			}

			if(job.status == JobStatus.INPROGRESS){
				job.update();
			}
		}
	}

	findJob():Job{
		for (var i = 0; i < this.jobs.length; i++) {
			var job = this.jobs[i];
			if (job.status == JobStatus.WAITING) {
				return job;
			}
		}
		return null;
	}
}