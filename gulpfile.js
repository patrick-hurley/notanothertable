const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const del = require('del');
const minify = require('gulp-minify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

/* -------------------------------------------------------------------------------------------------
Project location 
-------------------------------------------------------------------------------------------------- */
const projectLocation = 'localhost:8888/' + process.cwd().slice(27);


// clean the dist folder
gulp.task('clean', function () {

    del.sync(['dist/'])

});

// compile sass and autoprefix
gulp.task('sass', function () {

    var onError = function (err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Sass compiler error",
            message: "Error: <%= error.message %>",
            sound: "Hero"
        })(err);

        this.emit('end');
    };

    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())

});

// process js
gulp.task('js', function () {

    return gulp.src([
            'src/js/*.js'
        ])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist/js/'))

});

// pipe ts files to dist/
gulp.task('ts', function () {

    return gulp.src(['src/js/*.ts'])
        .pipe(gulp.dest('dist/js/'))

});

// pipe html files to dist/
gulp.task('html', function () {

    return gulp.src(['*.html'])
        .pipe(changed('/'))
        .pipe(browserSync.stream())

});

// BrowserSync reload all browsers
gulp.task('browsersync-reload', function () {

    browserSync.reload();

});

// watch for changes and initialise browserSync
gulp.task('watch', function () {

    browserSync.init({
        proxy: projectLocation
    });

    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js', 'browsersync-reload']);
    gulp.watch('*.html', ['html']);

});

// build entire dist folder
gulp.task('build', ['clean', 'sass', 'js', 'ts', 'html']);