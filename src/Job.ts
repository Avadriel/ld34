enum JobType {PLOW};
enum JobStatus {WAITING, INPROGRESS, DONE}

class Job {

	targetX: number;
	targetY: number;
	jobType: JobType;
	status: JobStatus;

	constructor(targetX, targetY, jobType:JobType) {
		this.targetX = targetX;
		this.targetY = targetY;
		this.jobType = jobType;
		this.status = JobStatus.WAITING;
	}
}