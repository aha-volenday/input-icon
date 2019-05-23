const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const vendor = {
	scripts: ['node_modules/fontawesome-iconpicker/dist/js/fontawesome-iconpicker.js']
};

gulp.task('vendor:js', () => {
	return gulp
		.src(vendor.scripts)
		.pipe(concat('vendors.min.js'))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('dist'));
});

gulp.task('vendor', gulp.parallel('vendor:js'));
gulp.task('build', gulp.series('vendor'));
gulp.task('default', gulp.series('vendor'));
