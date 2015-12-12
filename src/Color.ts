class Color {

	static WHITE = new Color(0xFFFFFFFF);
	static PURPLE = new Color(0xFFFF00FF);

	a: number;
	r: number;
	g: number;
	b: number;

	constructor(argb:number) {
		this.a = ((argb >> 24) & 255)/ 255;
		this.r = ((argb >> 16) & 255)/ 255;
		this.g = ((argb >> 8) & 255)/ 255;
		this.b = (argb & 255)/ 255;
	}
}