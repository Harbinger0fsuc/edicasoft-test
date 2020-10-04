const gulp = require("gulp");
const path = require("path");
const fs = require('fs');
const fileInclude = require("gulp-file-include");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css"); // For css minification
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const del = require("del"); // delete all files from build folder
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
// const watch = require("gulp-watch");
const imagemin = require("gulp-imagemin");
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require("gulp-fonter");


/* Put all necessary files into an array */
const htmlFiles = [
	"./src/*.html"
];

/* Put all necessary files into an array */
const scssFiles = [
	"./src/scss/styles.scss"
];

/* Put all necessary js files into an array */
const jsFiles = [
	"./src/js/lib.js",
	"./node_modules/svgxuse/svgxuse.min.js",
	"./src/js/main.js"
];

/* Put all fonts file into an array */
const fontsFiles = [
	"./src/fonts/**/*.ttf"
];

gulp.task("htmlInclude", () => {
	return gulp.src(htmlFiles)
		.pipe(fileInclude({
			prefix: "@",
			basepath: "@file"
		}))
		.pipe(gulp.dest("./build"))
		.pipe(browserSync.stream())
});

gulp.task("styles", () => {
	return gulp.src(scssFiles)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat("styles.css"))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 2 versions"],
			cascade: false
		}))
		.pipe(gulp.dest("./build/css"))
		.pipe(cleanCss({
			level: 2
		}))
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./build/css"))
		.pipe(browserSync.stream());
});


gulp.task("scripts", () => {
	return gulp.src(jsFiles)
		.pipe(concat("scripts.js"))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest("./build/js"))
		.pipe(browserSync.stream());
});

gulp.task("otf2ttf", () => {
	return gulp.src("./src/fonts/**/*.otf")
		.pipe(fonter({
			formats: ["ttf"]
		}))
		.pipe(gulp.dest("./src/fonts/"))
});

gulp.task("ttf2w", () => {
	gulp.src(fontsFiles)
		.pipe(ttf2woff())
		.pipe(gulp.dest("./build/fonts"))
	return gulp.src(fontsFiles)
		.pipe(ttf2woff2())
		.pipe(gulp.dest("./build/fonts"))
});

gulp.task("fontsTransfer", () => {
	return gulp.src(fontsFiles)
		.pipe(gulp.dest("./build/fonts"));
});

gulp.task("fonts", gulp.series("otf2ttf", "ttf2w", "fontsTransfer"))


const cb = () => { }

let srcFonts = "./src/scss/_fonts.scss";
let buildFonts = "./build/fonts/";

gulp.task("fontsStyle", (done) => {
	let file_content = fs.readFileSync(srcFonts);

	fs.writeFile(srcFonts, '', cb);
	fs.readdir(buildFonts, function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				let fontWeight = fontname.split("-");
				fontWeight = fontWeight[2];
				if (c_fontname != fontname) {
					fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", "' + fontWeight + '");\r\n', cb);
				}
				c_fontname = fontname;
			}
		}
	})

	done();
});




gulp.task("del", () => {
	return del(["build/*"])
});

gulp.task("img-compress", () => {
	return gulp.src("./src/media/**")
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest("./build/media/"));

});

gulp.task("svgSprites", () => {
	return gulp.src("./src/media/icons/**/*.svg")
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(svgSprite({
			shape: {
				id: {
					generator: function (name) {
						return path.basename(name, '.svg')
					}
				}
			},
			mode: {
				stack: {
					sprite: "../sprite.svg"
				},
				css: {
					dest: '',
					layout: "diagonal",
					bust: true,
					sprite: 'sprite.svg',
					prefix: '.%s',
					dimensions: false,
					render: {
						css: false
					}
				}
			}
		}))
		.pipe(gulp.dest("./build/media/icons/"));
});
// exports.fontsStyle = fontsStyle;

gulp.task("watch", () => {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
	gulp.watch("./src/**/*.html", gulp.series("htmlInclude"))
	gulp.watch("./src/media/**", gulp.series("img-compress"))
	gulp.watch("./src/media/**.svg", gulp.series("svgSprites"))
	gulp.watch("./src/fonts/**/*", gulp.series("fonts"))
	gulp.watch("./src/fonts/**/*", gulp.series("fontsStyle"))
	gulp.watch("./src/scss/**/*.scss", gulp.series("styles"))
	gulp.watch("./src/js/**/*.js", gulp.series("scripts"))
	gulp.watch("./*.html").on("change", browserSync.reload);
});


gulp.task("default", gulp.series("del", gulp.parallel("htmlInclude", "styles", "fonts", "scripts", "img-compress", "svgSprites"), "fontsStyle", "watch"));


