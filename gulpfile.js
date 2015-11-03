"use strict";

//required node modules

var gulp = require('gulp');
var replace = require('gulp-replace');
var ignore = require('gulp-ignore');
var del = require('del');
var argv = require('yargs').argv;

//Global configuration constants

var TEMPLATES = './src/templates/';
var APPLICATION_STRUCTURE = './src/application-structure/'
var TARGET = './target/';

//Tasks

var tasks = [
	{name: 'clean', deps: [], runner: clean},
	{name: 'directive', deps: ['clean'], runner: directive},
	{name: 'service', deps: ['clean'], runner: service},
	{name: 'filter', deps: ['clean'], runner: filter},
	{name: 'app', deps: ['clean'], runner: app}
];

tasks.forEach(makeTask);

gulp.task('default', function() {
	console.log('Available tasks:');
	tasks.forEach(printTask);
});

//Task functions

function makeTask(task) {
	gulp.task(task.name, task.deps, task.runner);
}

function printTask(task) {
	console.log('\t' + task.name);
}

function clean() {
	return del(TARGET + '**/*');
}

function directive() {
	checkNameAnd(buildDirective);
}

function service() {
	checkNameAnd(buildService);
}

function filter() {
	checkNameAnd(buildFilter);
}

function app() {
	copyAppStructure();
	copyLibJSON();
	copyGitignore();
}

//Auxiliary functions

function checkNameAnd(action) {
	if (!argv.n) {
		console.log('\nname parameter not specified. Aborting...\n');
		return;
	}
	if (!/^[a-zA-Z]+$/.test(argv.n)) {
		console.log('\nname must be lowerCamelCase. Aborting...\n');
		return;
	}
	action();
}

function toDashDelimitedName(lowerCamelCaseName) {
	return lowerCamelCaseName.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function buildTemplate(src, target) {
	gulp.src(TEMPLATES + src)
		.pipe(replace(/__namePattern__/g, argv.n))
		.pipe(replace(/__name-pattern__/g, toDashDelimitedName(argv.n)))
		.pipe(gulp.dest(TARGET + argv.n + '/' + (target || '')));
}

function buildDirective() {
	buildTemplate('directive.js');
	buildTemplate('template.html');
	buildTemplate('style.css');
	buildTemplate('test*', 'test');
}

function buildFilter() {
	buildTemplate('filter.js');
}

function buildService() {
	buildTemplate('service.js');
}

function copyAppStructure() {
	gulp.src(APPLICATION_STRUCTURE + '**/*')
		.pipe(ignore.exclude('lib.json'))
		.pipe(gulp.dest(TARGET));
}

function copyLibJSON() {
	gulp.src(APPLICATION_STRUCTURE + 'lib.json')
		.pipe(gulp.dest(TARGET + 'src/test'))
		.pipe(gulp.dest(TARGET + 'src/apps/example-root'));
}

function copyGitignore() {
	gulp.src(APPLICATION_STRUCTURE + '.gitignore')
		.pipe(gulp.dest(TARGET));
}
