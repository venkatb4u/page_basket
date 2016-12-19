// Page_Basket  //
//////////////////

	// Gulp
	var gulp = require('gulp');

	// notify
	var notify = require('gulp-notify');

	// HbsAll
	var hbsAll = require('gulp-handlebars-all');

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
	var config = require('./config/fd');

	// src/dest path configs
	var src = "./assets";
	var dest = "./public";

	// Clean
	gulp.task('clean', function(done) {
		del(dest, done);
	});


	// TASKS 
	//======

	// Compiles hbs templates
	gulp.task('appHtml', function() {
	   gulp.src([src + '/views/*.html', '!' + src + '/views/partials/**/*.hbs'])
		  	.pipe(hbsAll('html', {
			    context: {firstName: 'venkat'},
			 
			    partials: [src + '/views/partials/**/*.hbs'],
			 
			    helpers: {
			      capitals : function(str) {
			        return str.toUpperCase();
			      }
			    }
			  }))
		  	.pipe(gulp.dest(dest + '/views'));
	});

	// compile all your app level Sass
	gulp.task('appCss', function (){
		gulp.src([src + '/style/**/*.scss', '!' + src + '/style/base.scss'])
			.pipe(sass({
				includePaths: [src + '/style'],
				outputStyle: 'expanded'
			}))
			.pipe(prefix(
				"last 1 version", "> 1%", "ie 8", "ie 7"
				))
			.pipe(gulp.dest(dest + '/css'))
			.pipe(minifycss())
			.pipe(gulp.dest(dest + '/css/min'));
	});

	// CSS vendor processing
	gulp.task('baseCss', function (){
		gulp.src([src + '/style/base.scss'], {overwrite: true})
			.pipe(sass({
				includePaths: [src + '/style']
			}))
			.pipe(gulp.dest(dest + '/css'))
			.pipe(minifycss())
			.pipe(gulp.dest(dest + '/css/min'));
	});

	// Processing app level JS
	gulp.task('appJs', function(){
		return gulp.src([src + '/js/**/*.js', '!' + src + '/js/vendors/**/*.js'], {overwrite: true}) // all except vendor scripts
				.pipe(gulp.dest(dest + '/js'))
				.pipe(uglify())
				.pipe(gulp.dest(dest + '/js/min'));
	});

	// Vendor JS
	gulp.task('baseJs', function(){
		return gulp.src([src + '/js/vendors/**/*.js'], {overwrite: true}) // all vendor scripts
				.pipe(gulp.dest(dest + '/js/min/vendors'))
				.pipe(gulp.dest(dest + '/js/vendors'));
	});
	// Images
	gulp.task('imagemin', function () {
		return gulp.src(src + '/img/**/*')
				.pipe(imagemin())
				.pipe(gulp.dest(dest + '/img'));
	});

	// Stats and Things
	gulp.task('stats', function () {
 		var s = size();
	    return gulp.src([src + '/style/**/*.scss', src + '/js/**/*.js']) // net total size of css/js files
	        .pipe(s)
	        .pipe(gulp.dest(dest));
	        // .pipe(notify({
	        //     onLast: true,
	        //     message: () => `Total size ${s.prettySize}`
	        // }));
	});

	gulp.task('default', ['appHtml', 'baseCss', 'appCss', 'appJs', 'imagemin', 'stats']);

	gulp.task('watch', ['default'], function() {

		// watch for markup changes
		gulp.watch(src + "/views/**/*.html", ["appHtml"]);
		// watch me getting Sassy
		gulp.watch(src + "/style/**/*.scss", ["appCss"]); // currently watching only app-level css. 
		// make my JavaScript ugly
		gulp.watch(src + "/js/**/*.js", ["appJs"]);
		// images
		gulp.watch(src + "/img/**/*", ["imagemin"]);
	});