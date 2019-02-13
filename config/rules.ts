import { RuleInterface } from '~/lib/RuleInterface'

import { LIST } from '~/config/characters'

const rules: RuleInterface[] = [
    {
        description: 'Replaces three dots with an ellipsis',
        find: /\.{3}/gi,
        replace: `${LIST.ELLIPSIS}`
    },
    {
        description: 'Replaces quotes with french quotes',
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
    },
    {
        description: 'Ensures non-breaking space after opening quote',
        find: new RegExp(`${LIST.LQUOTE}\s*`),
        replace: `${LIST.LQUOTE}${LIST.SPACES.NO_BREAK_SPACE}`
    },
    {
        description: 'Ensures non-breaking space after closing quote',
        find: new RegExp(`\s*${LIST.RQUOTE}`),
        replace: `${LIST.SPACES.NO_BREAK_SPACE}${LIST.RQUOTE}`
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
        replace: `${LIST.SPACES.NO_BREAK_SPACE}$1`
    },
    {
        description: 'Ensures a single space after a colon or semicolon',
        find: /([:;])\s*/gi,
        replace: `$1${LIST.SPACES.SPACE}`
    }
]

export default rules
