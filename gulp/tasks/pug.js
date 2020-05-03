const gulp = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const notify = require('gulp-notify');

// Преобразуем Pug в HTML

module.exports = function pug2html() {
  var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
    })(err);
    this.emit('end');
  };
  return gulp.src('dev/pug/*.pug')
    .pipe(plumber({errorHandler: onError}))
    .pipe(pug({
      pretty: '  '
    }))
    .pipe(plumber.stop())
    .pipe(gulpif(argv.prod, htmlValidator()))
    .pipe(gulp.dest('dist'))
};
