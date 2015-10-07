(function() {
	'use strict';

	var testModule = angular.module('test', [
		'example.root'
	]);
	
	testModule.directive('test', test);

	function test() {
		return {
			restrict: 'E',
			templateUrl: 'test.html'
		};
	}
})();
