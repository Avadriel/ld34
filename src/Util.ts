function createOrthographicMatrix(left:number, right:number, top:number, bottom:number, near:number, far:number){
	var a = 2/(right-left);
	var b = -((right+left)/(right-left));
	var c = 2/(top-bottom);
	var d = -((top+bottom)/(top-bottom));
	var e = -2/(far-near);
	var f = -((far+near)/(far-near));
	return [
		a, 0, 0, b,
		0, c, 0, d,
		0, 0, e, f, 
		0, 0, 0, 1
	]
}