(function() {
	'use strict';

	angular.module('example.root')
		.controller('ExampleRootController', ExampleRootController);

	ExampleRootController.$inject = ['$rootScope'];

	function ExampleRootController($rootScope) {
		var vm = this;
		vm.colorflip = {};
		activate();

		function activate() {
			$rootScope.pageTitle = 'Example app';
			vm.colorflip.text = 'Enjoy the flip!';
		}
	}
})();
