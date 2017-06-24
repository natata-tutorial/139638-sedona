"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var del = require("del");
var minify = require("gulp-csso");
var mqpacker = require("css-mqpacker");
var run = require("run-sequence");
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter'); 
var stylelint = require('stylelint');

gulp.task("css-lint", function() {
	// Stylelint config rules 
	var stylelintConfig = { 
		"rules": {
			"block-no-empty": true, 
			 "color-no-invalid-hex": true, 
			 "declaration-colon-space-after": "always", 
			 "declaration-colon-space-before": "never", 
			 "function-comma-space-after": "always", 
			 "function-url-quotes": "double", 
			 "media-feature-colon-space-after": "always", 
			 "media-feature-colon-space-before": "never", 
			 "media-feature-name-no-vendor-prefix": true, 
			 "max-empty-lines": 5, 
			 "number-leading-zero": "never", 
			 "number-no-trailing-zeros": true, 
			 "property-no-vendor-prefix": true, 
			 "rule-no-duplicate-properties": true, 
			 "declaration-block-no-single-line": true,
			 "rule-trailing-semicolon": "always", 
			 "selector-list-comma-space-before": "never", 
			 "selector-list-comma-newline-after": "always", 
			 "selector-no-id": true, 
			 "string-quotes": "double", 
			 "value-no-vendor-prefix": true 
		} 
	} 
	var processors = [ stylelint(stylelintConfig), 
		// Pretty reporting config 
		reporter({ 
			clearMessages: true, 
			throwError: true 
		}) 
	]; 
	return gulp.src( 
		// Stylesheet source: 
		['build/scss', 
		// Ignore linting vendor assets: 
		// (Useful if you have bower components) 
		'build/scss'] 
	) 
	.pipe(postcss(processors, {syntax: syntax_scss}));
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 2 versions"
    ]}),
    mqpacker({
      sort: true
    })
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("symbols.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
  .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
})

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "images", "symbols", fn);
})

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function() {
  return del("build");
});
