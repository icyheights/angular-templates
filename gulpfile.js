"use strict";

//required node modules

var gulp = require('gulp');
var replace = require('gulp-replace');
var del = require('del');
var argv = require('yargs').argv;
var rename = require('gulp-rename');

//Global configuration constants

var SRC = './src/';
var TARGET = './target/';

//Tasks

var tasks = [
	{name: 'clean', deps: [], runner: clean},
	{name: 'directive', deps: ['clean'], runner: directive},
	{name: 'service', deps: ['clean'], runner: service},
	{name: 'filter', deps: ['clean'], runner: filter}
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

//Auxiliary functions

function checkNameAnd(action) {
	if (!argv.n) {
		console.log('\nname parameter not specified. Aborting...\n');
		return;
	}
	if (!/^[a-z]+(?:-[a-z]+)+$/.test(argv.n)) {
		console.log('\nname must be dash-delimited-name. Aborting...\n');
		return;
	}
	action();
}

function toLowerCamelCase(dashDelimitedName) {
	return dashDelimitedName.split('-').map(function(word, index) {
    if (index > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  }).join('');
}

function buildTemplate(glob, target) {
	gulp.src(SRC + glob)
		.pipe(replace(/__namePattern__/g, toLowerCamelCase(argv.n)))
		.pipe(replace(/__name-pattern__/g, argv.n))
		.pipe(rename(function(path) {
			switch (path.basename) {
				case 'directive':
				case 'service':
				case 'filter':
					path.basename = 'script'
			}
		}))
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
