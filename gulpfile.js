"use strict";

var gulp        = require("gulp"),
    $           = require("gulp-load-plugins")(),
    cmq         = require("gulp-combine-media-queries"),
    sources     = {
        scss:         "assets/scss/**/*.scss",
        scssDir:      "assets/scss/",
        scssBuildDir: "assets/scss/_build/",
        css:          "assets/scss/_build/**/*.css",
        cssDir:       "assets/css/",
        js:           "assets/js/src/**/*.js",
        jsDist:       "assets/js/dist/**/*.js",
        jsDir:        "assets/js/",
        jsSrcDir:     "assets/js/src/",
        jsDestDir:    "assets/js/dist/"
    };

// ===== Scss build ===== //
gulp.task("scss", function(){
    gulp.src(sources.scss)
       .pipe($.compass({
           config_file: "config.rb",
           comments:     false,
           css:          sources.scssBuildDir,
           sass:         sources.scssDir
       }));
});
// ===== Scss build ===== //

// ===== Css optimaize ===== //
gulp.task("css", function(){
    gulp.src(sources.css)
       .pipe($.csscomb("csscomb.json"))
       .pipe($.pleeease({
            fallbacks: {
                autoprefixer: ["last 2 versions", "ie 10"]
            },
            opacity: false,
            minifier: false,
            mqpacker: true
        }))
       .pipe(gulp.dest(sources.cssDir))
       .pipe($.rename({suffix: ".min"}))
       .pipe($.csso())
       .pipe(gulp.dest(sources.cssDir));
});
// ===== Css optimaize ===== //

// ===== JS optimaize ===== //
gulp.task("js", function(){
    gulp.src(sources.js)
       .pipe($.rename({suffix: ".min"}))
       .pipe($.uglify({preserveComments: "some"}))
       .pipe(gulp.dest(sources.jsDestDir));
});
// ===== JS optimaize ===== //

// ===== Watch ===== //
gulp.task("watch", function(){
    gulp.watch([sources.scss], ["scss"]);
    gulp.watch([sources.css], ["css"]);
    gulp.watch([sources.js], ["js"]);
});
// ===== Watch ===== //

// ===== Default task ===== //
gulp.task("default", ["scss", "css", "js"], function(){
    gulp.start("watch");
});
// ===== Default task ===== //
