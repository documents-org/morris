export interface RuleInterface {
    id: number
    contexts: {
        [key: string]: RuleApplication;
    }
    description?: string
}

export interface RuleApplication {
    find?: RegExp
    replace: string | Function
}
