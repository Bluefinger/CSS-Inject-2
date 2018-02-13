!function(){return function e(t,n,r){function i(s,u){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!u&&l)return l(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return i(n||e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}}()({1:[function(e,t,n){!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if(void 0!==n)t(n);else{var r={};t(r),e.mixwith=r}}(this,function(e){"use strict";var t=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();!function(t,n){if("function"==typeof define&&define.amd)define(["exports"],n);else if(void 0!==e)n(e);else{var r={};n(r),t.mixwith=r}}(void 0,function(e){Object.defineProperty(e,"__esModule",{value:!0});var n=e._cachedApplicationRef=Symbol("_cachedApplicationRef"),r=e._mixinRef=Symbol("_mixinRef"),i=e._originalMixin=Symbol("_originalMixin"),o=e.wrap=function(e,t){return Object.setPrototypeOf(t,e),e[i]||(e[i]=e),t},s=e.Cached=function(e){return o(e,function(t){var r=e[n];if(r||(r=e[n]=Symbol(e.name)),t.hasOwnProperty(r))return t[r];var i=e(t);return t[r]=i,i})},u=e.HasInstance=function(e){return Symbol.hasInstance&&!e.hasOwnProperty(Symbol.hasInstance)&&Object.defineProperty(e,Symbol.hasInstance,{value:function(e){for(var t=this[i];null!=e;){if(e.hasOwnProperty(r)&&e[r]===t)return!0;e=Object.getPrototypeOf(e)}return!1}}),e},l=e.BareMixin=function(e){return o(e,function(t){var n=e(t);return n.prototype[r]=e[i],n})},a=(e.Mixin=function(e){return s(u(l(e)))},e.mix=function(e){return new a(e)},function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.superclass=t}return t(e,[{key:"with",value:function(){return Array.from(arguments).reduce(function(e,t){return t(e)},this.superclass)}}]),e}())})})},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=e.media;switch(e.modifier){case"StylesOnly":case 1:return new a(t,n).init();case"InlineOnly":case 2:return new l;default:return new f(t,n).init()}};var r=e("mixwith"),i=u(e("./classes/CssBase")),o=u(e("./classes/CssRules")),s=u(e("./classes/CssInline"));function u(e){return e&&e.__esModule?e:{default:e}}var l=(0,r.mix)(i.default).with(s.default),a=(0,r.mix)(i.default).with(o.default),f=(0,r.mix)(i.default).with(o.default,s.default)},{"./classes/CssBase":3,"./classes/CssInline":4,"./classes/CssRules":5,mixwith:1}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=0,i=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"css-inject-"+r++,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"screen";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t,this.media=n,this.rules=null,this.el=null,this.obj=null,this.styles=null};n.default=i,i.prototype.init=function(){return this.el=document.createElement("style"),this.el.type="text/css",this.el.id=this.id,this.el.media=this.media,(document.head||document.getElementsByTagName("head")[0]).appendChild(this.el),this.obj=document.styleSheets[document.styleSheets.length-1],this.rules=this.obj.cssRules,this.styles=[],this},i.prototype.destroy=function(){this.el&&(this.el.parentNode.removeChild(this.el),this.el=null);this.id=null,this.media=null,this.rules=null,this.obj=null,this.styles=null}},{}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("mixwith");var i=function(e,t,n){return e.style.setProperty(t,n),this},o=function(e,t){for(var n in t)if(t.hasOwnProperty(n))if(e.length)for(var r=0;r<e.length;r++)this.addInline(e[r],n,t[n]);else this.addInline(e,n,t[n]);return this},s=function(e,t){return e.style.removeProperty(t),this},u=function(e,t){for(var n=null,r=0,i=t.length;r<i;r++)if(n=t[r],e.length)for(var o=0;o<e.length;o++)this.removeInline(e[o],n);else this.removeInline(e,n);return this},l=function(e,t){return this.removeArrayInline(e,Object.keys(t))};n.default=(0,r.Mixin)(function(e){var t=function(t){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e),n}();return t.prototype.addInline=i,t.prototype.removeInline=s,t.prototype.addObjectInline=o,t.prototype.removeObjectInline=l,t.prototype.removeArrayInline=u,t})},{mixwith:1}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=e("mixwith");var o=function(e,t,n){var r=this.styles.indexOf(e);if(r>-1)this.rules[r].style.setProperty(t,n);else{var i=this.styles.length;this.styles.push(e);var o=n?t+":"+n+";":t;this.obj.insertRule(e+"{"+o+"}",i)}return this},s=function(e){if("object"!==(void 0===e?"undefined":r(e)))throw new TypeError("Parameter is not an object");for(var t in e)if(e.hasOwnProperty(t)){var n="",i=this.styles.indexOf(t);for(var o in e[t])if(e[t].hasOwnProperty(o)){var s=e[t][o];-1===i?n+=o+":"+s+";":this.add(t,o,s)}-1===i&&this.add(t,n)}},u=function(e,t){var n=this.styles.indexOf(e);return n>-1&&(t?this.rules[n].style.removeProperty(t):(this.styles.splice(n,1),this.obj.deleteRule(n))),this},l=function(e){for(var t in e)if(e.hasOwnProperty(t)){var n=Object.keys(e[t]),r=n.length;if(r>0)for(var i=0;i<r;i+=1)this.remove(t,n[i]);else this.remove(t)}return this},a=function(e){for(var t=0,n=e.length;t<n;t++)this.remove(e[t]);return this};n.default=(0,i.Mixin)(function(e){var t=function(t){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e),n}();return t.prototype.add=o,t.prototype.remove=u,t.prototype.objectAdd=s,t.prototype.objectRemove=l,t.prototype.arrayRemove=a,t})},{mixwith:1}]},{},[2]);
//# sourceMappingURL=cssinject.js.map
