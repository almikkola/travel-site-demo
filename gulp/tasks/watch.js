// Import the Gulp libraries that we need
// Note: we could use a var keyword at the beginning of each of these
// lines with a ";" at the end of the line
var gulp = require('gulp'),                     // adds support for Gulp
watch = require('gulp-watch'),                  // watches for changes in one or more files
browserSync = require('browser-sync').create(); // syncs watched changes w/ browser (one method only)

// Create a gulp-watch task to do something when specific files are changed
gulp.task('watch', function() {
	
	browserSync.init( {
		notify: false,  // this gets rid of the black info box that shows up briefly
		
		// Tell browser-sync where the web site lives
		// This is required because browser-sync spins up a small web server on the PC
		// and it has to know where to point to serve up the web site
		server: {
			baseDir: "app"
		}
	});
	
	// Run the html task when a specific .html file is changed
	// Params: file to watch, what to do when file changes
	watch('./app/index.html', function() {
		browserSync.reload();
	});
	
	// Run the styles task when a any .css file is changed within a specific folder
	// Params: file to watch, what to do when file changes
	watch('./app/assets/styles/**/*.css', function() {
		// Run the styles task
//		gulp.start('styles');

        // The above is the original way; now, we want to run the cssInject task,
        // which has the styles task as a dependency that must run and complete first
        gulp.start('cssInject');		
	});
});

// Create a Gulp task to inject the latest CSS into the page without forcing a browser refresh.
// ['styles'] indicates that this is a dependency that must and complete prior to running the
// task's own anonymous function
gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css')
	    .pipe(browserSync.stream());
});