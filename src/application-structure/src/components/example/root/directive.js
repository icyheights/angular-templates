(function() {
	'use strict';

	angular.module('example.root')
		.directive('exampleRoot', exampleRoot);

	function exampleRoot() {
		return {
			restrict: 'E',
			templateUrl: 'templates/example-root.html',
			controller: 'ExampleRootController',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				input: '='
			}
		};
	}
})();
