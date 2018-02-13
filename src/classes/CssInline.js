"use strict";

import { Mixin } from "mixwith";

const addInline = function (elem, property, value) {
    elem.style.setProperty(property, value);

    return this;
}

const addObjectInline = function (elems, object) {

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

    return this;
}

const removeInline = function(elem, property) {
    elem.style.removeProperty(property);

    return this;
};

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

const removeObjectInline = function(elems, object) {
    return this.removeArrayInline(elems, Object.keys(object));
};

export default Mixin(superclass => class CssInline extends superclass {
    constructor() {
        super(...arguments);
        this.addInline = addInline;
        this.removeInline = removeInline;
        this.addObjectInline = addObjectInline;
        this.removeObjectInline = removeObjectInline;
        this.removeArrayInline = removeArrayInline;
    }
})