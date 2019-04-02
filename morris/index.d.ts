// Type definitions for Morris 0.1.7
// Project: Morris
// Definitions by: Documents.design https://github.com/documents-design

import { RuleInterface } from '../lib/RuleInterface'

export = Morris

/*~ Write your module's methods and properties in this class */
declare class Morris {
    constructor(rules: RuleInterface[] | RuleInterface[][]);
    getContexts(): string[]
    getRules(): RuleInterface[]
    apply(text: string, context: string, rule: Number): string
    format(text: string, context: string, callback: (text: string) => any): string
    asyncFormat(text: string, context: string, callback: (text: string) => Promise<any>): Promise<string>
}
