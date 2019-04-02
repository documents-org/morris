export interface RuleInterface {
    id: Number
    contexts: {
        [key: string]: RuleApplication;
    }
    description?: string
}

export interface RuleApplication {
    find?: RegExp
    replace: string | Function
}
