var gulp = require('gulp'),                     // adds support for Gulp
postcss = require('gulp-postcss'),              // allows for post-processing of CSS using other filters
autoprefixer = require('autoprefixer'),         // adds the required vendor prefixes to CSS
cssvars = require('postcss-simple-vars'),       // adds the ability to use variables within CSS
nested = require('postcss-nested'),             // allows for nested CSS
cssImport = require('postcss-import'),          // allows for importing CSS files into another CSS file
mixins = require('postcss-mixins');             // PostCSS mixins

// Create a task for css files
gulp.task('styles', function() {
	
	// Need return here because gulp.src is an asynchronous function
	
	// This is simply making a copy of the styles.css file in another location
//	return gulp.src('./app/assets/styles/styles.css').pipe(gulp.dest('./app/temp/styles'));

	// This is running the contents of the styles.css file through PostCSS filters and 
	// saving the results in another location; to do this, we need the PostCSS package
	// (PostCSS works on an array); PostCSS really doesn't do much on its own, so use
	// other filters, such as autoprefixer, simple vars, and nested as its arguments
	return gulp.src('./app/assets/styles/styles.css')    // source file specification
	    // This is a list of filters to use with PostCSS
	    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))  
		.on('error', function(errorInfo) {  // error is the event we are interested in
		    console.log(errorInfo.toString()); // outputs error info to the console
	        this.emit('end');       // bring things gracefully to an end, which is what the watch task
		})                          // is looking for; it wants to know when things come to an end        
	    .pipe(gulp.dest('./app/temp/styles'));           // destination specification
});