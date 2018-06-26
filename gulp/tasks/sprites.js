// The goal of this .js is to combine all icon images into a single sprite.

// Require in gulp and the necessary gulp packages
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

// Create an object literal for use with svg-sprite
var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

// Delete the sprite folders that contain generated sprites,
// so they gets regenerated correctly each time.
// del takes an array of folders to delete
gulp.task('beginClean', function() {
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// Params: name of task
// svg-sprite needs an object literal as a param
gulp.task('createSprite', ['beginClean'], function() {
	return gulp.src('./app/assets/images/icons/**/*.svg')
	    .pipe(svgSprite(config))
	    .pipe(gulp.dest('./app/temp/sprite/'));
});

// Copies the generated sprite file to the normal images hierarchy
// To verify, on the website, right-click on a sprite-generated image and select Inspect.
// In the element list, the .icon element should specify the /assets/images/... directory.
gulp.task('copySpriteGraphic', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
	    .pipe(gulp.dest('./app/assets/images/sprites'));
});

// Copies the generate sprite.css file to the modules directory and 
// renames it with a leading underscore.
// The depends on (the 2nd param in []) makes sure this task waits for 
// the 'createSprite' task to complete before this task runs. If running 
// these two from the cmd line separately, that wouldn't matter, but since 
// the icons task runs both, we need to make sure 'createSprite' completes 
// before 'copySpriteCSS' runs.
gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/*.css')
	    .pipe(rename('_sprite.css'))
	    .pipe(gulp.dest('./app/assets/styles/modules'));
});

// Delete the temp/sprite folder after all the tasks are complete
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
	return del('./app/temp/sprite');
});

// This task runs the above two tasks
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);