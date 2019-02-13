'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rules = [];

var Morris = (function () {
    function Morris(rules$$1) {
        this.rules = rules$$1;
    }
    Morris.prototype.format = function (text) {
        return this.rules.reduce(function (str, rule) {
            return str.replace(rule.find, rule.replace);
        }, text);
    };
    return Morris;
}());
var index = new Morris(rules);

exports.Morris = Morris;
exports.default = index;
