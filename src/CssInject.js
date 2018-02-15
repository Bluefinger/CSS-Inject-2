/**
 * @module CssInject
 */
"use strict";

import { mix } from "mixwith";
import CssBase from "./classes/CssBase";
import CssRules from "./classes/CssRules";
import CssInline from "./classes/CssInline";


/**
 * The Inline Only CssInject Class without Stylesheet mixins
 * 
 * @extends CssBase
 * @mixes CssInline
 */
export class InlineOnly extends mix(CssBase).with(CssInline) {}

/**
 * The Styles Only CssInject Class without Inline mixins
 * 
 * @extends CssBase
 * @mixes CssRules
 */
export class StylesOnly extends mix(CssBase).with(CssRules) {

    /**
     * Initialises the state of CssInject and what kind of stylesheet it is.
     * 
     * @param  {string} [id] A unique ID for the style element, else it defaults to 'css-inject-{idCount}', which increments with each new instance 
     * @param  {string} [media] Defaults to "screen", but can be used to modify what sort of stylesheet the instance represents, like a dynamic print stylesheet
     */
    constructor(id, media) {
        super(id, media);
        this.init();
    }
}

/**
 * The Full CssInject Class with both Stylesheet and Inline mixins
 * 
 * @extends CssBase
 * @mixes CssRules
 * @mixes CssInline
 */
export class Full extends mix(CssBase).with(CssRules, CssInline) {

    /**
     * Initialises the state of CssInject and what kind of stylesheet it is.
     * 
     * @param  {string} [id] A unique ID for the style element, else it defaults to 'css-inject-{idCount}', which increments with each new instance 
     * @param  {string} [media] Defaults to "screen", but can be used to modify what sort of stylesheet the instance represents, like a dynamic print stylesheet
     */
    constructor(id, media) {
        super(id, media);
        this.init();
    }
}

/**
 * Factory Function for creating CssInject instances
 * 
 * @param  {object} [opts] Defaults to an empty object if not provided
 * @param  {string} [opts.id] The ID for the stylesheet
 * @param  {string} [opts.media] The media string to define what kind of stylesheet it is
 * @param  {(string|number)} [opts.modifier] A string or number value to specific what features are initialised for the CssInject instance
 * @returns {(Full|InlineOnly|StylesOnly)} returns a mixed CssBase class depending on the modifiers provided
 */
export default function create(opts = {}) {
    const { id, media, modifier } = opts;

    switch (modifier) {
        case "StylesOnly":
        case 1:
            return new StylesOnly(id, media);

        case "InlineOnly":
        case 2:
            return new InlineOnly();

        default: return new Full(id, media);
    }
}