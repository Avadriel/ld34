///<reference path="UV.ts" />
class Spritesheet {
	
	texturepacker: any;

	constructor(texturepacker) {
		this.texturepacker = texturepacker;
	}

	getUVFromName(name){
		var obj = this.texturepacker.frames[name].frame;
		var w = this.texturepacker.meta.size.w;
		var h = this.texturepacker.meta.size.h;
		return new UV(obj.x / w, obj.y / h, (obj.x+obj.w)/w, (obj.y +obj.h) / h);
	}
}