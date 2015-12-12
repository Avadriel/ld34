///<reference path="Game.ts" />

var game = new Game();
game.init();

var loader:any = new Loader();

loader.add("texture", "res/grass.png");
loader.load(function(loader, resources){
	game.loadTexture(resources.texture.data)
});

loader.on('complete', game.start);