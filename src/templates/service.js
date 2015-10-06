(function() {
	'use strict';

	angular.module('module.name')
		.factory('moduleName', moduleNameFactory);
	
	moduleNameFactory.$inject = [];

	function moduleNameFactory() {
		var init = initClasses();
		return {
			makeSomeClass: init.makeSomeClass
			doSomething: doSomething
		};

		function doSomething() {
		}

		function initClasses() {
			function SomeClass() {
			}

			SomeClass.prototype.method = function() {
			};

			function makeSomeClass() {
				return new SomeClass();
			}

			return {
				makeSomeClass: makeSomeClass
			}
		}
	}
})();
