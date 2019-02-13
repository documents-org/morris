import { rules as defaultRules } from '~/config/index'
import { RuleInterface } from '~/lib/RuleInterface'

export class Morris {
    private rules: RuleInterface[]

    constructor(rules: RuleInterface[]) {
        this.rules = rules
    }

    format(text: string): string {
        return this.rules.reduce((str, rule) => {
            return str.replace(rule.find, rule.replace)
        }, text)
    }
}

export default new Morris(defaultRules)
