/* eslint-env browser, mocha */
"use strict";

import assert from "assert";
import CssBase from "../src/classes/CssBase";
import CssRules from "../src/classes/CssRules";
import CssInline from "../src/classes/CssInline";
import * as CssInject from "../src/CssInject";

describe("CssInject", function() {
    describe("Full Instance", function() {
        const full = new CssInject.Full();

        it("should be an instance of CssBase", function() {
            assert.ok(full instanceof CssBase);
        });

        it("should be an instance of CssRules", function() {
            assert.ok(full instanceof CssRules);
        });

        it("should be an instance of CssInline", function() {
            assert.ok(full instanceof CssInline);
        });

        after(function() {
            full.destroy();
        });
    });

    describe("StylesOnly Instance", function() {
        const styles = new CssInject.StylesOnly();

        it("should be an instance of CssBase", function() {
            assert.ok(styles instanceof CssBase);
        });

        it("should be an instance of CssRules", function() {
            assert.ok(styles instanceof CssRules);
        });

        it("should NOT be an instance of CssInline", function() {
            assert.ifError(styles instanceof CssInline);
        });

        after(function() {
            styles.destroy();
        });
    });

    describe("InlineOnly Instance", function() {
        const inline = new CssInject.InlineOnly();

        it("should be an instance of CssBase", function() {
            assert.ok(inline instanceof CssBase);
        });

        it("should be an instance of CssInline", function() {
            assert.ok(inline instanceof CssInline);
        });

        it("should NOT be an instance of CssRules", function() {
            assert.ifError(inline instanceof CssRules);
        });

        after(function() {
            inline.destroy();
        });
    });

    describe("init()", function() {
        const test = new CssInject.Full();

        it("should put a style element in the document head", function() {
            const el = document.getElementById(test.id);
            assert.ok(el, "Style Element fetched from HEAD");
        });

        it("should initialise the styles array", function () {
            assert.ok(test.styles.length !== undefined);
        });

        it("should contain an instance of the initialised stylesheet", function() {
            assert.ok(test.obj instanceof CSSStyleSheet);
        });

        it("should contain an instance of the Css Rules object", function() {
            assert.ok(test.rules instanceof CSSRuleList);
        });

        after(function() {
            test.destroy();
        });
    });

    describe("destroy()", function() {
        let test;

        beforeEach(function () {
            test = new CssInject.Full();
        });

        it("should remove the stylesheet from the document head", function() {
            const { id } = test;
            test.destroy();

            const el = document.getElementById(id);
            assert.ifError(el);
        });

        it("should remove its own properties", function () {
            test.destroy();
            assert.ifError(test.styles);
        });
    });
});

describe("CssRules", function() {
    const styles = new CssInject.StylesOnly();

    describe("add()", function() {
        it("should add a new rule with a given selector, CSS property and value", function() {
            styles.add("div", "border", "5px solid #ff0000");
            assert.equal(styles.rules[0].cssText, 'div { border: 5px solid rgb(255, 0, 0); }');
        });

        it("should modify an existing rule with more CSS properties", function() {
            styles.add("div", "background-color", "#ccc");
            assert.equal(
                styles.rules[0].cssText,
                'div { border: 5px solid rgb(255, 0, 0); background-color: rgb(204, 204, 204); }'
            );
        });

        it("should update an existing property with a new value", function() {
            styles.add("div", "background-color", "#ff0000");
            assert.equal(
                styles.rules[0].cssText,
                'div { border: 5px solid rgb(255, 0, 0); background-color: rgb(255, 0, 0); }'
            );
        });

        after(function() {
            styles.remove("div");
        });
    });

    describe("objectAdd()", function() {
        it("should create new rules from an object", function() {
            styles.objectAdd({
                "div": { "border": "5px solid #ff0000" },
                "p": { "font-weight": "bold" }
            });

            assert.equal(styles.rules[1].cssText, 'p { font-weight: bold; }');
        });

        it("should modify existing rules and add new properties", function() {
            styles.objectAdd({
                "div": { "background-color": "#ccc" },
                "p": { "font-size": "14px" }
            });

            assert.equal(styles.rules[1].cssText, 'p { font-weight: bold; font-size: 14px; }');
        });

        it("should modify existing properties within existing rules", function() {
            styles.objectAdd({
                "p": {
                    "font-size": "16px",
                    "font-weight": "normal"
                }
            });

            assert.equal(styles.rules[1].cssText, 'p { font-weight: normal; font-size: 16px; }');
        });

        after(function() {
            styles.arrayRemove([
                "div",
                "p"
            ]);
        });
    });

    describe("remove()", function() {
        before(function() {
            styles.add("p", "font-weight", "bold")
            .add("p", "font-size", "14px")
            .add("div", "border", "5px solid #ff0000");
        });

        it("should remove a property from an existing CSS rule", function() {
            styles.remove("p", "font-size");
            assert.equal(styles.rules[0].cssText, 'p { font-weight: bold; }');
        });

        it("should remove an existing CSS rule when given only a selector and no property", function() {
            styles.remove("div");
            assert.ifError(styles.rules[1]);
        });

        after(function() {
            styles.remove("p");
        });
    });

    describe("objectRemove()", function() {
        before(function() {
            styles.objectAdd({
                "div": { "border": "5px solid #ff0000" },
                "p": {
                    "font-size": "16px",
                    "font-weight": "bold"
                }
            });
        });

        it("should remove properties from existing CSS Rules", function() {
            styles.objectRemove({ "p": { "font-size": true } });

            assert.equal(styles.rules[1].cssText, 'p { font-weight: bold; }');
        });

        it("should remove rules when an property value is set to true instead of an array", function() {
            styles.objectRemove({
                "div": true,
                "p": true
            });

            assert.ifError(styles.rules[1]);
        });
    });

    describe("arrayRemove()", function() {
        beforeEach(function() {
            styles.objectAdd({
                "div": { "border": "5px solid #ff0000" },
                "p": {
                    "font-size": "16px",
                    "font-weight": "bold"
                }
            });
        });

        it("should remove one rule provided in the array", function() {
            styles.arrayRemove(["p"]);

            assert.ifError(styles.rules[1]);
        });

        it("should remove all rules provided in the array", function() {
            styles.arrayRemove([
                "div",
                "p"
            ]);

            assert.ifError(styles.rules[0]);
        });
    });

    after(function() {
        styles.destroy();
    });
});

