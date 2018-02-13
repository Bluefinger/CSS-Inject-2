"use strict";

let idCount = 0;

const init = function() {
    let head;

    this.el = document.createElement("style");
    this.el.type = "text/css";
    this.el.id = this.id;
    this.el.media = this.media;
    head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(this.el);

    this.obj = document.styleSheets[document.styleSheets.length - 1];
    this.rules = this.obj.cssRules;
    this.styles = [];
    
    return this;
};

const destroy = function() {
    if (this.el) {
        let head = this.el.parentNode;
        head.removeChild(this.el);
        this.el = null;
    }
    this.id = null;
    this.media = null;
    this.rules = null;
    this.obj = null;
    this.styles = null;
}

export default class CssBase {
    constructor(id = `css-inject-${idCount++}`, media = "screen") {
        this.id = id;
        this.media = media;
        this.rules = null;
        this.el = null;
        this.obj = null;
        this.styles = null;
    }
}

CssBase.prototype.init = init;
CssBase.prototype.destroy = destroy;