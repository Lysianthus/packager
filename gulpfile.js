var del = require('del'),
	gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cssbeautify = require('gulp-cssbeautify'),
	gulpif = require('gulp-if'),
	minifycss = require('gulp-minify-css'),
	twig = require('gulp-twig'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('com', function() { //short for 'compressed'
	var assets = useref.assets();

	return gulp.src('src/*.html')
		.pipe(assets)
		.pipe(gulpif('*.css', autoprefixer()))
		.pipe(gulpif('*.css', minifycss()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'))
});

gulp.task('exp', function() { // short for 'expanded'
	var assets = useref.assets();

	return gulp.src('src/*.html')
		.pipe(assets)
		.pipe(gulpif('*.css', autoprefixer()))
		.pipe(gulpif('*.css', cssbeautify()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
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

gulp.task('imagemin', () => {
	return gulp.src('src/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/images/'));
});

gulp.task('common', function() {
	return gulp.src('common/**/*', {read:false})
		.pipe(gulp.dest('dist'))
});

gulp.task('default', ['com']);