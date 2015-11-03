(function() {
	'use strict';

	angular.module('test', [
		'exampleRoot'
	]).directive('test', test);

	function test() {
		return {
			restrict: 'E',
			templateUrl: 'test.html',
		};
	}
})();
