var gulp = require('gulp');
var util = require('gulp-util');
var tsc = require('gulp-typescript');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('compile-ts', ['compile-scripts', 'compile-tests']);

gulp.task('compile-scripts', function () {
    var tsProject = tsc.createProject('tsconfig.json');
    return gulp.src(['./scripts/**/*.ts'])
        .pipe(tsProject())
        .on('error', util.log)
        .pipe(gulp.dest('./scripts'));
});

gulp.task('compile-tests', function () {
    return gulp.src(['./test/**/*.ts'])
        .pipe(tsc({
            module: "commonjs",
            target: "ES5"
        }))
        .on('error', util.log)
        .pipe(gulp.dest('./test'));
});

gulp.task('test', function () {
    return gulp.src('./test/*.js', { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', handleError);
});

gulp.task('watch', function () {
    gulp.watch(['./**/*.ts'], function () {
        runSequence('compile-ts', 'test');
    });
});

gulp.task('concat', function() {
  return gulp.src(['./scripts/_.js', './scripts/*.js'])
    .pipe(concat('user.script.js'))
    .pipe(gulp.dest('./min/'));
});

gulp.task('default', function () {
    runSequence('compile-ts', 'test', 'watch');
});
