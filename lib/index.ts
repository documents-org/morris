import { rules as defaultRules } from '~/config/index'
import { RuleInterface } from '~/lib/RuleInterface'

export class Morris {
    private rules: RuleInterface[]

    constructor(rules: RuleInterface[]) {
        this.rules = rules
    }

    format(text: string): string {
        return this.rules.reduce((str, rule) => {
            if (typeof rule.replace === 'string') {
                return str.replace(rule.find as RegExp, rule.replace)
            }
            return rule.replace(str)
        }, text)
    }

    public static test() {
        const m = new Morris(defaultRules)
        const input = `Il n\'est pas évident , de "régler" le texte:en effet , les règles de ponctuation sont complexes!Ah ,les ellipses...`
        console.log(input)
        const output = `Il n\'est pas évident, de «\u00A0régler\u00A0» le texte\u00A0: en effet, les règles de ponctuation sont complexes\u00A0! Ah, les ellipses…`
        if (m.format(input) !== output) {
            console.log(output)
            throw new Error('Morris search/replace rules failed.')
        }
        console.log('Morris succeeded.')
    }
}

export default new Morris(defaultRules)
