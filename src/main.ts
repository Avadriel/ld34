///<reference path="Game.ts" />

var game = new Game();
game.init();

var loader:any = new Loader();

loader.add("texture", "res/ld34.png");
loader.add("spritesheet", "res/ld34.json");

loader.load(function(loader, resources){
	game.loadTexture(resources.texture.data)
	game.loadSpritesheet(resources.spritesheet.data);
});


loader.on('complete', game.start);