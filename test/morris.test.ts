import { frenchRules } from "~/config/index";
import { Morris } from "~/lib/index";

const mo = new Morris(frenchRules);

describe("Replaces three dots with an ellipsis", () => {});
describe("Replaces quotes with french quotes", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`"régler"`, `brut`, 2);
        expect(formatted).toEqual(`«régler»`);
    });
});
describe("Ensures non-breaking space after opening quote", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`«régler»`, `brut`, 3);
        expect(formatted).toEqual(`«\u00A0régler»`);
    });
});
describe("Ensures non-breaking space after closing quote", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`«régler»`, `brut`, 4);
        expect(formatted).toEqual(`«régler\u00A0»`);
    });
});
describe("Removes spaces before simple punctuations", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`bonjour     , il fait beau`, `brut`, 5);
        expect(formatted).toEqual(`bonjour, il fait beau`);
    });
});
describe("Ensures a space after a simple or double punctuation", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`bonjour,il fait beau`, `brut`, 6);
        expect(formatted).toEqual(`bonjour, il fait beau`);
    });
});
describe("Ensures a single non-breaking space before a double punctuation", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`il est vrai:nous sommes verts`, `brut`, 7);
        expect(formatted).toEqual(`il est vrai\u00A0:nous sommes verts`);
    });
});
describe("Ensures a single space after a colon or semicolon", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`il est vrai:nous sommes verts`, `brut`, 8);
        expect(formatted).toEqual(`il est vrai: nous sommes verts`);
    });
});
describe("Normalizes ordinal numbers", () => {
    it("in the context of brut", () => {
        const formatted = mo.apply(`la 1ere`, `brut`, 9);
        expect(formatted).toEqual(`la 1re`);
    });
});
describe("Ordinal numbers are exposed", () => {
    it("in the context of html", () => {
        const formatted = mo.apply(`les 2èmes`, `html`, 10);
        expect(formatted).toEqual(`les 2<sup>èmes</sup>`);
    });
});
