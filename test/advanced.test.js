const assert = require('assert').strict

const { outdent, outdentLines } = require('..')

exports.testNil = function testNil() {
    assert.strictEqual(outdent(`
    `), '')
    {
        {
            assert.strictEqual(outdent(`
            `), '')
        }
    }

    assert.strictEqual(outdent(`

    `), '')
    assert.strictEqual(outdent(`


    `), '\n')

    assert.strictEqual(outdent(`\t
    Hello
    `), 'Hello')

    assert.strictEqual(outdent(`
    Hello
    \t`), 'Hello')
}

exports.testEndWithNewline = function testEndWithNewline() {
    assert.strictEqual(outdent(`Hello`, { endWithNewline: true }), 'Hello\n')
    assert.strictEqual(outdent(`Hello
    `, { endWithNewline: true }), 'Hello\n')
    assert.strictEqual(outdent(`
    Hello
    `, { endWithNewline: true }), 'Hello\n')
    assert.strictEqual(outdent(`
    Hello

    `, { endWithNewline: true }), 'Hello\n')
    assert.strictEqual(outdent(`
    `, { endWithNewline: true }), '\n')
    assert.strictEqual(outdent(`
    Line #1
      Line #2
        Line #3
    `, { endWithNewline: true }), 'Line #1\n  Line #2\n    Line #3\n')
}

exports.testStrict = function testStrict() {
    const indent = ' '.repeat(4)

    assert.strictEqual(outdent(`Hello`, { strict: true }), 'Hello')
    assert.strictEqual(outdent(`Hello
    `, { strict: true }), `Hello\n${indent}`)
    assert.strictEqual(outdent(`
    Hello
    `, { strict: true }), '\nHello\n')
    assert.strictEqual(outdent(`
    Hello

    `, { strict: true }), '\nHello\n\n')
    assert.strictEqual(outdent(`
    `, { strict: true }), '\n')
    assert.strictEqual(outdent(`
    Line #1
      Line #2
        Line #3
    `, { strict: true }), '\nLine #1\n  Line #2\n    Line #3\n')
}

exports.testOverflow = function testOverflow() {
    // Test for 'Maximum call stack size exceeded'
    const a = Array(300000).fill('')
    outdentLines(a, { strict: true })
}
