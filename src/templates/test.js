(function() {
	'use strict';

	var testModule = angular.module('test', [
		'module.name'
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
		vm.testInput = {};
		vm.testInput.text = 'test';
	}
})();
