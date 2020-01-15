'use strict'

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

function outdentLines() {
}

function outdent() {
}
