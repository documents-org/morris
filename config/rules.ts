import { RuleInterface } from '~/lib/RuleInterface'

const rules: RuleInterface[] = [
{
    description: 'Removes spaces before simple punctuations',
    find: /(\w)\s+([,\.])/gi,
    replace: "$1$2",
},
{
    description: 'Ensures a space after a simple punctuation',
    find: /(\w[,\.])\s*(\w)/gi,
    replace: "$1 $2",
},
]

export default rules
