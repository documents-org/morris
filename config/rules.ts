import { RuleInterface } from '~/lib/RuleInterface'

import { LIST } from '~/config/characters'

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
        description: 'Replaces every type of space with a standard space',
        contexts: {
            brut: {
                find: new RegExp(`[${LIST.SPACES.NARROW_NO_BREAK_SPACE}${LIST.SPACES.NO_BREAK_SPACE}${LIST.SPACES.THIN_SPACE}]`, 'gi'),
                replace: `${LIST.SPACES.SPACE}`
            }
        }
    },
    {
        id: 1,
        description: 'Replaces three dots with an ellipsis',
        contexts: {
            brut: {
                find: /\.{3}/gi,
                replace: `${LIST.ELLIPSIS}`
            }
        }
    },
    {
        id: 2,
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
    },
    {
        id: 3,
        description: 'Replaces smart quotes with french quotes',
        contexts: {
            brut: {
                replace(str: string): string {
                    let output = ''
                    for (const char of str) {
                        if (char === '“') {
                            output += LIST.LQUOTE
                            continue
                        } else if (char === '”') {
                            output += LIST.RQUOTE
                            continue
                        }
                        output += char
                    }
                    return output
                }
            }
        }
    },
    {
        id: 4,
        description: 'Ensures non-breaking space after opening quote',
        contexts: {
            brut: {
                find: new RegExp(`${LIST.LQUOTE}\s*`, 'gi'),
                replace: `${LIST.LQUOTE}${LIST.SPACES.NO_BREAK_SPACE}`
            }
        }
    },
    {
        id: 5,
        description: 'Ensures non-breaking space after closing quote',
        contexts: {
            brut: {
                find: new RegExp(`\s*${LIST.RQUOTE}`, 'gi'),
                replace: `${LIST.SPACES.NO_BREAK_SPACE}${LIST.RQUOTE}`
            }
        }
    },
    {
        id: 6,
        description: 'Replaces multiple spaces in a row with a single one',
        contexts: {
            brut: {
                find: new RegExp(` +`, 'gi'),
                replace: LIST.SPACES.SPACE
            }
        }
    },
    {
        id: 7,
        description: 'Removes spaces before simple punctuations',
        contexts: {
            brut: {
                find: /(\w)\s+([,.!:;?\-)“(«»"’\]\['])/gi,
                replace: '$1$2'
            }
        }
    },
    {
        id: 8,
        description: 'Removes spaces after simple punctuations',
        contexts: {
            brut: {
                find: /(\w)\s+([,.!:;?\-)“(«»"’\]\['])/gi,
                replace: '$1$2'
            }
        }
    },
    {
        id: 9,
        description: 'Ensures a space after a simple or double punctuation',
        contexts: {
            brut: {
                find: /([,.:;?!])\s*(\S)/gi,
                replace: '$1 $2'
            }
        }
    },
    {
        id: 10,
        description:
            'Ensures a single narrow non-breaking space before a double punctuation',
        contexts: {
            brut: {
                find: /\s*([!?:;])/gi,
                replace: `${LIST.SPACES.NARROW_NO_BREAK_SPACE}$1`
            }
        }
    },
    {
        id: 11,
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
    },
    {
        id: 12,
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
    },
    {
        id: 13,
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
    },
    {
        id: 14,
        description: 'Normalizes titles (Mr, Mme)...',
        contexts: {
            html: {
                find: new RegExp('M(r|me)([^w])', 'g'),
                replace: `M<sup>$1</sup>$2`
            }
        }
    },
    {
        id: 15,
        description: 'Rewrites centuries',
        contexts: {
            html: {
                find: /(\s[CMVXI]+)(eme|ème)+/g,
                replace: `$1<sup>e</sup>`
            },
            brut: {
                find: /(\s[CMVXI]+)(eme|ème)+\s/g,
                replace: `$1e `
            }
        }
    },
    {
        id: 16,
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
    },
    {
        id: 17,
        description:
            'Glues capitalized words (acronyms) to the word before them',
        contexts: {
            brut: {
                find: /\s+([A-Z]{1,3})(\s)/g,
                replace: `${LIST.SPACES.NO_BREAK_SPACE}$1$2`
            }
        }
    },
    {
        id: 18,
        description: 'Glues lonely words with the word before them',
        contexts: {
            brut: {
                find: /\s+(\S+)$/gi,
                replace: `${LIST.SPACES.NO_BREAK_SPACE}$1`
            }
        }
    }
]
