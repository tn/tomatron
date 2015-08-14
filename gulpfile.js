var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var config = require('./config');

gulp.task('build', function () {
    return browserify({entries: config.path.app_file, extensions: ['.jsx'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source(config.path.bundle_file))
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch']);
