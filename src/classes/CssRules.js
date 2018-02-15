/**
 * @module CssRules
 */

"use strict";
import { Mixin } from "mixwith";

/**
 * Adds a new style rule or modifies an existing rule with new properties and/or values
 * 
 * @this {CssBase}
 * @param  {string} selector The CSS selector for the style rule
 * @param  {string} property The CSS property for the style rule
 * @param  {string} value The value of the CSS property
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const add = function (selector, property, value) {
    const index = this.styles.indexOf(selector);

    if (index > -1) {
        this.rules[index].style.setProperty(property,value);
    } else {
        const i = this.styles.length;
        this.styles.push(selector);
        const str = (!value) ? property : property + ":" + value + ";";
        this.obj.insertRule(`${selector}{${str}}`, i);
    }
    return this;
};

/**
 * Adds new style rules or modifies existing rules via a provided object detailing all the styles to be added/modified
 * 
 * @this {CssBase}
 * @param  {Object.<string, Object.<string, string>>} object An object detailing all the styles to be provided, keys being selectors and sub-keys properties
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const objectAdd = function(object) {
    if (typeof object === "object") {
        for (let selector in object) {
            if (object.hasOwnProperty(selector)) {
                let str = "";
                const index = this.styles.indexOf(selector);
                for (let property in object[selector]) {
                    if (object[selector].hasOwnProperty(property)) {
                        let value = object[selector][property];
                        if (index === -1) {
                            str += property + ":" + value + ";";
                        } else {
                            this.add(selector, property, value);
                        }
                    }
                }
                if (index === -1) this.add(selector,str);
            }
        }
    } else {
        throw new TypeError("Parameter is not an object");
    }
    return this;
};

/**
 * Removes a style rule or a property if the latter is provided
 * 
 * @this {CssBase}
 * @param  {string} selector The CSS selector for the rule
 * @param  {string} [property] The CSS property to be removed
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const remove = function (selector, property) {
    const index = this.styles.indexOf(selector);

    if (index > -1) {
        if (property) {
            this.rules[index].style.removeProperty(property)
        } else {
            this.styles.splice(index, 1);
            this.obj.deleteRule(index)
        }
    }
    return this;
};

/**
 * Removes new style rules or properties via a provided object detailing all the styles to be deleted
 * 
 * @this {CssBase}
 * @param  {Object.<string, Object.<string, any>>} object An object detailing all the styles to be removed, keys being selectors and sub-keys being properties
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const objectRemove = function(object) {
    if (typeof object === "object") {
        for (let selector in object) {
            if (object.hasOwnProperty(selector)) {
                const properties = Object.keys(object[selector]);
                const l = properties.length;
                if (l > 0) {
                    for (let i=0;i<l;i+=1) {
                        this.remove(selector, properties[i]);
                    }
                } else {
                    this.remove(selector);
                }
            }
        }
    } else {
        throw new TypeError("Parameter is not an object");
    }
    return this;
}

/**
 * Removes new style rules or properties via a provided object detailing all the styles to be deleted
 * 
 * @this {CssBase}
 * @param  {Array.<string>} array An Array of CSS Selectors to remove from the stylesheet
 * @chainable
 * @returns {CssBase} Chaining method, returns itself
 */
const arrayRemove = function(array) {
    for (let i = 0, len = array.length; i < len; i++) {
        this.remove(array[i]);
    }
    return this;
}

/**
 * Create a CssRules mixin class.
 *
 * @exports cssrules
 * @param {*} superclass - The class to mix onto.
 * @return {module:cssrules~mixin} The mixin class.
 */
const CssRulesMixin = Mixin(superclass => {

    /**
     * A Mixin for Stylesheet manipulation
     * @mixin
     * @alias module:cssrules~mixin
     */
    class CssRules extends superclass {}

    CssRules.prototype.add = add;
    CssRules.prototype.remove = remove;
    CssRules.prototype.objectAdd = objectAdd;
    CssRules.prototype.objectRemove = objectRemove;
    CssRules.prototype.arrayRemove = arrayRemove;

    return CssRules;
});

export default CssRulesMixin