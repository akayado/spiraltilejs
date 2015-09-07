gulp = require 'gulp'
coffee = require 'gulp-coffee'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

gulp.task 'compile-coffee', () ->
	gulp.src 'src/*.coffee'
	.pipe coffee()
	.pipe gulp.dest('js/')
  .pipe uglify({preserveComments: "all"})
  .pipe rename extname: '.min.js'
  .pipe gulp.dest('js/')
