'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Newlines
const CR_LF = '\r\n';
const LF = '\n';
const ENDING = RegExp(`${CR_LF}|${LF}`);
// Indentation
const WS = '[ \t]';
const NOT_WS = '[^ \t]';
const PREFIX = RegExp(`^${WS}*(?=${NOT_WS})`);
function indentLevel(a) {
    const b = a.match(PREFIX);
    if (b)
        return b[0].length;
    return Infinity; // Empty lines don't contribute to the indentation level
}
function clean(a) {
    const start = a[0] ? 0 : 1;
    const end = a[a.length - 1] ? a.length : -1;
    return a.slice(start, end);
}
function outdentLines(a, options) {
    var _a;
    if ((_a = options) === null || _a === void 0 ? void 0 : _a.strict) {
        const level = Math.min(...a.map(indentLevel));
        if (isFinite(level) && level != 0)
            return a.map(b => b.slice(level));
        return a;
    }
    if (a.length < 2)
        return clean(a);
    return clean([a[0], ...outdentLines(a.slice(1), Object.assign({}, options, { strict: true }))]);
}
exports.outdentLines = outdentLines;
function outdent(a, options) {
    return outdentLines(a.split(ENDING), options).join('\n');
}
exports.outdent = outdent;
