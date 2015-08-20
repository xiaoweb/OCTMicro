/**
 * Created by zhouliying1 on 2015/7/24.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    minfycss = require('gulp-minify-css'),
    imgMin = require('gulp-imagemin');
var imageminOptipng = require('imagemin-optipng');
//压缩html
gulp.task("html",function(){
    gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
});
//压缩/拷贝js
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
    gulp.src("./src/js/kissy/**/*")
        .pipe(gulp.dest("./dist/js/kissy"));
});
//压缩/拷贝 图片
gulp.task("img",function(){
    return gulp.src("./src/images/**/*")
        /*.pipe(imageminOptipng({optimizationLevel: 2})())*/
        .pipe(gulp.dest("./dist/images"));
});
//压缩css
gulp.task("css",function(){
    gulp.src("./src/css/**/*")
        .pipe(minfycss())
        .pipe(gulp.dest("./dist/css"));
});
//拷贝mp3
gulp.task("mp3",function(){
    gulp.src('./src/mp3/**/*')
        .pipe(gulp.dest("./dist/mp3"));
});
//清空发布目录
gulp.task("clean",function(){
    return gulp.src('./dist',{read:false}).pipe(clean({force: true}));
});

gulp.task("default",['clean'],function(){
    gulp.start('html','mp3','js','css','img');
});
