"use strict";

const gulp = require("gulp");
const $if = require("gulp-if");
const browserify = require("browserify");
const babelify = require("babelify");
const watchify = require("watchify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const log = require("gulplog");
const yargs = require("yargs");
const mochify = require("mochify");

// add custom browserify options here
const customOpts = {
    entries: ['./src/CssInject.js'],
    debug: true
};
const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

const testOpts = {
    reporter: "dot"
};

const babelOpts = {
    presets: ["env"],
    plugins: ["transform-es2015-modules-commonjs"]
};

const m = mochify(testOpts);

m.transform(babelify, babelOpts)

// add transformations here
// i.e. b.transform(coffeeify);
b.transform(babelify, babelOpts);

gulp.task('build', bundle); // so you can run `gulp js` to build the file
gulp.task('test', test);

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('cssinject.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', log.error)
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist'));
}

function test() {
    return m.bundle();
}