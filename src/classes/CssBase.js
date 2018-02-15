"use strict";

let idCount = 0;

/**
 * Initialises a <style></style> element in the document head and syncs the CSSStylesheet object to CssInject
 * 
 * @this {CssBase}
 * @return {CssBase} returns itself, chaining method
 */
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

/**
 * Removes its <style> element from the document head and destroys itself
 * 
 * @this {CssBase}
 * @return {void}
 */
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

/** The Base CssInject Class, representing a style instance to be modified and controlled by CssInject */
export default class CssBase {

    /**
     * Initialises the state of CssInject and what kind of stylesheet it is.
     * 
     * @param  {string} [id] A unique ID for the style element, else it defaults to 'css-inject-{idCount}', which increments with each new instance 
     * @param  {string} [media] Defaults to "screen", but can be used to modify what sort of stylesheet the instance represents, like a dynamic print stylesheet
     */
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