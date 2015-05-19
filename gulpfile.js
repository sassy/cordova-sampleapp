var gulp = require('gulp');
var jshint = require('gulp-jshint');
var htmlhint = require('gulp-htmlhint');
var csslint = require('gulp-csslint');


gulp.task('jshint', function() {
    return gulp.src('www/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter());
});

gulp.task('htmlhint', function() {
    return gulp.src('www/*.html')
      .pipe(htmlhint())
      .pipe(htmlhint.reporter());
});

gulp.task('csslint', function() {
    return gulp.src('www/css/*.css')
      .pipe(csslint())
      .pipe(csslint.reporter());
});
