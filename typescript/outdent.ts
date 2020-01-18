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

export function outdentLines(a: string[], options: IOptions) {
}

export function outdent(a: string, options: IOptions) {
}
