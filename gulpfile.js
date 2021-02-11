const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

const imagemin = require('gulp-imagemin');
function imgMinify() {
    return src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}
exports.img = imgMinify
const htmlmin = require('gulp-htmlmin');
function copyHtml() {
    return src('assets/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
}

exports.html = copyHtml
 const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
 const terser = require('gulp-terser');

 function jsMinify() {
     return src('assets/js/**/*.js') //path includeing all js files in all folders
         .pipe(sourcemaps.init())
         //concate all js files in all.min.js
         .pipe(concat('all.min.js'))
         //use terser to minify js files
         .pipe(terser())
         //create source map file in the same directory
         .pipe(sourcemaps.write('.'))
         .pipe(dest('dist/assets/js'));
 }
 exports.js = jsMinify
var cleanCss = require('gulp-clean-css');
function cssMinify() {
    return src("assets/css/**/*.css")
        //concate all css files in style.min.css
        .pipe(concat('style.min.css'))
        //minify file 
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'));

}

exports.css = cssMinify

var sass = require('gulp-sass');
function sassMinify() {
    return src(["assets/sass/**/*.scss", "assets/css/**/*.css"])
        .pipe(sass()) // Using gulp-sass
        //concate all js files in all.min.js
        .pipe(concat('style.sass.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/assets/css'))
}

function watchTask() {
    //"src/css/**/*.css",
    watch(['assets/js/**/*.js', "assets/css/**/*.css"], { interval: 1000 }, parallel(jsMinify,  sassMinify,cssMinify));
}

exports.default = series(parallel(imgMinify, jsMinify , cssMinify, sassMinify , copyHtml), watchTask)