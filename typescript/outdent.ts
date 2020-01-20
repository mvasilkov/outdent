'use strict'

interface IOptions {
    strict?: boolean
    endWithNewline?: boolean
    tabSize?: number
}

// Newlines
const CR_LF = '\r\n'
const LF = '\n'
const ENDING = RegExp(`${CR_LF}|${LF}`)

// Indentation
const WS = '[ \t]'
const NOT_WS = '[^ \t]'
const PREFIX = RegExp(`^${WS}*(?=${NOT_WS})`)

function indentLevel(a: string): number {
    const b = a.match(PREFIX)
    if (b) return b[0].length
    return Infinity // Empty lines don't contribute to the indentation level
}

function isEmpty(a: string): boolean {
    return !a || !isFinite(indentLevel(a))
}

function sharedIndent(a: string[]): number {
    let result = Infinity
    for (let n = 0; n < a.length; ++n) {
        const level = indentLevel(a[n])
        if (level < result) result = level
    }
    return result
}

function clean(a: string[], endWithNewline?: boolean): string[] {
    const start = isEmpty(a[0]) ? 1 : 0
    const end = isEmpty(a[a.length - 1]) ? 1 : 0
    const result = a.slice(start, a.length - end)
    if (endWithNewline) {
        if (!result.length) return ['', '']
        if (result[result.length - 1] != '') result.push('')
    }
    return result
}

export function outdentLines(a: string[], options?: IOptions): string[] {
    if (options?.strict) {
        const level = sharedIndent(a)
        if (!level) return a
        if (!isFinite(level)) return Array(a.length).fill('')
        return a.map(b => b.slice(level))
    }
    if (a.length < 2) return clean(a, options?.endWithNewline)
    const result = [a[0], ...outdentLines(a.slice(1),
        Object.assign({}, options, { strict: true }))]
    return clean(result, options?.endWithNewline)
}

export function outdent(a: string, options?: IOptions): string {
    return outdentLines(a.split(ENDING), options).join('\n')
}
