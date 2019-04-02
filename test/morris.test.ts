
import { frenchRules } from '~/config/index'
import { Morris } from '~/lib/index'

const mo = new Morris(frenchRules);

describe('Replaces three dots with an ellipsis', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`bonjour... il fait beau`, `brut`, 1);
        expect(formatted).toEqual(`bonjour\u2026 il fait beau`);
  });
});
describe('Replaces quotes with french quotes', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`"régler"`, `brut`, 2);
        expect(formatted).toEqual(`«régler»`);
  });
});
describe('Replaces smart quotes with french quotes', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`“salut”`, `brut`, 3);
        expect(formatted).toEqual(`«salut»`);
  });
});
describe('Ensures non-breaking space after opening quote', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`«régler»`, `brut`, 4);
        expect(formatted).toEqual(`«\u00A0régler»`);
  });
});
describe('Ensures non-breaking space after closing quote', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`«régler»`, `brut`, 5);
        expect(formatted).toEqual(`«régler\u00A0»`);
  });
});
describe('Search multiple spaces in a row to reduce them to a single', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`bonjour     , il   fait beau`, `brut`, 6);
        expect(formatted).toEqual(`bonjour , il fait beau`);
  });
});
describe('Removes spaces before simple punctuations', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`bonjour , il fait beau`, `brut`, 7);
        expect(formatted).toEqual(`bonjour, il fait beau`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`(bonjour ) il fait beau`, `brut`, 7);
        expect(formatted).toEqual(`(bonjour) il fait beau`);
  });
});
describe('Ensures a space after a simple or double punctuation', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`bonjour,il fait beau`, `brut`, 8);
        expect(formatted).toEqual(`bonjour, il fait beau`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`il est vrai:nous sommes verts`, `brut`, 8);
        expect(formatted).toEqual(`il est vrai: nous sommes verts`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`est-il vrai?nous sommes verts`, `brut`, 8);
        expect(formatted).toEqual(`est-il vrai? nous sommes verts`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`dans le cas d'un caractère spécial),ça marche aussi`, `brut`, 8);
        expect(formatted).toEqual(`dans le cas d'un caractère spécial), ça marche aussi`);
  });
});
describe('Ensures a single non-breaking space before a double punctuation', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`il est vrai:nous sommes verts`, `brut`, 9);
        expect(formatted).toEqual(`il est vrai\u202F:nous sommes verts`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`est-il vrai?nous sommes verts`, `brut`, 9);
        expect(formatted).toEqual(`est-il vrai\u202F?nous sommes verts`);
  });
});
describe('Normalizes ordinal numbers', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`la 1ere`, `brut`, 10);
        expect(formatted).toEqual(`la 1re`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`la 2eme`, `brut`, 10);
        expect(formatted).toEqual(`la 2e`);
  });
});
describe('Normalizes ordinal numbers plural', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`les 2emes`, `brut`, 11);
        expect(formatted).toEqual(`les 2es`);
  });
});
describe('Ordinal numbers are exposed', () => {
   it('in the context of html', () => {
        const formatted = mo.apply(`les 2es`, `html`, 12);
        expect(formatted).toEqual(`les 2<sup>es</sup>`);
  });
});
describe('Modify the suites of letters Mr and Mme by exposed letters after the M', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`Mme de Bovary
Mr le Visconsul`, `brut`, 13);
        expect(formatted).toEqual(`Mme de Bovary
Mr le Visconsul`);
  });
it('in the context of html', () => {
        const formatted = mo.apply(`Mme de Bovary
Mr le Visconsul`, `html`, 13);
        expect(formatted).toEqual(`M<sup>me</sup> de Bovary
M<sup>r</sup> le Visconsul`);
  });
});
describe('Change the writing of the centuries', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`XVIIIeme siècle`, `brut`, 14);
        expect(formatted).toEqual(`XVIIIe siècle`);
  });
it('in the context of html', () => {
        const formatted = mo.apply(`XVIIIe siècle`, `html`, 14);
        expect(formatted).toEqual(`XVIII<sup>e</sup> siècle`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`XVIIIème siècle`, `brut`, 14);
        expect(formatted).toEqual(`XVIIIe siècle`);
  });
it('in the context of brut', () => {
        const formatted = mo.apply(`XVIIIe siècle`, `brut`, 14);
        expect(formatted).toEqual(`XVIIIe siècle`);
  });
});
describe('A word of less than two letters at the end of the line is attached to the following word', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`le souvenir du
beau temps`, `brut`, 15);
        expect(formatted).toEqual(`le souvenir du\u00A0beau temps`);
  });
});
describe('A word of less than two capital letters at the end of the line is attached to the previous word', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`le CROA, les 
MA et les institutions`, `brut`, 16);
        expect(formatted).toEqual(`le CROA, les\u00A0MA et les institutions`);
  });
});
describe('A single word at the end of the paragraph is attached to the previous word', () => {
   it('in the context of brut', () => {
        const formatted = mo.apply(`le souvenir du beau 
temps`, `brut`, 17);
        expect(formatted).toEqual(`le souvenir du beau\u00A0temps`);
  });
});

describe('morris', () => {
it('formats a whole text correctly', () => {
    const formatted = mo.format(`bonjour!
`, 'brut');
    expect(formatted).toEqual(`bonjour !
`);
});
});
