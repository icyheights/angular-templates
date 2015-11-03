/**
 * @desc 
 * Root component of example app
 *
 */
(function() {
	'use strict';

	angular.module('exampleRoot', [
		'exampleColorflip'
	]).directive('exampleRoot', exampleRoot);

	exampleRoot.$inject = ['$rootScope'];

	function exampleRoot($rootScope) {
		return {
			restrict: 'E',
			templateUrl: 'templates/exampleRoot.html',
			link: link,
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
			}
		};

		function link(scope, element, attrs) {
			var vm = scope.vm;
		}

		function Controller() {
			var vm = this;
			vm.colorflipText = 'Enjoy the flip!';
			$rootScope.pageTitle = 'Example app';
		}
	}
})();