describe("CssInline", function() {
    const inline = new CssInject.InlineOnly()
    const div = document.createElement("div");

    it("InlineOnly mode should not put a stylesheet in the document head", function() {
        const el = document.getElementById(inline.id);
        assert.ifError(el);
    });

    describe("addInline()", function() {
        it("should add new style properties to an element", function() {
            inline.addInline(div, "border", "5px solid #ff0000");

            assert.equal(div.style.border, "5px solid rgb(255, 0, 0)");
        });

        it("should modify existing style properties to an element", function() {
            inline.addInline(div, "border", "5px solid #ffff00");

            assert.equal(div.style.cssText, "border: 5px solid rgb(255, 255, 0);");
        });

        after(function() {
            inline.removeInline(div, "border");
        });
    });

    describe("addObjectInline()", function() {
        it("should add new style properties to an element via an object", function() {
            inline.addObjectInline(div, {
                "background-color": "#ff0000",
                "border": "5px solid #ff0000"
            });

            assert.equal(div.style.cssText, 'background-color: rgb(255, 0, 0); border: 5px solid rgb(255, 0, 0);');
        });

        it("should modify existing style properties to an element via an object", function() {
            inline.addObjectInline(div, {
                "background-color": "#0000ff",
                "border": "5px solid #00ff00"
            });

            assert.equal(div.style.cssText, 'background-color: rgb(0, 0, 255); border: 5px solid rgb(0, 255, 0);');
        });

        after(function() {
            inline.removeArrayInline(div, [
                "background-color",
                "border"
            ]);
        });
    });

    describe("removeInline()", function() {
        before(function() {
            inline.addInline(div, "border", "5px solid #ff0000")
                .addInline(div, "background-color", "#ff0000");
        });

        it("should remove style properties from the element", function() {
            inline.removeInline(div, "background-color");

            assert.equal(div.style.cssText, "border: 5px solid rgb(255, 0, 0);");
        });

        after(function() {
            inline.removeInline(div, "border");
        });
    });

    describe("removeArrayInline()", function() {
        beforeEach(function() {
            inline.addObjectInline(div, {
                "background-color": "#0000ff",
                "border": "5px solid #00ff00",
                "font-size": "14px"
            });
        });

        it("should remove one style property without affecting others from the element", function() {
            inline.removeArrayInline(div, ["background-color"]);

            assert.equal(div.style.cssText, 'border: 5px solid rgb(0, 255, 0); font-size: 14px;');
        });

        it("should remove all style properties from the element", function() {
            inline.removeArrayInline(div, [
                "background-color",
                "border",
                "font-size"
            ]);

            assert.equal(div.style.cssText, '');
        });
    });

    describe("removeObjectInline()", function() {
        beforeEach(function() {
            inline.addObjectInline(div, {
                "background-color": "#0000ff",
                "border": "5px solid #00ff00",
                "font-size": "14px"
            });
        });

        it("should remove one property without affecting other from the element via an object", function() {
            inline.removeObjectInline(div, { "background-color": true });

            assert.equal(div.style.cssText, 'border: 5px solid rgb(0, 255, 0); font-size: 14px;');
        });

        it("should remove all properties from the element via an object", function() {
            inline.removeObjectInline(div, {
                "background-color": true,
                "border": true,
                "font-size": true
            });

            assert.equal(div.style.cssText, '');
        });
    });

    after(function() {
        inline.destroy();
    });
});