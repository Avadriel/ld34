/// <reference path="Job.ts" />
/// <reference path="JobDelegate.ts" />

class PlowJob extends Job {

	wait: number = 0;
	delegate: JobDelegate;
	
	constructor(targetX, targetY, delegate:JobDelegate){
		super(targetX, targetY);
		console.log(targetX)
		this.delegate = delegate;
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
			if(this.wait >= 120){
				this.delegate.finishedJob(this.targetX, this.targetY, JobType.PLOW);
				this.finished();
			}
			this.wait++;
		}
	}
}