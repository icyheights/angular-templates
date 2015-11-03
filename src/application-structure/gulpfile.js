"use strict";

//Required node modules

var gulp = require('gulp');
var fs = require('fs');
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
	{name: 'app', deps: ['clean'], runner: app},
];

tasks.forEach(function(task) {
	gulp.task(task.name, task.deps, task.runner);
});

gulp.task('default', function() {
	console.log('\nAvailable tasks:');
	tasks.forEach(function(task) {
		console.log('\t' + task.name);
	});
	console.log('');
});

//Task functions

function clean() {
	return del(TARGET + '**/*');
}

function test() {
	var moduleName = argv.n;
	if (!moduleName) {
		console.log('\nIncorrect invocation.');
		console.log('Usage: gulp test -n moduleName\n');
		return;
	}

	var testDependencies = getDirectDependencies(getModulePath(moduleName) + 'test/test.js');
	var allModules = Array.prototype.concat.apply([], testDependencies.map(getModuleAndDependencies));

	buildModules(allModules);
	copyResources();
	copyLibs(require('./src/test/lib.json'));
	copyTestDirective(moduleName);
	copyTestIndex();
}

function app() {
	var appName = argv.n;
	if (!appName) {
		console.log('\nIncorrect invocation.');
		console.log('Usage: gulp app -n appName\n');
		return;
	}

	var moduleName = appName.replace(/-/g, '.');

	var allModules = getModuleAndDependencies(moduleName);
	buildModules(allModules);
	copyResources();
	copyLibs(require('./src/apps/' + appName + '/lib.json'));
	copyAppIndex(appName);
}

//Auxiliary functions

function buildModules(moduleNames) {
	buildJS(moduleNames);
	buildCSS(moduleNames);
	buildTemplates(moduleNames);
}

function getModulePath(moduleName) {
	return './src/components/' + moduleName + '/';
}

function getDirectDependencies(file) {
	var moduleDefinitionRegExp = /angular\.module\(.*(\[[\s\S]*?\])/;
	return eval(fs.readFileSync(file, 'utf-8').match(moduleDefinitionRegExp)[1]);
}

function getModuleAndDependencies(moduleName) {
	return Array.prototype.concat.apply([moduleName], getDirectDependencies(getModulePath(moduleName) + 'script.js').map(getModuleAndDependencies));
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
				dirname: '',
				basename: libConfigEntry.targetBaseName
			}))
			.pipe(gulp.dest(TARGET));
	}
}

function getBuildVersion() {
	return argv.dev ? 'Development' : 'Production';
}

function copyTestDirective(moduleName) {
	gulp.src(getModulePath(moduleName) + 'test/*')
		.pipe(gulp.dest(TARGET));
}

function copyTestIndex() {
	gulp.src('./src/test/index.html')
		.pipe(gulp.dest(TARGET));
}

function copyAppIndex(appName) {
	gulp.src('./src/apps/' + appName + '/index.html')
		.pipe(gulp.dest(TARGET));
}
