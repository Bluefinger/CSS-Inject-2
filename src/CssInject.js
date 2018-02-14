/**
 * @module CssInject
 */
"use strict";

import { mix } from "mixwith";
import CssBase from "./classes/CssBase";
import CssRules from "./classes/CssRules";
import CssInline from "./classes/CssInline";

/**
 * @mixes CssInline
 */
class InlineOnly extends mix(CssBase).with(CssInline) {}

/**
 * @mixes CssRules
 */
class StylesOnly extends mix(CssBase).with(CssRules) {}

/**
 * @mixes CssRules
 * @mixes CssInline
 */
class Full extends mix(CssBase).with(CssRules, CssInline) {}

/**
 * Factory Function for creating a CssInject instance
 * 
 * @param  {object} [opts] Defaults to an empty object if not provided
 * @param  {string} [opts.id] The ID for the stylesheet
 * @param  {string} [opts.media] The media string to define what kind of stylesheet it is
 * @param  {(string|number)} [opts.modifier] A string or number value to specific what features are initialised for the CssInject instance
 * @returns {(Full|InlineOnly|StylesOnly)} returns a mixed CssBase class depending on the modifiers provided
 */
export default function cssInject(opts = {}) {
    const { id, media, modifier } = opts;

    switch (modifier) {
        case "StylesOnly":
        case 1:
            return new StylesOnly(id, media).init();

        case "InlineOnly":
        case 2:
            return new InlineOnly();

        default: return new Full(id, media).init();
    }
}