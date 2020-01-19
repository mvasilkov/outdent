interface IOptions {
    strict?: boolean;
    endWithNewline?: boolean;
    tabSize?: number;
}
export declare function outdentLines(a: string[], options?: IOptions): string[];
export declare function outdent(a: string, options?: IOptions): string;
export {};
