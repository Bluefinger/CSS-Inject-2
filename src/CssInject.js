"use strict";

import { mix } from "mixwith";

import CssBase from "./classes/CssBase";
import CssRules from "./classes/CssRules";
import CssInline from "./classes/CssInline";

let InlineOnly = mix(CssBase).with(CssInline);
let StylesOnly = mix(CssBase).with(CssRules);
let Full = mix(CssBase).with(CssRules, CssInline);

export default function CssInject(opts = {}) {
    let { id, media, modifier } = opts;

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