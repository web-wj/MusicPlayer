/* function defaultTask(cb) {
    // place code for your default task here
    console.log('wangjia')
    cb();
}

exports.default = defaultTask; */

/* const { series, parallel } = require('gulp');

function fn1(cb) {
    console.log('fn1被调用了');
    cb();
}

function fn2(cb) {
    console.log('fn2被调用了')
    cb();
}

exports.buld = fn1;
//exports.default = series(fn1, fn2);
exports.default = parallel(fn1, fn2) */

//处理文件src dest通过pipe处理联系
const { src, dest, watch } = require('gulp')
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

watch('src/css/*', {}, function(cb) {
    console.log('文件被修改了！');
    cb();
})
exports.default = function() {
    return src('src/js/*.js')
        .pipe(dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js'))
}