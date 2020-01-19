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
function clean(a, endWithNewline) {
    const start = a[0] ? 0 : 1;
    const end = a[a.length - 1] ? a.length : -1;
    const result = a.slice(start, end);
    if (endWithNewline) {
        if (!result.length)
            return ['', ''];
        result.push('');
    }
    return result;
}
function outdentLines(a, options) {
    var _a, _b, _c;
    if ((_a = options) === null || _a === void 0 ? void 0 : _a.strict) {
        const level = Math.min(...a.map(indentLevel));
        if (!level)
            return a;
        if (!isFinite(level))
            return Array(a.length).fill('');
        return a.map(b => b.slice(level));
    }
    if (a.length < 2)
        return clean(a, (_b = options) === null || _b === void 0 ? void 0 : _b.endWithNewline);
    const result = [a[0], ...outdentLines(a.slice(1), Object.assign({}, options, { strict: true }))];
    return clean(result, (_c = options) === null || _c === void 0 ? void 0 : _c.endWithNewline);
}
exports.outdentLines = outdentLines;
function outdent(a, options) {
    return outdentLines(a.split(ENDING), options).join('\n');
}
exports.outdent = outdent;
