// Page_Basket
 //
//////////////////

	// Gulp
	var gulp = require('gulp');

	// delete
	var del = require('del');

	// Sass/CSS stuff
	var sass = require('gulp-sass');
	var prefix = require('gulp-autoprefixer');
	var minifycss = require('gulp-minify-css');

	// JavaScript
	var uglify = require('gulp-uglify');

	// Images
	var imagemin = require('gulp-imagemin');

	// Stats and Things
	var size = require('gulp-size');

	// src/dest path configs
	var src = "./assets";
	var dest = "./public";

	// Clean
	gulp.task('clean', function(done) {
		del(dest, done);
	});

	// Copies markups
	gulp.task('moveHtml',function(){
	  return gulp.src([src + '/views'],  {base: src + '/views'}) 
	  			 .pipe(gulp.dest(dest));
	});

	// compile all your Sass
	gulp.task('sass', function (){
		gulp.src([src + '/style/**/*.scss', '!' + src + '/style/_variables.scss'])
			.pipe(sass({
				includePaths: [src + '/style'],
				outputStyle: 'expanded'
			}))
			.pipe(prefix(
				"last 1 version", "> 1%", "ie 8", "ie 7"
				))
			// .pipe(gulp.dest(dest + '/css'))
			// .pipe(minifycss())
			.pipe(gulp.dest(dest + '/css'));
	});

	// Uglify JS
	gulp.task('uglify', function(){
		gulp.src(src + '/js/**/*.js')
			.pipe(uglify())
			.pipe(gulp.dest(dest + '/js'));
	});

	// Images
	gulp.task('imagemin', function () {
		gulp.src(src + '/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dest + '/img'));
	});

	// Stats and Things
	gulp.task('stats', function () {
		gulp.src(dest) // net total set of files
		.pipe(size())
		.pipe(gulp.dest(dest));
	});

	gulp.task('default', ['moveHtml', 'sass', 'uglify', 'imagemin', 'stats']);

	gulp.task('watch', ['default'], function() {

		// watch for markup changes
		gulp.watch(src + "/views/**/*.html", ["moveHtml"]);
		// watch me getting Sassy
		gulp.watch(src + "/style/**/*.scss", ["sass"]);
		// make my JavaScript ugly
		gulp.watch(src + "/js/**/*.js", ["uglify"]);
		// images
		gulp.watch(src + "/img/**/*", ["imagemin"]);
	});