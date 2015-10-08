(function() {
	'use strict';

	angular.module('module.name')
		.factory('moduleName', moduleNameFactory);
	
	moduleNameFactory.$inject = [];

	function moduleNameFactory() {
		var init = runFactory();
		return {
			SOME_CONSTANT: init.SOME_CONSTANT,
			makeSomeClass: init.makeSomeClass,
			doSomething: doSomething
		};

		function doSomething() {
		}

		function runFactory() {
			var SOME_CONSTANT = '';

			function SomeClass() {
			}

			SomeClass.prototype.method = function() {
			};

			function makeSomeClass() {
				return new SomeClass();
			}

			return {
				SOME_CONSTANT: SOME_CONSTANT,
				makeSomeClass: makeSomeClass
			}
		}
	}
})();
