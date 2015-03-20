var gulp = require('gulp'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    ghPages = require('gh-pages'),
    path = require('path'),
    del = require('del');

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});
    
gulp.task('js', ['clean'], function () {
    return gulp.src(mainBowerFiles()).pipe(gulp.dest('./dist'));
});

gulp.task('index', ['clean', 'js'], function () {
    return gulp.src('src/app.html')
        .pipe(rename('index.html'))
        .pipe(inject(gulp.src(['./dist/**.js', './dist/**.css']), {ignorePath: '/dist'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-index', function () {
    gulp.watch('src/app.html', ['index']);
});

gulp.task('build', ['clean', 'js', 'index']);
gulp.task('default', ['build']);

gulp.task('deploy', ['build'], function (cb) {
    ghPages.publish(path.join(process.cwd(), 'dist'), cb);
});
