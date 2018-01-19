/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(selector) {
  if (typeof selector === "string") {
    let elementList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(elementList));
  }
  else if(selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

 class DOMNodeCollection {
  constructor(elementList){
    this.elementList = elementList; // everything in here is an HTMLElement
  }
}


DOMNodeCollection.prototype.html = function(string){
  if (string) {
    this.elementList.forEach( el => (el.innerHTML = string) );
    return this.elementList;
  } else {
    return this.elementList[0].innerHTML;
  }
};




DOMNodeCollection.prototype.empty = function() {

    this.elementList.forEach(el => {
      let children = Array.from(el.childNodes);
      children.forEach( child => child.remove() );
    });

  return this.elementList;
};


DOMNodeCollection.prototype.append = function(arg) {

  if(arg instanceof HTMLElement){
    this.elementList.forEach(el => {
      el.innerHTML = el.innerHTML + arg.outerHTML;
    });
  } else if (typeof arg === "string") {
    this.elementList.forEach(el => {
      el.innerHTML = el.innerHTML + arg;
    });
  } else if (arg instanceof DOMNodeCollection) {
    this.elementList.forEach(el => {
      arg.elementList.forEach(el2 => {
        el.innerHTML = el.innerHTML + el2.innerHTML;
      });
    });
  }
};

DOMNodeCollection.prototype.attr = function(attribute){
  return this.elementList[0].getAttribute(attribute);
};


DOMNodeCollection.prototype.addClass = function(className){

  this.elementList.forEach(el => {
    let previousClasses = el.getAttribute("class");
    el.setAttribute('class', previousClasses + " " + className);

  });
  return this.elementList;
};

DOMNodeCollection.prototype.removeClass = function(className){

  this.elementList.forEach(el => {
    let previousClasses = el.getAttribute("class").split(" ");
    let currentClasses = previousClasses.filter(name => {
      return name !== className;
   }).join(" ");

   el.setAttribute('class', currentClasses);

  });
  return this.elementList;
};

DOMNodeCollection.prototype.children = function() {

  const result = [];
  this.elementList.forEach(parent => {

    parent.childNodes.forEach( child => {

      result.push(child);

    });


  });
  return new DOMNodeCollection(result);

};
DOMNodeCollection.prototype.parent = function() {

  const result = [];
  this.elementList.forEach(child => {
  result.push(child.parentNode);
});

  return new DOMNodeCollection(result);

};

DOMNodeCollection.prototype.find = function(selector){
let findResults =  this.children().elementList.filter(el => {
    return Array.from(document.querySelectorAll(selector)).includes(el);
  });
  return new DOMNodeCollection(findResults);
};






module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map