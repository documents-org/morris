'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var LIST = {
    ELLIPSIS: '…',
    DOT: '.',
    COMMA: ',',
    PAR_O: '(',
    PAR_C: ')',
    BRA_O: '[',
    BRA_C: ']',
    COLON: ':',
    SEMICOLON: ';',
    QUOTE: "'",
    QUOTE_DOUBLE: '"',
    INTERROGATION: '?',
    EXCLAMATION: '!',
    LQUOTE: '«',
    RQUOTE: '»',
    APOSTROPHE: '’',
    SMART_QUOTES: '“',
    NO_BREAK_HYPHEN: '\u2011',
    SPACES: {
        CHARACTER_TABULATION: '\u0009',
        LINE_FEED: '\u000A',
        LINE_TABULATION: '\u000B',
        FORM_FEED: '\u000C',
        CARRIAGE_RETURN: '\u000D',
        SPACE: '\u0020',
        NEXT_LINE: '\u0085',
        NO_BREAK_SPACE: '\u00A0',
        OGHAM_SPACE_MARK: '\u1680',
        EN_QUAD: '\u2000',
        EM_QUAD: '\u2001',
        EN_SPACE: '\u2002',
        EM_SPACE: '\u2003',
        THREE_PER_EM_SPACE: '\u2004',
        FOUR_PER_EM_SPACE: '\u2005',
        SIX_PER_EM_SPACE: '\u2006',
        FIGURE_SPACE: '\u2007',
        PUNCTUATION_SPACE: '\u2008',
        THIN_SPACE: '\u2009',
        HAIR_SPACE: '\u200A',
        LINE_SEPARATOR: '\u2028',
        PARAGRAPH_SEPARATOR: '\u2029',
        NARROW_NO_BREAK_SPACE: '\u202F',
        MEDIUM_MATHEMATICAL_SPACE: '\u205F',
        IDEOGRAPHIC_SPACE: '\u3000',
        MONGOLIAN_VOWEL_SEPARATOR: '\u180E',
        ZERO_WIDTH_SPACE: '\u200B',
        ZERO_WIDTH_NON_JOINER: '\u200C',
        ZERO_WIDTH_JOINER: '\u200D',
        WORD_JOINER: '\u2060',
        ZERO_WIDTH_NON_BREAKING: '\uFEFF'
    }
};

var ordinalNumbersMapSingular = {
    er: 'er',
    ere: 're',
    ère: 're',
    me: 'e',
    eme: 'e',
    ieme: 'e',
    ième: 'e',
    ème: 'e',
    nd: 'nd'
};
var ordinalNumbersMapPlural = {
    ers: 'ers',
    eres: 're',
    ères: 'res',
    mes: 'es',
    emes: 'es',
    iemes: 'e',
    ièmes: 'e',
    èmes: 'es',
    nds: 'nds'
};
var ordinalNumbersSorted = Object.values(ordinalNumbersMapPlural)
    .concat(Object.values(ordinalNumbersMapSingular))
    .reduce(function (b, a) { return b.concat(b.indexOf(a) === -1 ? [a] : []); }, [])
    .sort(function (b, a) { return (b.length < a.length ? 1 : -1); });
