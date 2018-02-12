"use strict";
import { Mixin } from "mixwith";

const addCss = function (index, selector, property, value) {
    let str = (!value) ? property : property + ":" + value + ";";
    this.obj.insertRule(`${selector}{${str}}`, index);
};

const removeCss = function (index, property) {
    if (property) this.rules[index].style.removeProperty(property);
    else this.obj.deleteRule(index);
};

const modifyCss = function(index, property, value) {
    this.rules[index].style.setProperty(property,value);
};

const add = function (selector, property, value) {
    const index = this.styles.indexOf(selector);

    if (index > -1) {
        this.modifyCss(index, property, value);
    } else {
        const i = this.styles.length;
        this.styles.push(selector);
        this.addCss(i, selector, property, value);
    }

    return this;
};

const objectAdd = function(object) {
    if (typeof object === "object") {

        let selectors = Object.keys(object);

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

                if (index === -1) { this.add(selector,str); }
            }
        }

    } else {
        throw new TypeError("Parameter is not an object");
    }
};

const remove = function (selector, property) {
    const index = this.styles.indexOf(selector);

    if (index > -1) {
        if (property) {
            this.removeCss(index, property);
        } else {
            this.styles.splice(index, 1);
            this.removeCss(index);
        }
    }

    return this;
};

const objectRemove = function(object) {
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
    return this;
}

const arrayRemove = function(array) {
    
    for (let i = 0, len = array.length; i < len; i++) {
        this.remove(array[i]);
    }

    return this;
}

export default Mixin(superclass => class CssRules extends superclass {
    constructor() {
        super(...arguments);
        this.addCss = addCss;
        this.removeCss = removeCss;
        this.modifyCss = modifyCss;

        this.add = add;
        this.remove = remove;
        this.objectAdd = objectAdd;
        this.objectRemove = objectRemove;
        this.arrayRemove = arrayRemove;
    }
})