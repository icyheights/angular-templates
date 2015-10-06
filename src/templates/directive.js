(function() {
	'use strict';

	angular.module('module.name')
		.directive('moduleName', moduleName);

	function moduleName() {
		return {
			restrict: 'E',
			templateUrl: 'templates/module-name.html',
			controller: 'ModuleNameController',
			controllerAs: 'vm',
			bindToController: true,
			link: link,
			scope: {
				input: '='
			}
		};

		function link(scope, element, attrs) {
		}
	}
})();
