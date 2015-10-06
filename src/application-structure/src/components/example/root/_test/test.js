(function() {
	'use strict';

	var testModule = angular.module('test', [
		'example.root'
	]);
	
	testModule.directive('test', test);
	testModule.controller('TestController', TestController);

	function test() {
		return {
			restrict: 'E',
			templateUrl: 'test.html'
		};
	}
})();
