enum JobType { NONE,PLOW, PLANT };
interface JobDelegate{
	finishedJob(x, y, type:JobType);
}