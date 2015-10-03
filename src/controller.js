(function() {
	'use strict';

	angular.module('module.name').
		controller('ModuleNameController', ModuleNameController);

	function ModuleNameController() {
		var vm = this;
		vm.member = 'default';
		activate();

		function activate() {
		}
	}
})();
