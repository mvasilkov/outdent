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
function isEmpty(a) {
    return !a || !isFinite(indentLevel(a));
}
function sharedIndent(a) {
    let result = Infinity;
    for (let n = 0; n < a.length; ++n) {
        const level = indentLevel(a[n]);
        if (level < result)
            result = level;
    }
    return result;
}
function clean(a, endWithNewline) {
    const start = isEmpty(a[0]) ? 1 : 0;
    const end = isEmpty(a[a.length - 1]) ? 1 : 0;
    const result = a.slice(start, a.length - end);
    if (endWithNewline) {
        if (!result.length)
            return ['', ''];
        if (result[result.length - 1] != '')
            result.push('');
    }
    return result;
}
function outdentLines(a, options) {
    if (options === null || options === void 0 ? void 0 : options.strict) {
        const level = sharedIndent(a);
        if (!level)
            return a;
        if (!isFinite(level))
            return Array(a.length).fill('');
        return a.map(b => b.slice(level));
    }
    if (a.length < 2)
        return clean(a, options === null || options === void 0 ? void 0 : options.endWithNewline);
    const result = [a[0], ...outdentLines(a.slice(1), Object.assign({}, options, { strict: true }))];
    return clean(result, options === null || options === void 0 ? void 0 : options.endWithNewline);
}
exports.outdentLines = outdentLines;
function outdent(a, options) {
    return outdentLines(a.split(ENDING), options).join('\n');
}
exports.outdent = outdent;
