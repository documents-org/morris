'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    QUOTE: '\'',
    QUOTE_DOUBLE: '"',
    INTERROGATION: '?',
    EXCLAMATION: '!',
    LQUOTE: '«',
    RQUOTE: '»',
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

var rules = [
    {
        description: 'Replaces three dots with an ellipsis',
        find: /\.{3}/gi,
        replace: "" + LIST.ELLIPSIS
    },
    {
        description: 'Replaces quotes with french quotes',
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
    },
    {
        description: 'Ensures non-breaking space after opening quote',
        find: new RegExp(LIST.LQUOTE + "s*"),
        replace: "" + LIST.LQUOTE + LIST.SPACES.NO_BREAK_SPACE
    },
    {
        description: 'Ensures non-breaking space after closing quote',
        find: new RegExp("s*" + LIST.RQUOTE),
        replace: "" + LIST.SPACES.NO_BREAK_SPACE + LIST.RQUOTE
    },
    {
        description: 'Removes spaces before simple punctuations',
        find: /(\w)\s+([,\.])/gi,
        replace: '$1$2'
    },
    {
        description: 'Ensures a space after a simple or double punctuation',
        find: /(\w[,\.:,?!])\s*(\w)/gi,
        replace: '$1 $2'
    },
    {
        description: 'Ensures a single non-breaking space before a double punctuation',
        find: /\s*([!?:;])/gi,
        replace: LIST.SPACES.NO_BREAK_SPACE + "$1"
    },
    {
        description: 'Ensures a single space after a colon or semicolon',
        find: /([:;])\s*/gi,
        replace: "$1" + LIST.SPACES.SPACE
    }
];

var Morris = (function () {
    function Morris(rules$$1) {
        this.rules = rules$$1;
    }
    Object.defineProperty(Morris.prototype, "getRules", {
        get: function () {
            return this.rules;
        },
        enumerable: true,
        configurable: true
    });
    Morris.prototype.format = function (text) {
        return this.rules.reduce(function (str, rule) {
            if (typeof rule.replace === 'string') {
                return str.replace(rule.find, rule.replace);
            }
            return rule.replace(str);
        }, text);
    };
    Morris.test = function () {
        var m = new Morris(rules);
        var input = "Il n'est pas \u00E9vident , de \"r\u00E9gler\" le texte:en effet , les r\u00E8gles de ponctuation sont complexes!Ah ,les ellipses...";
        console.log(input);
        var output = "Il n'est pas \u00E9vident, de \u00AB\u00A0r\u00E9gler\u00A0\u00BB le texte\u00A0: en effet, les r\u00E8gles de ponctuation sont complexes\u00A0! Ah, les ellipses\u2026";
        if (m.format(input) !== output) {
            console.log(output);
            throw new Error('Morris search/replace rules failed.');
        }
        console.log('Morris succeeded.');
    };
    return Morris;
}());
var index = new Morris(rules);

exports.Morris = Morris;
exports.default = index;
