(function() {
	'use strict';

	angular.module('example')
		.controller('ExampleController', ExampleController);

	ExampleController.$inject = ['$rootScope'];

	function ExampleController($rootScope) {
		var vm = this;
		activate();

		function activate() {
			$rootScope.title = 'Example app';

			if (typeof vm.input === 'undefined') {
				throw new Error('input undefined');
			}
		}
	}
})();
