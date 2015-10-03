(function() {
	'use strict';

	angular.module('module.name').
		filter('moduleName', moduleName);
	
	function moduleName() {
		return function(input) {
		}
	}
})();
