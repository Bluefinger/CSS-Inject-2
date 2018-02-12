var assert = require("assert");
var cssinject = require("../src/CssInject").default;

let full, styles, inline;

const STYLES = { modifier: "stylesOnly"};
const INLINE = { modifier: "inlineOnly"};

describe("CssInject", function() {

    describe("init()", function() {

        let test = cssinject();

        it("should put a style element in the document head", function() {

            let el = document.getElementById(test.id);

            assert.ok(el, "Style Element fetched from HEAD");

        });

        it("should initialise the styles array", function () {

            assert.ok(test.styles.length != null);

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

            test = cssinject();

        });

        it("should remove the stylesheet from the document head", function() {

            let id = test.id;

            test.destroy();

            let el = document.getElementById(id);

            assert.ifError(el);

        });

        it("should remove its own properties", function () {

            test.destroy();

            assert.ifError(test.styles);

        });

    });

});

describe("CssRules", function() {

    let styles = cssinject(STYLES);

    describe("add()", function() {

        it("should add a new rule with a given selector, CSS property and value", function() {

            styles.add("div", "border", "5px solid #ff0000");

            assert.equal(styles.rules[0].cssText, 'div { border: 5px solid rgb(255, 0, 0); }');

        });

        it("should modify an existing rule with more CSS properties", function() {

            styles.add("div", "background-color", "#ccc");

            assert.equal(styles.rules[0].cssText, 'div { border: 5px solid rgb(255, 0, 0); background-color: rgb(204, 204, 204); }');

        });

        it("should update an existing property with a new value", function() {

            styles.add("div", "background-color", "#ff0000");

            assert.equal(styles.rules[0].cssText, 'div { border: 5px solid rgb(255, 0, 0); background-color: rgb(255, 0, 0); }');

        });

        after(function() {

            styles.remove("div");

        });

    });

});