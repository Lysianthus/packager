// constants

const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-clean-css'),
	beautifycss = require('gulp-cssbeautify'),
	gulpif = require('gulp-if'),
	//minifyimg = require('gulp-imagemin'),
	rev = require('gulp-rev'),
	minifyjs = require('gulp-uglify'),
	useref = require('gulp-useref');


// functions

function compress() {
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', autoprefixer()))
		.pipe(gulpif('*.css', minifycss()))
		.pipe(gulpif('*.js', minifyjs()))
		.pipe(gulp.dest('dist'))
}

function expand() {
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', autoprefixer()))
		.pipe(gulpif('*.css', beautifycss()))
		.pipe(gulpif('*.js', minifyjs()))
		.pipe(gulp.dest('dist'))
}

/*function images() {
	return gulp.src('src/images/*')
		.pipe(minifyimg())
		.pipe(gulp.dest('dist/images/'));
}*/

function common() {
	return gulp.src('common/**/*')
		.pipe(gulp.dest('dist'));
}

function rename() {
	return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
		.pipe(rev())
		.pipe(gulp.dest('dist'));
}


// exports

exports.compress = series(parallel(compress, common), rename);
exports.expand = series(parallel(expand, common), rename);
//exports.images = images;
exports.default = series(parallel(compress, common), rename);