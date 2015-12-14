/// <reference path="Spritesheet.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Plane.ts" />

class Particle{
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	constructor(x,y, vx, vy, life){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.life = life;
	}
	update(){
		if(this.life >= 0){
			this.x += this.vx;
			this.y += this.vy;
		}
		this.life--;
	}
}

class ParticleEmitter {
	
	spritesheet: Spritesheet;
	particles: Array<Particle> = new Array(20);
	plane: Plane;
	finished: boolean = false;

	constructor(spritesheet:Spritesheet, x, y, name:string) {
		this.spritesheet = spritesheet;
		for (var i = 0; i < this.particles.length; i++){
			this.particles[i] = new Particle(x, y, Math.random() * 4-2, Math.random() * 4-2, Math.random() * 20);
		}
		this.plane = new Plane(x, y, 11, 4, 4, Color.WHITE, this.spritesheet.getUVFromName(name));
	}

	update(){
		for(var i = 0; i < this.particles.length; i++){
			this.particles[i].update();
		}	
	}

	render(scene:Scene){
		this.finished = true;
		for(var i = 0; i < this.particles.length; i++){
			var p = this.particles[i];
			if(p.life >= 0){
				this.finished = false;
				this.plane.setPosition(p.x, p.y);
				scene.addPlane(this.plane);
			}
		}
	}

}
