/**
 * @module CssInject
 */
"use strict";

import CssRules from "./classes/CssRules";
import CssInline from "./classes/CssInline";

/**
 * Factory Function for creating CssInject instances
 * 
 * @function
 * @param  {object} [opts] Defaults to an empty object if not provided
 * @param  {string} [opts.id] The ID for the stylesheet
 * @param  {string} [opts.media] The media string to define what kind of stylesheet it is
 * @returns {CssRules} returns a mixed CssBase class depending on the modifiers provided
 */
const create = function (opts = {}) {
    const { id, media } = opts;

    return new CssRules(id, media);
}

export {
    CssInline,
    CssRules,
    create as default
}