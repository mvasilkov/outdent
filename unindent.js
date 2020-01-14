'use strict'

const ws = '[ \t]'
const notws = '[^ \t]'
const indent = RegExp(`^${ws}*(?=${notws})`)

function indentLevel(a) {
    const b = a.match(indent)
    if (b) return b.pop().length
    return Infinity // Empty lines don't contribute to the indentation level
}

export default function unindent(code) {
    const level = Math.min(...code.map(line => indentLevel(line)))
    if (isFinite(level) && level != 0) {
        const x = RegExp(`^${ws}{${level}}`)
        return code.map(line => line.replace(x, ''))
    }
    return code
}
