class UV {

	static STDUV: UV = new UV(0, 0, 1, 1);

	u: number;
	v: number;
	u2: number;
	v2: number;
	
	constructor(u:number, v:number, u2:number, v2:number) {
		this.u = u;
		this.v = v;
		this.u2 = u2;
		this.v2 = v2;
	}
}