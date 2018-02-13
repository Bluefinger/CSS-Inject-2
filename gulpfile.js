"use strict";

const gulp = require("gulp");
// const $if = require("gulp-if");
const browserify = require("browserify");
const babelify = require("babelify");
const watchify = require("watchify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const log = require("gulplog");
const mochify = require("mochify");

// add custom browserify options here
const customOpts = {
    debug: true,
    entries: ['./src/CssInject.js']
};
const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

const testOpts = { reporter: "dot" };

const babelOpts = {
    global: true,
    only: /^(?:.*\/node_modules\/(?:mixwith)\/|(?!.*\/node_modules\/)).*$/,
    plugins: ["transform-es2015-modules-commonjs"],
    presets: ["env"]
};

const m = mochify(testOpts);

/*
 * add transformations here
 * i.e. b.transform(coffeeify);
 */

b.transform(babelify, babelOpts);
m.transform(babelify, babelOpts);

const bundle = function() {
    return b.bundle()
        // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('cssinject.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // loads map from browserify file
        .pipe(sourcemaps.init({ loadMaps: true })) 
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
}

const test = function () {
    return m.bundle();
}

// on any dep update, runs the bundler
b.on('update', bundle);
// output build logs to terminal
b.on('log', log.info);

gulp.task('build', bundle);
gulp.task('test', test);