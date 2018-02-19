"use strict";

let idCount = 0;

/**
 * @typedef {Object.<string, Object.<string, string>>} CssRulesObject
 */

/** 
 * @typedef {Object} CssRuleProperties
 * @property {HTMLElement} el
 * @property {string} id
 * @property {string} media
 * @property {CSSStyleSheet} obj
 * @property {CSSRuleList} rules
 * @property {Array.<string>} styles
 */

/**
 * @typedef {WeakMap.<CssRules, CssRuleProperties>} Protected
 */

 /**
  * Protected Properties for CssRules
  * @type {Protected}
  */
const PROTECTED = new WeakMap();

/**
 * Fetch the CssRule private property
 * 
 * @param {CssRules} instance The CssRules instance to fetch private properties from
 * @param {string} property The property to return
 * @returns {CssRuleProperties.<*>} Returns the property value
 */
const fetchProperty = function(instance, property) {
    const prop = PROTECTED.get(instance);

    return (prop) ? prop[property] : undefined;
}

/**
 * Removes its <style> element from the document head and destroys itself
 * 
 * @this {CssRules}
 * @return {void}
 */
const destroy = function() {
    if (PROTECTED.has(this)) {
        const el = fetchProperty(this, "el");

        const head = el.parentNode;
        head.removeChild(el);

        PROTECTED.delete(this);
    }
}

/**
 * Adds a new style rule or modifies an existing rule with new properties and/or values
 * 
 * @this {CssRules}
 * @param  {string} selector The CSS selector for the style rule
 * @param  {string} property The CSS property for the style rule
 * @param  {string} value The value of the CSS property
 * @chainable
 * @returns {CssRules} Chaining method, returns itself
 */
const add = function (selector, property, value) {
    const props = PROTECTED.get(this);
    const index = props.styles.indexOf(selector);

    if (index > -1) {
        props.rules[index].style.setProperty(property,value);
    } else {
        const i = props.styles.length;
        props.styles.push(selector);
        const str = (!value) ? property : property + ":" + value + ";";
        props.obj.insertRule(`${selector}{${str}}`, i);
    }
    return this;
};

/**
 * Adds new style rules or modifies existing rules via a provided object detailing all the styles to be added/modified
 * 
 * @this {CssRules}
 * @param  {CssRulesObject} object An object detailing all the styles to be provided, keys being selectors and sub-keys properties
 * @chainable
 * @returns {CssRules} Chaining method, returns itself
 */
const objectAdd = function(object) {
    if (typeof object === "object") {
        const styles = fetchProperty(this, "styles");
        for (let selector in object) {
            if (object.hasOwnProperty(selector)) {
                let str = "";
                const index = styles.indexOf(selector);
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
 * @this {CssRules}
 * @param  {string} selector The CSS selector for the rule
 * @param  {string} [property] The CSS property to be removed
 * @chainable
 * @returns {CssRules} Chaining method, returns itself
 */
const remove = function (selector, property) {
    const { styles, rules, obj } = PROTECTED.get(this);
    const index = styles.indexOf(selector);

    if (index > -1) {
        if (property) {
            rules[index].style.removeProperty(property)
        } else {
            styles.splice(index, 1);
            obj.deleteRule(index);
        }
    }
    return this;
};

/**
 * Removes new style rules or properties via a provided object detailing all the styles to be deleted
 * 
 * @this {CssRules}
 * @param  {CssRulesObject} object An object detailing all the styles to be removed, keys being selectors and sub-keys being properties
 * @chainable
 * @returns {CssRules} Chaining method, returns itself
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
 * @this {CssRules}
 * @param  {Array.<string>} array An Array of CSS Selectors to remove from the stylesheet
 * @chainable
 * @returns {CssRules} Chaining method, returns itself
 */
const arrayRemove = function(array) {
    for (let i = 0, len = array.length; i < len; i++) {
        this.remove(array[i]);
    }
    return this;
}

/** The CssRules Class, representing a style instance to be modified and controlled by CssInject */
export default class CssRules {

    /**
     * Initialises the state of CssRules and what kind of stylesheet it is.
     * 
     * @param  {string} [id] A unique ID for the style element, else it defaults to 'css-inject-{idCount}', which increments with each new instance 
     * @param  {string} [media] Defaults to "screen", but can be used to modify what sort of stylesheet the instance represents, like a dynamic print stylesheet
     */
    constructor(id = `css-inject-${idCount++}`, media = "screen") {
        if (!PROTECTED.has(this)) {
            const el = document.createElement("style");
            el.type = "text/css";
            el.id = id;
            el.media = media;
            const head = document.head || document.getElementsByTagName('head')[0];
            head.appendChild(el);
    
            const obj = document.styleSheets[document.styleSheets.length - 1];
            const rules = obj.cssRules;
            const styles = [];
    
            PROTECTED.set(this, {
                el,
                id,
                media,
                obj,
                rules,
                styles
            });
        }
    }

    /**
     * @returns {string} id
     */
    get id() {
        return fetchProperty(this, "id");
    }

    /**
     * @returns {string} media
     */
    get media() {
        return fetchProperty(this, "media");
    }

    /**
     * @returns {Array.<string>} styles
     */
    get styles() {
        const styles = fetchProperty(this, "styles");
        return (styles) ? styles.slice() : styles;
    }

    /**
     * @returns {CSSRuleList} rules
     */
    get rules() {
        return fetchProperty(this, "rules");
    }
}

CssRules.prototype.destroy = destroy;
CssRules.prototype.add = add;
CssRules.prototype.remove = remove;
CssRules.prototype.objectAdd = objectAdd;
CssRules.prototype.objectRemove = objectRemove;
CssRules.prototype.arrayRemove = arrayRemove;