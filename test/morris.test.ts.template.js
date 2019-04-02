const r = require('fs').readFileSync;
const p = require('path');
const knownGoodText = r(p.join(__dirname, 'texts/texte_ok.txt'));
const knownBadText = r(p.join(__dirname, 'texts/texte_mauvais.txt'));

const genContext = (rule, test) => `it('in the context of ${test.type}', () => {
        const formatted = mo.apply(\`${test.test.trim()}\`, \`${test.type}\`, ${
  rule.id
});
        expect(formatted).toEqual(\`${test.resultat.trim()}\`);
  });`;

const genRule = rule => `describe('${rule.description_en}', () => {
   ${rule.tests.map(test => genContext(rule, test)).join("\n")}
});`;

module.exports = rules => `
import { frenchRules } from '~/config/index'
import { Morris } from '~/lib/index'

const mo = new Morris(frenchRules);

${rules.map(genRule).join("\n")}

describe('morris', () => {
it('formats a whole text correctly', () => {
    const formatted = mo.format(\`${knownBadText}\`, 'brut');
    expect(formatted).toEqual(\`${knownGoodText}\`);
});
});
`;
