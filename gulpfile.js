const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

/* -------------------------------------------------------------------------------------------------
Project location 
-------------------------------------------------------------------------------------------------- */
const projectLocation = 'localhost:8888/' + process.cwd().slice(27) + '/dist/';


// clean the dist folder
gulp.task('clean', function(){

	del.sync(['dist/'])

});

// compile sass and autoprefix
gulp.task('sass', function(){

	var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Sass compiler error",
                    message:  "Error: <%= error.message %>",
                    sound: "Hero"
                })(err);

        this.emit('end');
    };

	return gulp.src('src/sass/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())

});

// concatenate js
gulp.task('js', function(){

	return gulp.src([
			'src/js/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js/'))

});

// optimise images
gulp.task('images', function(){

	return gulp.src('src/img/*')
		.pipe(changed('dist/img'))
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('dist/img'))

});


// pipe php files to dist/
gulp.task('html', function(){

	return gulp.src(['src/**/*.html'])
		.pipe(changed('dist/'))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream())

});

// pipe all font files to dist/
gulp.task('fonts', function(){

	return gulp.src(['src/fonts/*'])
		.pipe(gulp.dest('dist/fonts'))

});

// BrowserSync reload all browsers
gulp.task('browsersync-reload', function () {

  browserSync.reload();

});

// watch for changes and initialise browserSync
gulp.task('watch', function(){

	browserSync.init({
        proxy: projectLocation
    });

	gulp.watch('src/sass/**/*.scss',['sass']);
	gulp.watch('src/js/**/*.js',['js','browsersync-reload']);
	gulp.watch('src/fonts/**/*',['fonts','browsersync-reload']);
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/img/*',['images','browsersync-reload']);

});

// build entire dist folder
gulp.task('build',['clean','sass','js','images','html','fonts']);

