const gulp = require('gulp');

gulp.task('taskone', function () {
    console.log('in task one');
})

gulp.task('default', ['taskone'], function () {
    console.log('gulp test');
})