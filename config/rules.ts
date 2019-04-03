import {RuleInterface} from '~/lib/RuleInterface'

import {LIST} from '~/config/characters'

const ordinalNumbersMapSingular = {
    er: 'er',
    ere: 're',
    ère: 're',
    me: 'e',
    eme: 'e',
    ieme: 'e',
    ième: 'e',
    ème: 'e',
    nd: 'nd'
}

const ordinalNumbersMapPlural = {
    ers: 'ers',
    eres: 're',
    ères: 'res',
    mes: 'es',
    emes: 'es',
    iemes: 'e',
    ièmes: 'e',
    èmes: 'es',
    nds: 'nds'
}

const ordinalNumbersSorted = Object.values(ordinalNumbersMapPlural)
    .concat(Object.values(ordinalNumbersMapSingular))
    .reduce((b, a) => b.concat(b.indexOf(a) === -1 ? [a] : []), [] as string[])
    .sort((b, a) => (b.length < a.length ? 1 : -1))

export const frenchRules: RuleInterface[] = [
    {
        id: 0,
        description: 'Trims the input string',
        contexts: {
            brut: {
                replace(str: string): string {
                    return str.trim()
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
                replace: `${LIST.SPACES.SPACE}`
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
                replace: `${LIST.ELLIPSIS}`
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
                replace(str: string): string {
                    let open = false
                    let output = ''
                    for (const char of str) {
                        if (char === '"') {
                            output += open ? LIST.RQUOTE : LIST.LQUOTE
                            open = !open
                            continue
                        }
                        output += char
                    }
                    return output
                }
            }
        }
    }, {
        id: 8,
        description: 'Inserts space before some punctuations & symbols',
        contexts: {
            brut: {
                find: /([[{(«])/gi,
                replace: `${LIST.SPACES.SPACE}$1`
            }
        }
    }, {
        id: 9,
        description: 'Inserts nbsp before some punctuations & symbols',
        contexts: {
            brut: {
                find: /([:»])/gi,
                replace: `${LIST.SPACES.NO_BREAK_SPACE}$1`
            }
        }
    }, {
        id: 10,
        description: 'Inserts thin-nbsp before some punctuations & symbols',
        contexts: {
            brut: {
                find: /([;!?])/gi,
                replace: `${LIST.SPACES.NARROW_NO_BREAK_SPACE}$1`
            }
        }
    }, {
        id: 11,
        description: 'Inserts space after some punctuations & symbols',
        contexts: {
            brut: {
                find: /([!.,;:?)}\]»])/gi,
                replace: `$1${LIST.SPACES.SPACE}`
            }
        }
    }, {
        id: 12,
        description: 'Inserts nbsp after some punctuations & symbols',
        contexts: {
            brut: {
                find: /(«)/gi,
                replace: `$1${LIST.SPACES.SPACE}`
            }
        }
    }, {
        id: 13,
        description: 'Normalizes singular ordinal numbers',
        contexts: {
            brut: {
                replace(str: string): string {
                    const searches: string[] = Object.keys(
                        ordinalNumbersMapSingular
                    )
                    const re = new RegExp(
                        `(\\d+)(${searches.join('|')})`,
                        'gi'
                    )
                    return str.replace(
                        re,
                        (_match: string, nums: string, capture: string) =>
                            nums + ordinalNumbersMapSingular[capture]
                    )
                }
            }
        }
    }, {
        id: 14,
        description: 'Normalizes plural ordinal numbers',
        contexts: {
            brut: {
                replace(str: string): string {
                    const searches: string[] = Object.keys(
                        ordinalNumbersMapPlural
                    )
                    const re = new RegExp(
                        `(\\d+)(${searches.join('|')})`,
                        'gi'
                    )
                    return str.replace(
                        re,
                        (_match: string, nums: string, capture: string) =>
                            nums + ordinalNumbersMapPlural[capture]
                    )
                }
            }
        }
    }, {
        id: 15,
        description: 'Exposes ordinal numbers',
        contexts: {
            html: {
                find: new RegExp(
                    `(\\d+)(${ordinalNumbersSorted.join('|')})`,
                    'g'
                ),
                replace: `$1<sup>$2</sup>`
            }
        }
    }, {
        id: 16,
        description: 'Normalizes titles (Mr, Mme)...',
        contexts: {
            html: {
                find: new RegExp('M(r|me)([^w])', 'g'),
                replace: `M<sup>$1</sup>$2`
            }
        }
    }, {
        id: 17,
        description: 'Rewrites centuries',
        contexts: {
            html: {
                find: /(\s[CMVXI]+)(eme|ème)+/g,
                replace: `$1<sup>e</sup>`
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
                replace: `$1${LIST.SPACES.NO_BREAK_SPACE}$2`
            }
        }
    }, {
        id: 19,
        description: 'Packs numbers by 3 above 10^4',
        contexts: {
            brut: {
                replace(text: string): string {
                    const find = /(\d{5,18})/g
                    const replace = (a: string, match: string): string => {
                        const m: Array<Array<string>> = match.split('')
                            .reverse()
                            .reduce((acc, num: string) => {
                                if (acc.length === 0) {
                                    acc.push([])
                                }
                                if (acc[acc.length - 1].length < 3) {
                                    acc[acc.length - 1].push(num)
                                } else {
                                    acc.push([num])
                                }
                                return acc
                            }, [] as Array<Array<string>>)
                        return m.map(a => a.reverse().join(''))
                            .reverse()
                            .join(LIST.SPACES.NARROW_NO_BREAK_SPACE)
                    }
                    return text.replace(find, replace)
                }
            }
        }
    },
    {
        id: 20,
        description:
            'Glues words less than three letters to the word after them',
        contexts: {
            brut: {
                replace(text: string): string {
                    return text.split(' ')
                        .reduce((out, word) => {
                            if (word.length < 4) return `${out}${word}${LIST.SPACES.NO_BREAK_SPACE}`
                            return `${out}${word} `
                        }, '')
                }
            }
        }
    }, {
        id: 21,
        description: 'Replaces spaces after pronouns with nbsps',
        contexts: {
            brut: {
                find: /(dans|d(?:[’'])une?|sous|celles?|ce(?:tte)?|celui|ceux|nous|pour|avec|vous|-ci)\s/gi,
                replace: `$1${LIST.SPACES.NO_BREAK_SPACE}`
            }
        }
    }, {
        id: 22,
        description:
            'Glues capitalized words (acronyms) to the word before them',
        contexts: {
            brut: {
                find: /\s+([A-Z]{1,6})(\s)/g,
                replace: `${LIST.SPACES.NO_BREAK_SPACE}$1$2`
            }
        }
    }, {
        id: 23,
        description: 'Glues lonely words with the word before them',
        contexts: {
            brut: {
                find: /\s+(\S+)$/gi,
                replace: `${LIST.SPACES.NO_BREAK_SPACE}$1`
            }
        }
    }, {
        id: 24,
        description: 'Replaces dashes inside words with non-break dashes',
        contexts: {
            brut: {
                find: /(\w)(?:[-])(\w)/gi,
                replace: `$1${LIST.NO_BREAK_HYPHEN}$2`
            }
        }
    }, {
        id: 25,
        description: 'Avoids holes in numbers',
        contexts: {
            brut: {
                find: /(\d+)\.\s(\d+)/gi,
                replace: '$1.$2'
            }
        }
    }, {
        id: 24,
        description: 'Replaces unit exponents with correct exponents',
        contexts: {
            brut: {
                replace(str: string): string {
                    const find = /(m\d)/gi
                    const s = {
                        m2: 'm²',
                        m3: 'm³'
                    }
                    const replace = (_: string, m: string) => {
                        const a = s[m]
                        if (typeof a !== 'undefined') return a as string
                        return m
                    }
                    return str.replace(find, replace)
                }
            }
        }
    }, {
        id: 25,
        description: 'Avoids chaining symbol-space-symbol',
        contexts: {
            brut: {
                find: /([\])}])\s([.!?])/gi,
                replace: '$1$2'
            }
        }
    }
]
