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
`;
