var gulp = require("gulp");
var connect = require("gulp-connect");
var ts = require('gulp-typescript');

gulp.task("html", function(){
	gulp.src("src/**/*.html").pipe(gulp.dest("tmp/")).pipe(connect.reload());
});

gulp.task("img", function(){
	gulp.src("src/res/*.png").pipe(gulp.dest("tmp/res/")).pipe(connect.reload());
	gulp.src("src/res/*.json").pipe(gulp.dest("tmp/res/")).pipe(connect.reload());
});

gulp.task("ts", function(){
	gulp.src("src/**/*.ts").pipe(ts({out:"game.js"})).pipe(gulp.dest("tmp/")).pipe(connect.reload());
});

gulp.task("lib", function(){
	gulp.src("lib/**/*.js").pipe(gulp.dest("tmp/lib")).pipe(connect.reload());
})

gulp.task("serve", function(){
	connect.server({
		root: "tmp",
		livereload: true
	});
});

gulp.task("watch", function(){
	gulp.watch(["src/**/*.html"], ["html"]);
	gulp.watch(["src/**/*.ts"], ["ts"]);
	gulp.watch(["src/res/*.png"], ["img"]);
	gulp.watch(["lib/**/*.js"], ["lib"]);
});

gulp.task("pages", function(){
	gulp.src("src/**/*.html").pipe(gulp.dest("/"));
	gulp.src("src/res/*.png").pipe(gulp.dest("res/"));
	gulp.src("src/res/*.json").pipe(gulp.dest("res/"));
	gulp.src("src/**/*.ts").pipe(ts({out:"game.js"})).pipe(gulp.dest("/"));
	gulp.src("lib/**/*.js").pipe(gulp.dest("lib/"));
})

gulp.task("default", ["html", "ts", "img", "lib", "watch", "serve"]);
