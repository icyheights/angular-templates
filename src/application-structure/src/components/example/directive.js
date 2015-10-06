(function() {
	'use strict';

	angular.module('example')
		.directive('example', example);

	function example() {
		return {
			restrict: 'E',
			templateUrl: 'templates/example.html',
			controller: 'ExampleController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				input: '='
			}
		};
	}
})();
