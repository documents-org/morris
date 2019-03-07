'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var LIST = {
    ELLIPSIS: "…",
    DOT: ".",
    COMMA: ",",
    PAR_O: "(",
    PAR_C: ")",
    BRA_O: "[",
    BRA_C: "]",
    COLON: ":",
    SEMICOLON: ";",
    QUOTE: "'",
    QUOTE_DOUBLE: '"',
    INTERROGATION: "?",
    EXCLAMATION: "!",
    LQUOTE: "«",
    RQUOTE: "»",
    SPACES: {
        CHARACTER_TABULATION: "\u0009",
        LINE_FEED: "\u000A",
        LINE_TABULATION: "\u000B",
        FORM_FEED: "\u000C",
        CARRIAGE_RETURN: "\u000D",
        SPACE: "\u0020",
        NEXT_LINE: "\u0085",
        NO_BREAK_SPACE: "\u00A0",
        OGHAM_SPACE_MARK: "\u1680",
        EN_QUAD: "\u2000",
        EM_QUAD: "\u2001",
        EN_SPACE: "\u2002",
        EM_SPACE: "\u2003",
        THREE_PER_EM_SPACE: "\u2004",
        FOUR_PER_EM_SPACE: "\u2005",
        SIX_PER_EM_SPACE: "\u2006",
        FIGURE_SPACE: "\u2007",
        PUNCTUATION_SPACE: "\u2008",
        THIN_SPACE: "\u2009",
        HAIR_SPACE: "\u200A",
        LINE_SEPARATOR: "\u2028",
        PARAGRAPH_SEPARATOR: "\u2029",
        NARROW_NO_BREAK_SPACE: "\u202F",
        MEDIUM_MATHEMATICAL_SPACE: "\u205F",
        IDEOGRAPHIC_SPACE: "\u3000",
        MONGOLIAN_VOWEL_SEPARATOR: "\u180E",
        ZERO_WIDTH_SPACE: "\u200B",
        ZERO_WIDTH_NON_JOINER: "\u200C",
        ZERO_WIDTH_JOINER: "\u200D",
        WORD_JOINER: "\u2060",
        ZERO_WIDTH_NON_BREAKING: "\uFEFF"
    }
};

var ordinalNumbersMapSingular = {
    ere: "re",
    ère: "re",
    me: "e",
    eme: "e",
    ème: "e"
};
var ordinalNumbersMapPlural = {
    eres: "re",
    ères: "res",
    mes: "es",
    emes: "es",
    èmes: "es"
};
var ordinalNumbersSorted = Object.values(ordinalNumbersMapPlural)
    .concat(Object.values(ordinalNumbersMapSingular))
    .reduce(function (b, a) { return b.concat(b.indexOf(a) === -1 ? [a] : []); }, [])
    .sort(function (b, a) { return (b.length < a.length ? 1 : -1); });
