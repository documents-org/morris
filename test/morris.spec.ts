import { frenchPlaintextRules } from '~/config/index'
import Morris from '~/lib/index'

describe('Morris class', () => {
    it('it is constructed with default formatting rules', () => {
        frenchPlaintextRules.forEach((rule) => {
            expect(Morris.getRules).toContain(rule)
        })
    })
})
