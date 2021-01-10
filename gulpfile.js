const { series, src, dest, watch } = require('gulp');

const htmlClean = require('gulp-htmlClean');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const imageMin = require('gulp-imagemin');
const connect = require('gulp-connect');

const floder = {
    src: 'src/',
    dist: 'dist/'
}

function html() {
    return src(floder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(floder.dist + 'html/'));
}

function css() {
    return src(floder.src + 'css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(floder.dist + 'css/'));
}

function js() {
    return src(floder.src + 'js/*')
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(dest(floder.dist + 'js/'));
}

function image() {
    return src(floder.src + 'images/*')
        .pipe(imageMin())
        .pipe(dest(floder.dist + 'images/'));
}

exports.default = series(html, css, js, image);