// Page_Basket  //
//////////////////

// Gulp
var gulp = require('gulp');
// SourceMap
var sourcemaps = require('gulp-sourcemaps');
// single-threading the tasks
var runSequence = require('run-sequence');

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
	  	.pipe(gulp.dest(dest));
});

// compile all your app level Sass
gulp.task('appCss', function (){
	gulp.src([src + '/style/**/*.scss', '!' + src + '/style/base.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [src + '/style'],
			outputStyle: 'expanded'
		}))
		.pipe(prefix(
			"last 1 version", "> 1%", "ie 8", "ie 7"
			))
		.pipe(sourcemaps.write())
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
			.pipe(sourcemaps.init())
			.pipe(gulp.dest(dest + '/js'))
			.pipe(uglify())
			.pipe(sourcemaps.write())
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
    return gulp.src([dest + '/css/min/**/*.css', dest + '/js/min/**/*.js']) // net total size of css/js files
        .pipe(s)
        .pipe(notify({
            onLast: true,
            message: () => `Total CSS & JS size = ${s.prettySize}`
        }));
});

gulp.task('default', ['appHtml', 'baseCss', 'appCss', 'appJs','baseJs', 'imagemin'], function(callback) {
	console.log('Computing total size of page resources:');
	runSequence('stats', callback);
});

gulp.task('watch', ['default'], function() { // this does 'default' set once, and then begins to watch for changes

	console.log('WATCHING for changes:');
	// watch for markup changes
	gulp.watch(src + "/views/**/*.html", ["appHtml"]);
	// watch for style changes
	gulp.watch(src + "/style/**/*.scss", ["appCss"]); // currently watching only app-level css. 
	// watch for js changes
	gulp.watch(src + "/js/**/*.js", ["appJs"]);
	// watch for img minification
	gulp.watch(src + "/img/**/*", ["imagemin"]);
});