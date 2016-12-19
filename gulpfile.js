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
			// .pipe(gulp.dest(dest + '/css'))
			// .pipe(minifycss())
			.pipe(gulp.dest(dest + '/css'));
	});

	// CSS vendor processing
	gulp.task('baseCss', function (){
		gulp.src([src + '/style/base.scss'])
			// .pipe(sass({
			// 	includePaths: [src + '/style'],
			// 	outputStyle: 'expanded'
			// }))
			// .pipe(prefix(
			// 	"last 1 version", "> 1%", "ie 8", "ie 7"
			// 	))
			// .pipe(gulp.dest(dest + '/css'))
			// .pipe(minifycss())
			.pipe(gulp.dest(dest + '/css'));
	});

	// Processing app level JS
	gulp.task('appJs', function(){
		gulp.src([src + '/js/**/*.js', '!' + src + '/js/vendors/**/*.js'], {overwrite: true}) // all except vendor scripts
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

	gulp.task('watch', [], function() {

		// watch for markup changes
		gulp.watch(src + "/views/**/*.html", ["appHtml"]);
		// watch me getting Sassy
		gulp.watch(src + "/style/**/*.scss", ["appCss"]); // currently watching only app-level css. 
		// make my JavaScript ugly
		gulp.watch(src + "/js/**/*.js", ["appJs"]);
		// images
		gulp.watch(src + "/img/**/*", ["imagemin"]);
	});