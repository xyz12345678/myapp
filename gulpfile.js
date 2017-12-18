var gulp = require('gulp'),
rev = require('gulp-rev'),
revCollector = require('gulp-rev-collector'),
uglify = require('gulp-uglify'),
minifycss = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
del = require('del'),
less = require('gulp-less'),
gulpif = require('gulp-if'),
gulpSequence = require('gulp-sequence'),
argv = require('yargs').argv,
isProduction = argv.NODE_ENV === 'production';


const src = {
img: [
    'app/resource/img/**/*.png',
    'app/resource/img/**/*.jpg',
    'app/resource/img/**/*.gif',
    'app/resource/img/**/*.jpeg',
],
css: [
    'app/resource/css/**/*.css',
    'app/resource/css/**/*.less'
],
js: 'app/resource/js/**/*.js',
html: 'app/resource/pages/**/*.html',
};

const defaultRevConfig = {
replaceReved: true,
dirReplacements: {
    'css/': 'css/',
    'js/': 'js/',
    'img/': 'img/',
    'data/': 'data/',
},
};

/**
* 清除编译后的文件
*/
gulp.task('clean', (cb) => {
console.log('remove dist,rev,views,ncl*.zip directory!');
return del(['dist', 'rev', 'views', '*.zip'], cb);
});

/**
* 编译images
*/
gulp.task('image', function () {
return gulp.src(src.img)
    .pipe(rev())
    .pipe(gulp.dest('dist/img'))
    .pipe(gulpif(isProduction, imagemin()))
    .pipe(gulp.dest('dist/img'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/img'));
});

/**
* 编译less
*/
gulp.task('less', function () {
return gulp.src(src.css)
    .pipe(less())
    .pipe(gulp.dest('rev/css'))
});

/**
* 编译css
*/
gulp.task('css', ['less'], function () {
return gulp.src(['rev/**/*.json', 'rev/css/**/*.css'])
    .pipe(revCollector(defaultRevConfig))
    .pipe(gulp.dest('rev/css'))
    .pipe(rev())
    .pipe(gulp.dest('rev/css'))
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(gulp.dest('dist/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

/**
* 编译js
*/
gulp.task('js', function () {
return gulp.src([src.js])
    .pipe(revCollector(defaultRevConfig))
    .pipe(gulp.dest("rev/js"))
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(gulpif(isProduction, uglify().on('error', (e) => { console.log('\x07', e.message); return this.end(); })))
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

//编译data
gulp.task('data', function () {
return gulp.src('src/data/**/*.*')
    .pipe(rev())
    .pipe(gulp.dest('dist/data'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/data'));
});

//copy lib
gulp.task('lib', function () {
return gulp.src('src/lib/**/*.*')
    .pipe(gulp.dest('dist/lib'))
});

//替换html引用
gulp.task('html', () => {
return gulp.src(['rev/**/*.json', src.html])
    .pipe(revCollector(defaultRevConfig))
    .pipe(gulp.dest('views'));
});


gulp.task('build', gulpSequence('clean', 'lib', 'image', 'css', 'js', 'data', 'html'));


gulp.task('default', function () {
return gulp.watch('src/**/*', function (event) {
    gulpSequence('clean', 'image', 'css', 'js', 'lib', 'data', 'html')(function (err) {
        if (err) console.log(err)
    })
})
})