var frenchRules = [
    {
        id: 0,
        description: 'Trims the input string',
        contexts: {
            brut: {
                replace: function (str) {
                    return str.trim();
                }
            }
        }
    },
    {
        id: 1,
        description: 'Replaces every type of space with a standard space',
        contexts: {
            brut: {
                find: /\s/gi,
                replace: "" + LIST.SPACES.SPACE
            }
        }
    }, {
        id: 2,
        description: 'Replaces multiple spaces in a row with a single one',
        contexts: {
            brut: {
                find: /\s+/gi,
                replace: LIST.SPACES.SPACE
            }
        }
    }, {
        id: 3,
        description: 'Replaces three dots with an ellipsis',
        contexts: {
            brut: {
                find: /\.{3}/gi,
                replace: "" + LIST.ELLIPSIS
            }
        }
    }, {
        id: 4,
        description: 'Replaces any double quote with dumb quotes',
        contexts: {
            brut: {
                find: /["“”«»]/gi,
                replace: '"'
            }
        }
    }, {
        id: 5,
        description: 'Removes spaces before simple punctuations and symbols',
        contexts: {
            brut: {
                find: /\s*([,.!:;?\-)“(«»"’\]\['])/gi,
                replace: '$1'
            }
        }
    }, {
        id: 6,
        description: 'Removes spaces after simple punctuations and symbols',
        contexts: {
            brut: {
                find: /([,.!:;?\-)“(«»"’\]\['])\s*/gi,
                replace: '$1'
            }
        }
    }, {
        id: 7,
        description: 'Replaces quotes with french quotes',
        contexts: {
            brut: {
                replace: function (str) {
                    var open = false;
                    var output = '';
                    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
                        var char = str_1[_i];
                        if (char === '"') {
                            output += open ? LIST.RQUOTE : LIST.LQUOTE;
                            open = !open;
                            continue;
                        }
                        output += char;
                    }
                    return output;
                }
            }
        }
    }, {
        id: 8,
        description: 'Inserts space before some punctuations & symbols',
        contexts: {
            brut: {
                find: /([[{(«])/gi,
                replace: LIST.SPACES.SPACE + "$1"
            }
        }
    }, {
        id: 9,
        description: 'Inserts nbsp before some punctuations & symbols',
        contexts: {
            brut: {
                find: /([:»])/gi,
                replace: LIST.SPACES.NO_BREAK_SPACE + "$1"
            }
        }
    }, {
        id: 10,
        description: 'Inserts thin-nbsp before some punctuations & symbols',
        contexts: {
            brut: {
                find: /([;!?])/gi,
                replace: LIST.SPACES.NARROW_NO_BREAK_SPACE + "$1"
            }
        }
    }, {
        id: 11,
        description: 'Inserts space after some punctuations & symbols',
        contexts: {
            brut: {
                find: /([!.,;:?)}\]»])/gi,
                replace: "$1" + LIST.SPACES.SPACE
            }
        }
    }, {
        id: 12,
        description: 'Inserts nbsp after some punctuations & symbols',
        contexts: {
            brut: {
                find: /(«)/gi,
                replace: "$1" + LIST.SPACES.SPACE
            }
        }
    }, {
        id: 13,
        description: 'Normalizes singular ordinal numbers',
        contexts: {
            brut: {
                replace: function (str) {
                    var searches = Object.keys(ordinalNumbersMapSingular);
                    var re = new RegExp("(\\d+)(" + searches.join('|') + ")", 'gi');
                    return str.replace(re, function (_match, nums, capture) {
                        return nums + ordinalNumbersMapSingular[capture];
                    });
                }
            }
        }
    }, {
        id: 14,
        description: 'Normalizes plural ordinal numbers',
        contexts: {
            brut: {
                replace: function (str) {
                    var searches = Object.keys(ordinalNumbersMapPlural);
                    var re = new RegExp("(\\d+)(" + searches.join('|') + ")", 'gi');
                    return str.replace(re, function (_match, nums, capture) {
                        return nums + ordinalNumbersMapPlural[capture];
                    });
                }
            }
        }
    }, {
        id: 15,
        description: 'Exposes ordinal numbers',
        contexts: {
            html: {
                find: new RegExp("(\\d+)(" + ordinalNumbersSorted.join('|') + ")", 'g'),
                replace: "$1<sup>$2</sup>"
            }
        }
    }, {
        id: 16,
        description: 'Normalizes titles (Mr, Mme)...',
        contexts: {
            html: {
                find: new RegExp('M(r|me)([^w])', 'g'),
                replace: "M<sup>$1</sup>$2"
            }
        }
    }, {
        id: 17,
        description: 'Rewrites centuries',
        contexts: {
            html: {
                find: /(\s[CMVXI]+)(eme|ème)+/g,
                replace: "$1<sup>e</sup>"
            },
            brut: {
                find: /(\s[CMVXI]+)(eme|ème)+/g,
                replace: '$1e'
            }
        }
    }, {
        id: 18,
        description: 'Glues numbers to the word after them',
        contexts: {
            brut: {
                find: /(\d+)\s(\S)/gi,
                replace: "$1" + LIST.SPACES.NO_BREAK_SPACE + "$2"
            }
        }
    }, {
        id: 19,
        description: 'Packs numbers by 3 above 10^4',
        contexts: {
            brut: {
                replace: function (text) {
                    var find = /(\d{5,18})/g;
                    var replace = function (a, match) {
                        var m = match.split('')
                            .reverse()
                            .reduce(function (acc, num) {
                            if (acc.length === 0) {
                                acc.push([]);
                            }
                            if (acc[acc.length - 1].length < 3) {
                                acc[acc.length - 1].push(num);
                            }
                            else {
                                acc.push([num]);
                            }
                            return acc;
                        }, []);
                        return m.map(function (a) { return a.reverse().join(''); })
                            .reverse()
                            .join(LIST.SPACES.NARROW_NO_BREAK_SPACE);
                    };
                    return text.replace(find, replace);
                }
            }
        }
    },
    {
        id: 20,
        description: 'Glues words less than three letters to the word after them',
        contexts: {
            brut: {
                replace: function (text) {
                    return text.split(' ')
                        .reduce(function (out, word) {
                        if ((word.match(/\w/g) || []).length < 4)
                            return "" + out + word + LIST.SPACES.NO_BREAK_SPACE;
                        return "" + out + word + " ";
                    }, '');
                }
            }
        }
    }, {
        id: 21,
        description: 'Replaces spaces after pronouns with nbsps',
        contexts: {
            brut: {
                find: /(dans|d(?:[’'])une?|sous|celles?|ce(?:tte)?|celui|ceux|nous|pour|avec|vous|-ci)\s/gi,
                replace: "$1" + LIST.SPACES.NO_BREAK_SPACE
            }
        }
    }, {
        id: 22,
        description: 'Glues capitalized words (acronyms) to the word before them',
        contexts: {
            brut: {
                find: /\s+([A-Z]{1,6})(\s)/g,
                replace: LIST.SPACES.NO_BREAK_SPACE + "$1$2"
            }
        }
    }, {
        id: 23,
        description: 'Glues lonely words with the word before them',
        contexts: {
            brut: {
                find: /\s+(\S+)$/gi,
                replace: LIST.SPACES.NO_BREAK_SPACE + "$1"
            }
        }
    }, {
        id: 24,
        description: 'Replaces dashes inside words with non-break dashes',
        contexts: {
            brut: {
                find: /(\w)(?:[-])(\w)/gi,
                replace: "$1" + LIST.NO_BREAK_HYPHEN + "$2"
            }
        }
    }, {
        id: 25,
        description: 'Avoids holes in numbers',
        contexts: {
            brut: {
                find: /(\d+)\.\s*(\d+)/gi,
                replace: '$1.$2'
            }
        }
    }, {
        id: 26,
        description: 'Replaces unit exponents with correct exponents',
        contexts: {
            brut: {
                replace: function (str) {
                    var find = /(m\d)/gi;
                    var s = {
                        m2: 'm²',
                        m3: 'm³'
                    };
                    var replace = function (_, m) {
                        var a = s[m];
                        if (typeof a !== 'undefined')
                            return a;
                        return m;
                    };
                    return str.replace(find, replace);
                }
            }
        }
    }, {
        id: 27,
        description: 'Avoids chaining symbol-space-symbol',
        contexts: {
            brut: {
                find: /([\])}])\s([.!?])/gi,
                replace: '$1$2'
            }
        }
    }
];

var frenchRules$1 = frenchRules;
var Morris = (function () {
    function Morris(rules) {
        if (Array.isArray(rules) && rules.length > 0) {
            if (Array.isArray(rules[0])) {
                this.rules = rules.reduce(function (b, a) { return b.concat(a); }, []);
            }
            else {
                this.rules = rules;
            }
        }
    }
    Morris.prototype.buildRuleMap = function () {
        this.ruleMap = this.rules.reduce(function (map, rule) {
            map[rule.id.toString(10)] = Object.keys(map).length;
            return map;
        }, {});
    };
    Morris.prototype.getRuleID = function () {
        return this.rules.reduce(function (b, r) {
            if (r.id > b)
                return r.id;
            return b;
        }, 0) + 1;
    };
    Morris.prototype.addRule = function (rule) {
        this.rules = this.rules.concat([rule]);
        this.buildRuleMap();
        return this;
    };
    Object.defineProperty(Morris.prototype, "getContexts", {
        get: function () {
            return this.rules.reduce(function (acc, rule) {
                for (var context in rule.contexts) {
                    if (acc.indexOf(context) === -1)
                        acc.push(context);
                }
                return acc;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Morris.prototype, "getRules", {
        get: function () {
            return this.rules;
        },
        enumerable: true,
        configurable: true
    });
    Morris.prototype.apply = function (text, context, rule) {
        var ri = this.rules[this.ruleMap[rule.toString(10)].toString(10)];
        if (ri.contexts[context]) {
            var r = ri.contexts[context];
            if (typeof r.replace === 'string') {
                return text.replace(r.find, r.replace);
            }
            else {
                return r.replace(text);
            }
        }
        return text;
    };
    Morris.prototype.format = function (text, context, callback) {
        var _this = this;
        if (context === void 0) { context = 'brut'; }
        if (callback === void 0) { callback = function (text) {
        }; }
        return this.rules.reduce(function (str, rule) {
            var result = _this.apply(str, context, rule.id);
            callback(result);
            return result;
        }, text);
    };
    Morris.prototype.asyncFormat = function (text, context, callback) {
        var _this = this;
        if (context === void 0) { context = 'brut'; }
        if (callback === void 0) { callback = function (text) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        }); }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this.rules.reduce(function (str, rule) { return __awaiter(_this, void 0, void 0, function () {
                        var result, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = this.apply;
                                    return [4, str];
                                case 1:
                                    result = _a.apply(this, [_b.sent(), context, rule.id]);
                                    return [4, callback(result)];
                                case 2:
                                    _b.sent();
                                    return [2, result];
                            }
                        });
                    }); }, Promise.resolve(text))];
            });
        });
    };
    return Morris;
}());

exports.frenchRules = frenchRules$1;
exports.Morris = Morris;
