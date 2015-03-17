var gulp = require('gulp'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('main-bower-files'),
    inject = require('gulp-inject');

gulp.task('index', function () {
    return gulp.src('src/app.html')
        .pipe(rename('index.html'))
        .pipe(inject(gulp.src(mainBowerFiles(), {read: false})))
        .pipe(gulp.dest('./'));
});

gulp.task('watch-index', function () {
    gulp.watch('src/app.html', ['index']);
});
