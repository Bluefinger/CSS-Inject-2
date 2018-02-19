"use strict";

/**
 * Adds Inline styles to a given HTMLElement
 * 
 * @this {CssInline}
 * @param {HTMLElement} elem The element to be styled
 * @param {string} property The CSS property to be added or modified
 * @param {string} value The value for the CSS property
 * @chainable
 * @returns {CssInline} Chaining method, returns itself
 */
const addInline = function (elem, property, value) {
    elem.style.setProperty(property, value);
    return this;
}

/**
 * Adds Inline styles to a given HTMLElement or to all elements in a HTMLCollection
 * 
 * @this {CssInline}
 * @param {(HTMLElement|HTMLCollection)} elems Either an element or a collection of elements to be styled
 * @param {Object.<string, Object.<string, string>>} object An object containing all the styles to be added/modified
 * @chainable
 * @returns {CssInline} Chaining Method, returns itself
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
 * @this {CssInline}
 * @param {HTMLElement} elem The HTMLElement to have styles removed from
 * @param {string} property The property to remove
 * @chainable
 * @returns {CssInline} Chaining method, returns itself
 */
const removeInline = function(elem, property) {
    elem.style.removeProperty(property);
    return this;
};

/**
 * Removes Inline style properities in an array from a given HTMLElement or HTMLCollection
 * 
 * @this {CssInline}
 * @param {(HTMLElement|HTMLCollection)} elems The HTMLElement or HTMLCollection to have styles removed from
 * @param {Array.<string>} array The properties to remove
 * @chainable
 * @returns {CssInline} Chaining Method, returns itself
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
 * @this {CssInline}
 * @param {(HTMLElement|HTMLCollection)} elems The HTMLElement or HTMLCollection to have styles removed from
 * @param {Object.<string, any>} object The properties to remove
 * @chainable
 * @returns {CssInline} Chaining Method, returns itself
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
 * Packaged methods for manipulating inline styles
 * 
 * @namespace
 * @typedef {Object} CssInline
 * @type {object} CssInline
 */
const CssInline = {

    /** 
     * @memberof CssInline
     * @function addInline
     */
    addInline,

    /** 
     * @memberof CssInline
     * @function addObjectInline
     */
    addObjectInline,

    /** 
     * @memberof CssInline
     * @function removeArrayInline
     */
    removeArrayInline,

    /** 
     * @memberof CssInline
     * @function removeInline
     */
    removeInline,

    /** 
     * @memberof CssInline
     * @function removeObjectInline
     */
    removeObjectInline
}

export default CssInline