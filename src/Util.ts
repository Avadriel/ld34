function createOrthographicMatrix(left:number, right:number, top:number, bottom:number, near:number, far:number){
	var a = 2/(right-left);
	var b = 2/(top-bottom);
	var c = -2/(far-near);
	var d = -((right+left)/(right-left));
	var e = -((top+bottom)/(top-bottom));
	var f = -((far+near)/(far-near));
	return new Float32Array([
		a, 0, 0, 0,
		0, b, 0, 0,
		0, 0, c, 0, 
		d, e, f, 1
	])
}