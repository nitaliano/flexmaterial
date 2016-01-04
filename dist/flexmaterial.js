/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// styles
	'use strict';

	__webpack_require__(9);

	// scripts
	__webpack_require__(13);

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flexComponent = __webpack_require__(14);

	function Button(el) {
	    this.el = el;

	    this.onClick = this.onClick.bind(this);
	    this.el.addEventListener('click', this.onClick);
	}

	Button.prototype.onClick = function (e) {
	    console.log(e);
	};

	Button.prototype.destroy = function () {
	    this.el.removeEventListener('click', this.onClick);
	};

	flexComponent.register({
	    className: 'btn',
	    Constructor: Button
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	function FlexComponent() {
	    this.onMutation = this.onMutation.bind(this);
	    this.onDomReady = this.onDomReady.bind(this);

	    this._components = {};
	    this._componentClassNames = [];

	    this._observer = new MutationObserver(this.onMutation);
	    this._observer.observe(document.body, { childList: true, attributes: true, characterData: true });

	    document.addEventListener('DOMContentLoaded', this.onDomReady);
	}

	FlexComponent.prototype.onDomReady = function (e) {
	    var self = this;

	    this._componentClassNames.forEach(function (componentClassName) {
	        var nodes = document.querySelectorAll('.' + componentClassName);

	        for (var i = 0; i < nodes.length; i++) {
	            self.addComponent(nodes[i], self._components[componentClassName].Constructor);
	        }
	    });
	};

	FlexComponent.prototype.onMutation = function (mutations) {
	    var self = this;

	    mutations.forEach(function (mutation) {
	        var i;

	        for (i = 0; i < mutation.addedNodes.length; i++) {
	            self.onAddedNode(mutation.addedNodes[i]);
	        }

	        for (i = 0; i < mutation.removedNodes.length; i++) {
	            self.onRemovedNode(mutation.removedNodes[i]);
	        }
	    });
	};

	FlexComponent.prototype.onAddedNode = function (node) {
	    var self = this;

	    this._componentClassNames.forEach(function (componentClassName) {
	        if (node.nodeType === 1 && node.classList.contains(componentClassName)) {
	            self.addComponent(node, self._components[componentClassName]);
	        }

	        for (var i = 0; i < node.childNodes.length; i++) {
	            self.onAddedNode(node.childNodes[i]);
	        }
	    });
	};

	FlexComponent.prototype.onRemovedNode = function (node) {
	    this.removeComponent(node);

	    for (var i = 0; i < node.childNodes.length; i++) {
	        this.onRemovedNode(node.childNodes[i]);
	    }
	};

	FlexComponent.prototype.register = function (component) {
	    this._components[component.className] = component.Constructor;
	    this._componentClassNames.push(component.className);
	};

	FlexComponent.prototype.addComponent = function (node, Component) {
	    if (this.isComponent(node)) {
	        return;
	    }
	    node.__flexcomponent__ = new Component(node);
	};

	FlexComponent.prototype.removeComponent = function (node) {
	    if (!this.isComponent(node)) {
	        return;
	    }

	    if (node.__flexcomponent__.destroy) {
	        node.__flexcomponent__.destroy();
	    }

	    delete node.__flexcomponent__;
	};

	FlexComponent.prototype.isComponent = function (node) {
	    return node.__flexcomponent__;
	};

	module.exports = new FlexComponent();

/***/ }
/******/ ]);