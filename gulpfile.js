const  gulp = require('gulp'),
    rev = require('gulp-rev'),
    del = require('del'),
    revCollector = require('gulp-rev-collector'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');

const src = {
    img: [
        'src/img/**/*.png',
        'src/img/**/*.jpg',
        'src/img/**/*.gif',
        'src/img/**/*.jpeg',
    ],
    css: 'src/css/**/*.css',
    js: 'src/js/**/*.js',
    html: 'src/pages/**/*.html'
};

const defaultRevConfig = {
    replaceReved: true,
    dirReplacements: {
        'css/': '/css',
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
gulp.task('image',() => {
    return gulp.src(src.img)
    .pipe(rev())
    .pipe(gulp.dest('dist/img'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/img'))
})
/**
 * 编译css
 */
gulp.task('css',['image'],() => {
    return gulp.src(src.css)
    .pipe(revCollector(defaultRevConfig))
    .pipe(gulp.dest('rev/css'))
    .pipe(rev())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'))
})

/**
 * 编译js
 */
gulp.task('js',['css'],() => {
    return gulp.src(src.js)
    //.pipe(gulp.dest('rev/css'))
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'))
})

/**
 * 编译data
 */
gulp.task('data',['js'],() => {
    return gulp.src('src/data/**/*.*')
    //.pipe(gulp.dest('rev/css'))
    .pipe(rev())
    .pipe(gulp.dest('dist/data'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/data'))
})

gulp.task('build', ['data'], () => {
    return gulp.src(['rev/**/*.json', src.html])
        .pipe(revCollector(defaultRevConfig))
        .pipe(gulp.dest('views'));
});