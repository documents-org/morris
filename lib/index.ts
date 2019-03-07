import { frenchRules } from "~/config/index";
import { RuleInterface } from "~/lib/RuleInterface";

export class Morris {
    private rules: RuleInterface[];
    private ruleMap: { [key: string]: Number };

    constructor(rules: RuleInterface[] | RuleInterface[][]) {
        if (Array.isArray(rules) && rules.length > 0) {
            if (Array.isArray(rules[0])) {
                this.rules = (rules as RuleInterface[][]).reduce(
                    (b, a) => b.concat(a),
                    [] as RuleInterface[]
                );
            } else {
                this.rules = rules as RuleInterface[];
            }
        }
        this.ruleMap = this.rules.reduce((map, rule) => {
            map[rule.id.toString(10)] = Object.keys(map).length;
            return map;
        }, {});
    }

    get getContexts(): string[] {
        return this.rules.reduce(
            (acc, rule) => {
                for (let context in rule.contexts) {
                    if (acc.indexOf(context) === -1) acc.push(context);
                }
                return acc;
            },
            [] as string[]
        );
    }

    get getRules(): RuleInterface[] {
        return this.rules;
    }

    apply(text: string, context: string = "brut", rule: Number): string {
        const ri = this.rules[this.ruleMap[rule.toString(10)].toString(10)];
        if (ri.contexts[context]) {
            let r = ri.contexts[context];
            if (typeof r.replace === "string") {
                return text.replace(r.find as RegExp, r.replace);
            } else {
                return r.replace(text);
            }
        }
        return text;
    }

    format(text: string, context: string = "brut"): string {
        return this.rules.reduce((str, rule) => {
            return this.apply(str, context, rule.id);
        }, text);
    }
}

const instance = new Morris(frenchRules);
export default instance;
