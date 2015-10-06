(function() {
	'use strict';

	angular.module('example.colorflip')
		.directive('exampleColorflip', exampleColorflip);

	function exampleColorflip() {
		return {
			restrict: 'E',
			templateUrl: 'templates/example-colorflip.html',
			controller: 'ExampleColorflipController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				input: '='
			}
		};
	}
})();