var frenchRules = [
    {
        id: 1,
        description: "Replaces three dots with an ellipsis",
        contexts: {
            brut: {
                find: /\.{3}/gi,
                replace: "" + LIST.ELLIPSIS
            }
        }
    },
    {
        id: 2,
        description: "Replaces quotes with french quotes",
        contexts: {
            brut: {
                replace: function (str) {
                    var open = false;
                    var output = "";
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
    },
    {
        id: 3,
        description: "Replaces smart quotes with french quotes",
        contexts: {
            brut: {
                replace: function (str) {
                    var output = "";
                    for (var _i = 0, str_2 = str; _i < str_2.length; _i++) {
                        var char = str_2[_i];
                        if (char === "“") {
                            output += LIST.LQUOTE;
                            continue;
                        }
                        else if (char === "”") {
                            output += LIST.RQUOTE;
                            continue;
                        }
                        output += char;
                    }
                    return output;
                }
            }
        }
    },
    {
        id: 4,
        description: "Ensures non-breaking space after opening quote",
        contexts: {
            brut: {
                find: new RegExp(LIST.LQUOTE + "s*", "gi"),
                replace: "" + LIST.LQUOTE + LIST.SPACES.NO_BREAK_SPACE
            }
        }
    },
    {
        id: 5,
        description: "Ensures non-breaking space after closing quote",
        contexts: {
            brut: {
                find: new RegExp("s*" + LIST.RQUOTE, "gi"),
                replace: "" + LIST.SPACES.NO_BREAK_SPACE + LIST.RQUOTE
            }
        }
    },
    {
        id: 6,
        description: "Replaces multiple spaces in a row with a single one",
        contexts: {
            brut: {
                find: new RegExp(" +", "gi"),
                replace: LIST.SPACES.SPACE
            }
        }
    },
    {
        id: 7,
        description: "Removes spaces before simple punctuations",
        contexts: {
            brut: {
                find: /(\w)\s+([(,.!?\-)])/gi,
                replace: "$1$2"
            }
        }
    },
    {
        id: 8,
        description: "Ensures a space after a simple or double punctuation",
        contexts: {
            brut: {
                find: /(\w[,\.:,?!])\s*(\w)/gi,
                replace: "$1 $2"
            }
        }
    },
    {
        id: 9,
        description: "Ensures a single narrow non-breaking space before a double punctuation",
        contexts: {
            brut: {
                find: /\s*([!?:;])/gi,
                replace: LIST.SPACES.NARROW_NO_BREAK_SPACE + "$1"
            }
        }
    },
    {
        id: 10,
        description: "Normalizes singular ordinal numbers",
        contexts: {
            brut: {
                replace: function (str) {
                    var searches = Object.keys(ordinalNumbersMapSingular);
                    var re = new RegExp("(\\d+)(" + searches.join("|") + ")", "gi");
                    return str.replace(re, function (_match, nums, capture) {
                        return nums + ordinalNumbersMapSingular[capture];
                    });
                }
            }
        }
    },
    {
        id: 11,
        description: "Normalizes plural ordinal numbers",
        contexts: {
            brut: {
                replace: function (str) {
                    var searches = Object.keys(ordinalNumbersMapPlural);
                    var re = new RegExp("(\\d+)(" + searches.join("|") + ")", "gi");
                    return str.replace(re, function (_match, nums, capture) {
                        return nums + ordinalNumbersMapPlural[capture];
                    });
                }
            }
        }
    },
    {
        id: 12,
        description: "Exposes ordinal numbers",
        contexts: {
            html: {
                find: new RegExp("(\\d+)(" + ordinalNumbersSorted.join("|") + ")", "gi"),
                replace: "$1<sup>$2</sup>"
            }
        }
    },
    {
        id: 13,
        description: "Normalizes titles (Mr, Mme)...",
        contexts: {
            html: {
                find: new RegExp("M(r|me)([^w])", "gi"),
                replace: "M<sup>$1</sup>$2"
            }
        }
    },
    {
        id: 14,
        description: "Rewrites centuries",
        contexts: {
            html: {
                find: /([CMVXI]+)\w+\s/gi,
                replace: "$1<sup>e</sup> "
            },
            brut: {
                find: /([CMVXI]+)\w+\s/gi,
                replace: "$1e "
            }
        }
    },
    {
        id: 15,
        description: "Glues words less than three letters to the word after them",
        contexts: {
            brut: {
                find: /\s([\S]{1,3})\s/gi,
                replace: " $1" + LIST.SPACES.NO_BREAK_SPACE
            }
        }
    },
    {
        id: 16,
        description: "Glues capitalized words (acronyms) to the word before them",
        contexts: {
            brut: {
                find: /\s+([A-Z]{1,3})(\s)/g,
                replace: LIST.SPACES.NO_BREAK_SPACE + "$1$2"
            }
        }
    },
    {
        id: 17,
        description: "Glues lonely words with the word before them",
        contexts: {
            brut: {
                find: /\s+(\S+)$/gi,
                replace: LIST.SPACES.NO_BREAK_SPACE + "$1"
            }
        }
    }
];

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
        this.ruleMap = this.rules.reduce(function (map, rule) {
            map[rule.id.toString(10)] = Object.keys(map).length;
            return map;
        }, {});
    }
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
        if (context === void 0) { context = "brut"; }
        var ri = this.rules[this.ruleMap[rule.toString(10)].toString(10)];
        if (ri.contexts[context]) {
            var r = ri.contexts[context];
            if (typeof r.replace === "string") {
                return text.replace(r.find, r.replace);
            }
            else {
                return r.replace(text);
            }
        }
        return text;
    };
    Morris.prototype.format = function (text, context, optionalStepCallback) {
        var _this = this;
        if (optionalStepCallback === void 0) { optionalStepCallback = function (a, b) { }; }
        return this.rules.reduce(function (str, rule) {
            var result = _this.apply(text, context, rule.id);
            optionalStepCallback(rule, result);
            return result;
        }, text);
    };
    return Morris;
}());
var instance = new Morris(frenchRules);

exports.Morris = Morris;
exports.default = instance;
