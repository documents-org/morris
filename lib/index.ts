import { frenchPlaintextRules } from '~/config/index'
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

export default new Morris(frenchPlaintextRules)
