/**
 * @module CssInline
 */
"use strict";

import { Mixin } from "mixwith";

/**
 * Adds Inline styles to a given HTMLElement
 * 
 * @this {CssBase}
 * @param {HTMLElement} elem The element to be styled
 * @param {string} property The CSS property to be added or modified
 * @param {string} value The value for the CSS property
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const addInline = function (elem, property, value) {
    elem.style.setProperty(property, value);
    return this;
}

/**
 * Adds Inline styles to a given HTMLElement or to all elements in a HTMLCollection
 * 
 * @this {CssBase}
 * @param {(HTMLElement|HTMLCollection)} elems Either an element or a collection of elements to be styled
 * @param {Object.<string, Object.<string, string>>} object An object containing all the styles to be added/modified
 * @chainable
 * @returns {CssBase} Chaining Method, returns itself
 */
const addObjectInline = function (elems, object) {
    if (typeof object === "object") {
        for (let property in object) {
            if (object.hasOwnProperty(property)) {
                if (elems.length) {
                    for (let i = 0; i < elems.length; i++) {
                        this.addInline(elems[i], property, object[property]);
                    }
                } else {
                    this.addInline(elems, property, object[property]);
                }
            }
        }
    } else {
        throw new TypeError("Parameter is not an object");
    }
    return this;
}

/**
 * Removes an Inline style from a given HTMLElement
 * 
 * @this {CssBase}
 * @param {HTMLElement} elem The HTMLElement to have styles removed from
 * @param {string} property The property to remove
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const removeInline = function(elem, property) {
    elem.style.removeProperty(property);
    return this;
};

/**
 * Removes Inline style properities in an array from a given HTMLElement or HTMLCollection
 * 
 * @param {(HTMLElement|HTMLCollection)} elems The HTMLElement or HTMLCollection to have styles removed from
 * @param {Array.<string>} array The properties to remove
 * @chainable
 * @returns {CssBase} Chaining Method, returns itself
 */
const removeArrayInline = function(elems, array) {
    let property = null;
    for (let i = 0, len = array.length; i < len; i++) {
        property = array[i];
        if (elems.length) {
            for (let i = 0; i < elems.length; i++) {
                this.removeInline(elems[i], property);
            }
        } else {
            this.removeInline(elems, property);
        }
    }
    return this;
};

/**
 * Removes Inline style properities in an object from a given HTMLElement or HTMLCollection
 * 
 * @param {(HTMLElement|HTMLCollection)} elems The HTMLElement or HTMLCollection to have styles removed from
 * @param {Object.<string, any>} object The properties to remove
 * @chainable
 * @returns {CssBase} Chaining Method, returns itself
 */
const removeObjectInline = function(elems, object) {
    if (typeof object === "object") {
        this.removeArrayInline(elems, Object.keys(object));
    } else {
        throw new TypeError("Parameter is not an object");
    }
    return this;
};

/**
 * Create a CssInline mixin class.
 *
 * @exports cssinline
 * @param {*} superclass - The class to mix onto.
 * @return {module:cssinline~mixin} The mixin class.
 */
const CssInlineMixin = Mixin(superclass => {

    /**
     * CssInline mixin.
     *
     * @mixin
     * @alias module:cssinline~mixin
     */
    class CssInline extends superclass {}

    CssInline.prototype.addInline = addInline;
    CssInline.prototype.removeInline = removeInline;
    CssInline.prototype.addObjectInline = addObjectInline;
    CssInline.prototype.removeObjectInline = removeObjectInline;
    CssInline.prototype.removeArrayInline = removeArrayInline;

    return CssInline;
})

export default CssInlineMixin