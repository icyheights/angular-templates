/**
 * @desc 
 * Directive description
 *
 * @arg {type} bind -  isolate scope binding description
 */
(function() {
	'use strict';

	angular.module('__namePattern__', [
	]).directive('__namePattern__', __namePattern__);

	__namePattern__.$inject = [];

	function __namePattern__() {
		return {
			restrict: 'E',
			templateUrl: 'templates/__namePattern__.html',
			link: link,
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				bind: '='
			}
		};

		function link(scope, element, attrs) {
			var vm = scope.vm;
		}

		function Controller() {
			var vm = this;
		}
	}
})();
