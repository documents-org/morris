import { RuleInterface } from '~/lib/RuleInterface'

import { LIST } from '~/config/characters'

const ordinalNumbersMap = {
    ere: 're',
    eres: 're',
    ère: 're',
    ères: 'res',
    me: 'ème',
    mes: 'èmes',
    eme: 'ème',
    emes: 'èmes'
}

export const frenchRules: RuleInterface[] = [
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
        description: 'Ensures non-breaking space after opening quote',
        contexts: {
            brut: {
                find: new RegExp(`${LIST.LQUOTE}\s*`),
                replace: `${LIST.LQUOTE}${LIST.SPACES.NO_BREAK_SPACE}`
            }
        }
    },
    {
        id: 4,
        description: 'Ensures non-breaking space after closing quote',
        contexts: {
            brut: {
                find: new RegExp(`\s*${LIST.RQUOTE}`),
                replace: `${LIST.SPACES.NO_BREAK_SPACE}${LIST.RQUOTE}`
            }
        }
    },
    {
        id: 5,
        description: 'Removes spaces before simple punctuations',
        contexts: {
            brut: {
                find: /(\w)\s+([,\.])/gi,
                replace: '$1$2'
            }
        }
    },
    {
        id: 6,
        description: 'Ensures a space after a simple or double punctuation',
        contexts: {
            brut: {
                find: /(\w[,\.:,?!])\s*(\w)/gi,
                replace: '$1 $2'
            }
        }
    },
    {
        id: 7,
        description:
            'Ensures a single non-breaking space before a double punctuation',
        contexts: {
            brut: {
                find: /\s*([!?:;])/gi,
                replace: `${LIST.SPACES.NO_BREAK_SPACE}$1`
            }
        }
    },
    {
        id: 8,
        description: 'Ensures a single space after a colon or semicolon',
        contexts: {
            brut: {
                find: /([:;])\s*/gi,
                replace: `$1${LIST.SPACES.SPACE}`
            }
        }
    },
    {
        id: 9,
        description: 'Normalizes ordinal numbers',
        contexts: {
            brut: {
                replace(str: string): string {
                    const searches: string[] = Object.keys(ordinalNumbersMap)
                    const re = new RegExp(
                        `(\\d+)(${searches.join('|')})`,
                        'gi'
                    )
                    return str.replace(
                        re,
                        (_match: string, nums: string, capture: string) =>
                            nums + ordinalNumbersMap[capture]
                    )
                }
            }
        }
    },
    {
        id: 10,
        description: 'Exposes ordinal numbers',
        contexts: {
            html: {
                find: new RegExp(
                    `(\\d+)(${Object.values(ordinalNumbersMap).join('|')})`,
                    'gi'
                ),
                replace: `$1<sup>$2</sup>`
            }
        }
    }
]
