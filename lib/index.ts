import { frenchHtmlAwareRules, frenchPlaintextRules } from '~/config/index'
import { RuleInterface } from '~/lib/RuleInterface'

export class Morris {
    private rules: RuleInterface[]

    constructor(rules: RuleInterface[] | RuleInterface[][]) {
        if (Array.isArray(rules) && rules.length > 0) {
            if (Array.isArray(rules[0])) {
                this.rules = (rules as RuleInterface[][]).reduce((b, a) => b.concat(a), [] as RuleInterface[])
            } else {
                this.rules = rules as RuleInterface[]
            }
        }
    }
    get getRules(): RuleInterface[] {
        return this.rules
    }

    format(text: string, optionalStepCallback: (rule: RuleInterface, result: string) => void = (a, b) => {}): string {
        return this.rules.reduce((str, rule) => {
            let result
            if (typeof rule.replace === 'string') {
                result = str.replace(rule.find as RegExp, rule.replace)
            } else {
                result = rule.replace(str)
            }
            optionalStepCallback(rule, result)
            return result
        }, text)
    }
}

export class MorrisTest {
    public static testPlainText() {
        const m = new Morris(frenchPlaintextRules)
        const input = `Il n\'est pas évident , de "régler" le texte:en effet , les règles de ponctuation sont complexes!Ah ,les ellipses...`
        const output = `Il n\'est pas évident, de «\u00A0régler\u00A0» le texte\u00A0: en effet, les règles de ponctuation sont complexes\u00A0! Ah, les ellipses…`
        const formatted = m.format(input, (rule, ruleResult) => console.log(rule.description + ' : ' + ruleResult))
        if (formatted !== output) {
            throw new Error('Morris search/replace rules failed.')
        }
    }

    public static testHtmlAware() {
        const m = new Morris([frenchPlaintextRules, frenchHtmlAwareRules])
        const input = `Il n'est pas évident , de "régler" le texte:en effet , les règles de ponctuation sont complexes!Ah ,les ellipses... C'est la 123eme fois qu'on en parle!`
        const output = `Il n'est pas évident, de «\u00A0régler\u00A0» le texte\u00A0: en effet, les règles de ponctuation sont complexes\u00A0! Ah, les ellipses… C'est la 123<sup>ème</sup> fois qu'on en parle\u00A0!`
        const formatted = m.format(input, (rule, ruleResult) => console.log(rule.description + ' : ' + ruleResult))
        if (formatted !== output) {
            throw new Error('Morris search/replace rules failed.')
        }
    }
}

export default new Morris(frenchPlaintextRules)
