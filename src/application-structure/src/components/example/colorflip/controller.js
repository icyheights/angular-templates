(function() {
	'use strict';

	angular.module('example.colorflip')
		.controller('ExampleColorflipController', ExampleColorflipController);

	function ExampleColorflipController() {
		var vm = this;
		vm.flip = false;
		vm.flipColor = flipColor;
		activate();

		function activate() {
			if (typeof vm.input === "undefined") {
				throw new Error("Input not provided");
			}
		}

		function flipColor() {
			vm.flip = !vm.flip;
		}
	}
})();
