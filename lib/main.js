const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(selector) {
  if (typeof selector === "string") {
    let elementList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(elementList));
  }
  else if(selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
};
