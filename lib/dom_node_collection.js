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
