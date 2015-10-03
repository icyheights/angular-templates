//Load gulp modules

var gulp = require('gulp');
var del = require('del');

//Task configuration

var tasks = [
	{name: 'directive', runner: buildDirective},
	{name: 'service', runner: buildService},
	{name: 'filter', runner: buildFilter},
];

//Define base config

var src = 'src';
var target = 'target';

//Define tasks

gulp.task('clean', function() {
	return del(target + '/**/*');
});

tasks.forEach(makeTask);

gulp.task('default', function() {
	process.stdout.write('\nAvailable gulps:\n');
	tasks.forEach(printTask);
	process.stdout.write('\n');
});

//Auxiliary functions

function makeTask(task) {
	gulp.task(task.name, ['clean'], task.runner);
}

function printTask(task) {
	process.stdout.write('\t' + task.name + '\n');
}

function buildDirective() {
	copyModule();
	copyDirective();
	copyController();
	copyTemplate();
	copyCSS();
	copyTest();
}

function buildService() {
	copyModule();
	copyService();
}

function buildFilter() {
	copyModule();
	copyFilter();
}

function copyDirective() {
	gulp.src(src + '/directive.js').
		pipe(gulp.dest(target));
}

function copyCSS() {
	gulp.src(src + '/style.css').
		pipe(gulp.dest(target));
}

function copyController() {
	gulp.src(src + '/controller.js').
		pipe(gulp.dest(target));
}

function copyModule() {
	gulp.src(src + '/module.js').
		pipe(gulp.dest(target));
}

function copyFilter() {
	gulp.src(src + '/filter.js').
		pipe(gulp.dest(target));
}

function copyService() {
	gulp.src(src + '/service.js').
		pipe(gulp.dest(target));
}

function copyTemplate() {
	gulp.src(src + '/template.html').
		pipe(gulp.dest(target));
}

function copyTest() {
	gulp.src(src + '/test*').
		pipe(gulp.dest(target));
}

