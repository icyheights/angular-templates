(function() {
	'use strict';

	var testModule = angular.module('test', [
		'example'
	]);
	
	testModule.directive('test', test);
	testModule.controller('TestController', TestController);

	function test() {
		return {
			restrict: 'E',
			templateUrl: 'test.html',
			controller: 'TestController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {}
		};
	}

	function TestController() {
		var vm = this;
		vm.testData = {};
		vm.testData.text = 'test data';
	}
})();
