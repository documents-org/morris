import { frenchHtmlAwareRules, frenchPlaintextRules } from '~/config/index'
import { Morris } from '~/lib/index'

describe('Morris french plaintext rules', () => {
    it('produces the expected result', () => {
        const m = new Morris(frenchPlaintextRules)
        const input = `Il n\'est pas évident , de "régler" le texte:en effet , les règles de ponctuation sont complexes!Ah ,les ellipses...`
        const output = `Il n\'est pas évident, de «\u00A0régler\u00A0» le texte\u00A0: en effet, les règles de ponctuation sont complexes\u00A0! Ah, les ellipses…`
        const formatted = m.format(input, (rule, ruleResult) => console.log(rule.description + ' : ' + ruleResult))
        expect(formatted).toEqual(output)
    })
})

describe('Morris html aware rules', () => {
    it('produces the expected result', () => {
        const m = new Morris([frenchPlaintextRules, frenchHtmlAwareRules])
        const input = `Il n'est pas évident , de "régler" le texte:en effet , les règles de ponctuation sont complexes!Ah ,les ellipses... C'est la 123eme fois qu'on en parle!`
        const output = `Il n'est pas évident, de «\u00A0régler\u00A0» le texte\u00A0: en effet, les règles de ponctuation sont complexes\u00A0! Ah, les ellipses… C'est la 123<sup>ème</sup> fois qu'on en parle\u00A0!`
        const formatted = m.format(input, (rule, ruleResult) => console.log(rule.description + ' : ' + ruleResult))
        expect(formatted).toEqual(output)
    })
})
