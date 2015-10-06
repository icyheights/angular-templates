"use strict";

//required node modules

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var del = require('del');

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
	process.stdout.write('\nAvailable tasks:\n');
	tasks.forEach(printTask);
	process.stdout.write('\n');
});

//Task functions

function makeTask(task) {
	gulp.task(task.name, task.deps, task.runner);
}

function printTask(task) {
	process.stdout.write('\t' + task.name + '\n');
}

function clean() {
	return del(TARGET + '**/*');
}

function directive() {
	copyModule();
	copyDependencies();
	copyDirective();
	copyController();
	copyTemplate();
	copyCSS();
	copyTest();
}

function service() {
	copyModule();
	copyService();
}

function filter() {
	copyModule();
	copyFilter();
}

function app() {
	copyAppStructure();
	copyLibJSON();
}

//Auxiliary functions

function copyDirective() {
	gulp.src(TEMPLATES + 'directive.js')
		.pipe(gulp.dest(TARGET));
}

function copyDependencies() {
	gulp.src(TEMPLATES + 'dependencies.json')
		.pipe(gulp.dest(TARGET));
}

function copyCSS() {
	gulp.src(TEMPLATES + 'style.css')
		.pipe(gulp.dest(TARGET));
}

function copyController() {
	gulp.src(TEMPLATES + 'controller.js')
		.pipe(gulp.dest(TARGET));
}

function copyModule() {
	gulp.src(TEMPLATES + 'module.js')
		.pipe(gulp.dest(TARGET));
}

function copyFilter() {
	gulp.src(TEMPLATES + 'filter.js')
		.pipe(gulp.dest(TARGET));
}

function copyService() {
	gulp.src(TEMPLATES + 'service.js')
		.pipe(gulp.dest(TARGET));
}

function copyTemplate() {
	gulp.src(TEMPLATES + 'template.html')
		.pipe(gulp.dest(TARGET));
}

function copyTest() {
	gulp.src(TEMPLATES + 'test*')
		.pipe(gulp.dest(TARGET + '_test'));
}

function copyAppStructure() {
	gulp.src(APPLICATION_STRUCTURE + '**/*')
		.pipe(ignore.exclude('lib.json'))
		.pipe(gulp.dest(TARGET));
}

function copyLibJSON() {
	gulp.src(APPLICATION_STRUCTURE + 'lib.json')
		.pipe(gulp.dest(TARGET + 'src/test'))
		.pipe(gulp.dest(TARGET + 'src/apps/example'));
}
