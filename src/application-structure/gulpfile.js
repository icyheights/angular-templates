"use strict";

//Required node modules

var gulp = require('gulp');
var del = require('del');
var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify'); 
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

//Global configuration constants

var TARGET = './target/';

//Tasks

var tasks = [
	{name: 'clean', deps: [], runner: clean},
	{name: 'test', deps: ['clean'], runner: test},
	{name: 'example', deps: ['clean'], runner: test},
];

tasks.forEach(function(task) {
	gulp.task(task.name, task.deps, task.runner);
});

gulp.task('default', function() {
	process.stdout.write('\nAvailable tasks:\n');
	tasks.forEach(function(task) {
		process.stdout.write('\t' + task.name + '\n');
	});
	process.stdout.write('\n');
});

//Task functions

function clean() {
	return del(TARGET + '**/*');
}

function test() {
	var moduleName = argv.n;
	if (!moduleName) {
		process.stdout.write('\nIncorrect invocation.\n');
		process.stdout.write('Usage: gulp test -n module.name\n\n');
		return;
	}

	buildDirective(moduleName);
	copyResources();
	copyLibs(require('./src/test/lib.json'));
	copyTestDirective(moduleName);
	copyTestIndex();
}

//Auxiliary functions

function buildDirective(moduleName) {
	var moduleNames = getAllModuleNames(moduleName);
	
	buildJS(moduleNames);
	buildCSS(moduleNames);
	buildTemplates(moduleNames);
}

function getModulePath(moduleName) {
	return './src/components/' + moduleName.replace(/\./g, '/') + '/';
}

function getAllModuleNames(moduleName) {
	var directDependencies = require(getModulePath(moduleName) + 'dependencies.json');
	return Array.prototype.concat.apply([moduleName], directDependencies.map(getAllModuleNames));
}

function glob(moduleName, pattern) {
	return getModulePath(moduleName) + pattern;
}

function buildJS(moduleNames) {
	var stream = gulp.src(moduleNames.map(jsGlob))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(angularFilesort())
		.pipe(concat('script.js'));
	
	if (!argv.dev) {
		stream = stream.pipe(uglify());
	}

	stream.pipe(gulp.dest(TARGET));

	function jsGlob(moduleName) {
		return glob(moduleName, '*.js');
	}
}

function buildCSS(moduleNames) {
	gulp.src(moduleNames.map(cssGlob))
		.pipe(concat('style.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(TARGET));

	function cssGlob(moduleName) {
		return glob(moduleName, 'style.css');
	}
}

function buildTemplates(moduleNames) {
	moduleNames.forEach(buildTemplate);

	function buildTemplate(moduleName) {
		gulp.src(glob(moduleName, 'template.html'))
			.pipe(rename({
				dirname: 'templates',
				basename: templateName(moduleName) 
			}))
			.pipe(gulp.dest(TARGET));

		function templateName(moduleName) {
			return moduleName.replace(/\./g, '-');
		}
	}
}

function copyResources() {
	gulp.src('./resources/**/*')
		.pipe(gulp.dest(TARGET));
}

function copyLibs(libConfig) {
	libConfig.map(copyLib);

	function copyLib(libConfigEntry) {
		var source = argv.dev ? libConfigEntry.source.development : libConfigEntry.source.production;
		gulp.src(source)
			.pipe(rename({
				dirname: 'lib',
				basename: libConfigEntry.targetName
			}))
			.pipe(gulp.dest(TARGET));
	}
}

function getBuildVersion() {
	return argv.dev ? 'Development' : 'Production';
}

function copyTestDirective(moduleName) {
	gulp.src(getModulePath(moduleName) + '_test/*')
		.pipe(gulp.dest(TARGET));
}

function copyTestIndex() {
	gulp.src('./src/test/index.html')
		.pipe(gulp.dest(TARGET));
}
