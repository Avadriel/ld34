///<reference path="Game.ts" />

var game = new Game();
game.init();

var loader:any = new Loader();
loader.on('complete', game.start);

loader.add("texture", "res/grass.png");
loader.load(function(loader, resources){
	game.loadTexture(resources.texture.data)
});