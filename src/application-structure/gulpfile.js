//Copy to your project's gulpfile.js

//Prerequisites
var gulp = require('gulp');
var gulp-rename = require('gulp-rename');

// Directive test task
(function() {
	var taskSettings = { 
		//change according to the project, if necessary
		taskName: 'test-directive',
		srcRoot: 'src',
		targetRoot: 'target',
		bowerComponents: 'bower_components',
		cleanTargetTaskName: 'clean'
	};

	gulp.task(taskSettings.taskName, [taskSettings.cleanTargetTaskName], buildTest);

	function buildTest() {
		if (process.argv[3]) {
			var directiveName = process.argv[3].substring(2);
			var directivePath = taskSettings.srcRoot + '/' + directiveName.replace(/-/g, '/');

			gulp.src([
					directivePath + '/*.js',
					directivePath + '/*.css'
				]).
				pipe(gulp.dest(taskSettings.targetRoot));

			gulp.src(taskSettings.bowerComponents + '/**/*').
				pipe(gulp.dest(taskSettings.targetRoot));

			gulp.src(directivePath + '/template.html').
				pipe(rename({
					dirname: '',
					basename: directiveName
				})).
				pipe(gulp.dest(taskSettings.targetRoot + '/templates'));

			gulp.src(directivePath + '/test-template.html').
				pipe(rename({
					dirname: '',
					basename: 'test'
				})).
				pipe(gulp.dest(taskSettings.targetRoot + '/templates'));

			gulp.src(directivePath + '/test-index.html').
				pipe(rename({
					dirname: '',
					basename: 'index'
				})).
				pipe(gulp.dest(taskSettings.targetRoot));
		} else {
			process.stdout.write('\nError: directive name unspecified\n');
			process.stdout.write('Usage: gulp ' + taskSettings.taskName + ' --{directive-name}\n');
		}
	}
})();
