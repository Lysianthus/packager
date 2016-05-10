var del = require('del'),
	gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	cssbeautify = require('gulp-cssbeautify'),
	uglify = require('gulp-uglify'),
	rev = require('gulp-rev'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	twig = require('gulp-twig');
	//plugins = require('gulp-load-plugins')();

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('compress', function() {
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', autoprefixer()))
		.pipe(gulpif('*.css', cleancss()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest('dist'))
});

gulp.task('expand', function() {
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', autoprefixer()))
		.pipe(gulpif('*.css', cssbeautify()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest('dist'))
});

gulp.task('twig', function() {
	return gulp.src('src/**/*.twig')
		.pipe(twig({
			data: {
				title: "Asclaria",
				separator: "&mdash;",
				subtitle: "an umbrella network"
			}
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
	return gulp.src('src/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/images/'));
});

gulp.task('common', function() {
	return gulp.src('common/**/*')
		.pipe(gulp.dest('dist'))
});

gulp.task('hash', function() {
	return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
		.pipe(rev())
		.pipe(gulp.dest('dist'))
});

gulp.task('default', ['compress', 'images']);