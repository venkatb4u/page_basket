// Gulp tasks //
//////////////////////////

// Gulp
var gulp = require('gulp');
// SourceMap
var sourcemaps = require('gulp-sourcemaps');
// single-threading the tasks
var runSequence = require('run-sequence');

// notify
var notify = require('gulp-notify');

// Hbs
var hbsAll = require('gulp-handlebars-all');


// delete
var del = require('del');

// Sass/CSS stuff
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// JavaScript
var uglify = require('gulp-uglify');

// Images
var imagemin = require('gulp-imagemin');

var connect = require('gulp-connect');

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

//Connection to server
gulp.task('connect', function() {
  connect.server({
  	root: 'public',
  	port: 8001,
    livereload: true
  });
});

// Compiles base HTMLs
gulp.task('appHtml', function() {
   gulp.src([src + '/*.html', '!' + src + '/js/templates/**/*.hbs'])
	  	.pipe(hbsAll('html', {
		    context: {firstName: 'venkat'},
		 
		    // partials: [src + '/views/apps/**/*.hbs'],
		    partials: [src + '/js/templates/**/*.hbs'],
		 
		    helpers: {
		      capitals : function(str) {
		        return str.toUpperCase();
		      }
		    }
		  }))
	  	.pipe(gulp.dest(dest))
	  	.pipe(connect.reload());
});


// compile all your app level Sass
gulp.task('appCss', function (){
	gulp.src([src + '/style/**/*.scss', '!' + src + '/style/base.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [src + '/style'],
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'IE 10', 'IE 9', 'IE 8'],
            cascade: false
        }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest + '/css'))
		.pipe(minifycss())
		.pipe(gulp.dest(dest + '/css/min'))
		.pipe(connect.reload());
});

// CSS vendor processing
gulp.task('baseCss', function (){
	gulp.src([src + '/style/base.scss'], {overwrite: true})
		.pipe(sass({
			includePaths: [src + '/style']
		}))
		.pipe(gulp.dest(dest + '/css'))
		.pipe(minifycss())
		.pipe(gulp.dest(dest + '/css/min'))
		.pipe(connect.reload());
});
// Fonts handler
gulp.task('appFonts', function() {
    return gulp.src([src + '/font/**/*.{eot,svg,ttf,woff,woff2}'])
            .pipe(gulp.dest(dest + '/css/font/'))
            .pipe(connect.reload());
});

// Processing app level JS
gulp.task('appJs', function(){
	return gulp.src([src + '/js/**/*.js', '!' + src + '/js/vendors/**/*.js'], {overwrite: true}) // all except vendor scripts
			.pipe(sourcemaps.init())
			.pipe(gulp.dest(dest + '/js'))
			.pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(dest + '/js/min'))
			.pipe(connect.reload());
});
// Hbs templates
gulp.task('templates', function(){
	return gulp.src([src + '/js/templates/**/*.hbs'], {overwrite: true}) // all vendor scripts
			.pipe(gulp.dest(dest + '/js/min/templates'))
			.pipe(gulp.dest(dest + '/js/templates'))
			.pipe(connect.reload());
});
// Vendor JS
gulp.task('baseJs', function(){
	return gulp.src([src + '/js/vendors/**/*.js'], {overwrite: true}) // all vendor scripts
			.pipe(gulp.dest(dest + '/js/min/vendors'))
			.pipe(gulp.dest(dest + '/js/vendors'))
			.pipe(connect.reload());
});
// Images
gulp.task('imagemin', function () {
	return gulp.src(src + '/img/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest(dest + '/img'))
			.pipe(connect.reload());
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

gulp.task('default', ['connect','appHtml', 'baseCss', 'appCss', 'appFonts', 'appJs', 'templates', 'baseJs', 'imagemin'], function(callback) {
	console.log('Computing total size of page resources:');
	runSequence('stats', callback);
});

gulp.task('watch', ['default'], function() { // this does 'default' set once, and then begins to watch for changes

	console.log('WATCHING for changes:');
	// watch for markup & hbs changes
	gulp.watch([src + "/*.html", "!" + src + "/js/templates/**/*.hbs"], ["appHtml"]);
	gulp.watch([src + '/js/templates/**/*.hbs'], ["appHtml"]); 

	// watch for style changes
	gulp.watch(src + "/style/**/*.scss", ["appCss"]); // currently watching only app-level css. 
	// watch for js changes
	gulp.watch([src + "/js/**/*.js"], ["appJs"]);
	
	// watch for img minification
	gulp.watch(src + "/img/**/*", ["imagemin"]);
});