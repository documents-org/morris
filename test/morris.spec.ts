import { frenchRules } from "~/config/index";
import Morris from "~/lib/index";

describe("Morris class", () => {
    it("it is constructed with default formatting rules", () => {
        frenchRules.forEach(rule => {
            expect(Morris.getRules).toContain(rule);
        });
    });
});
