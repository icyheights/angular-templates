(function() {
	'use strict';

	angular.module('test', [
		'__name-pattern__'
	]).directive('test', test);

	test.$inject = [];

	function test() {
		return {
			restrict: 'E',
			templateUrl: 'test.html',
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true,
			scope: {}
		};

		function Controller() {
			var vm = this;
		}
	}
})();
