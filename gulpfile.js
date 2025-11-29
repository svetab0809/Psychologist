'use strict'

const {parallel, src, dest, watch} = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const prefixer = require('gulp-autoprefixer')
const rigger = require('gulp-rigger')
const rename = require('gulp-rename')
const less = require('gulp-less')
const cssmin = require('gulp-cssmin')
const terser = require('gulp-terser')

function html() {
    return src('./src/index.html')
        .pipe(rigger())
        .pipe(dest('.'))
        .pipe(reload({stream: true}))
}

function less_translator() {
    return src('./src/less/main.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(prefixer({cascade: false}))
        .pipe(dest('./css'))
        .pipe(reload({stream: true}))
}

function fonts() {
    return src('./src/fonts/**/*').pipe(dest('./fonts'))
}

function libs() {
    return src('./src/libs/**/*').pipe(dest('./libs'))
}

function js() {
    return src('./src/js/**/*')
        .pipe(terser({mangle: true, compress: true, keep_fnames: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./js'))
        .pipe(reload({stream: true}))
}

function php() {
    return src('./src/php/**/*').pipe(dest('./php'))
}

const config = {
    server: {baseDir: '.'},
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: 'jf'
}

function webServer(cb) {
    browserSync(config)
    cb()
}

function sound() {
    return src('./src/sound/**/*').pipe(dest('./sound'))
}

function watchAll(cb) {
    watch('./src/*.html', html)
    watch('./src/blocks/*.html', html)
    watch('./src/less/*.less', less_translator)
    watch('./src/fonts/**/*', fonts)
    watch('./src/libs/**/*', libs)
    watch('./src/js/**/*', js)
    watch('./src/php/**/*', php)
    watch('./src/sound/**/*', sound)
    cb()
}

exports.default = parallel(webServer, watchAll)