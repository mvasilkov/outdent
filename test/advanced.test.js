const assert = require('assert').strict

const { outdent } = require('..')

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
}

exports.testEndWithNewline = function testEndWithNewline() {
    assert.strictEqual(outdent('Hello', { endWithNewline: true }), 'Hello\n')
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
