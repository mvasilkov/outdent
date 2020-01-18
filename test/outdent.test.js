const assert = require('assert').strict
const { describe, it } = require('smoltest/adapt/mocha')(exports)

const { outdent } = require('..')

const expect = a => ({ toEqual(b) { assert.strictEqual(a, b) } })

describe('outdent() function', () => {
  it('should work with tabs', () => {
    expect(
      outdent(`Line #1
			Line #2
			Line #3`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(`Line #${1}
			Line #${2}
			Line #${3}`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(`${1}. line #${1}
			${2}. line #${2}
			${3}. line`),
    ).toEqual('1. line #1\n2. line #2\n3. line')
  })

  it('should work with spaces', () => {
    expect(
      outdent(`Line #1
            Line #2
            Line #3`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(`Line #${1}
            Line #${2}
            Line #${3}`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`),
    ).toEqual('1. line #1\n2. line #2\n3. line')
  })

  it('should remove leading/trailing line break', () => {
    expect(
      outdent(`
			Line #1
			Line #2
			Line #3
			`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(`
			Line #${1}
			Line #${2}
			Line #${3}
			`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`),
    ).toEqual('1. line #1\n2. line #2\n3. line')
  })

  it('should not remove more than one leading/trailing line break', () => {
    expect(
      outdent(`

			Line #1
			Line #2
			Line #3

			`),
    ).toEqual('\nLine #1\nLine #2\nLine #3\n')

    expect(
      outdent(`

			Line #${1}
			Line #${2}
			Line #${3}

			`),
    ).toEqual('\nLine #1\nLine #2\nLine #3\n')

    expect(
      outdent(`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`),
    ).toEqual('\n1. line #1\n2. line #2\n3. line\n')
  })

  it('should remove the same number of tabs/spaces from each line', () => {
    expect(
      outdent(`
			Line #1
				Line #2
					Line #3
			`),
    ).toEqual('Line #1\n\tLine #2\n\t\tLine #3')

    expect(
      outdent(`
			Line #${1}
				Line #${2}
					Line #${3}
			`),
    ).toEqual('Line #1\n\tLine #2\n\t\tLine #3')

    expect(
      outdent(`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`),
    ).toEqual('1. line #1\n\t2. line #2\n\t\t3. line')
  })

  it("should ignore the last line if it doesn't contain anything else than whitespace", () => {
    expect(
      (() => {
        return outdent(`
					Line #1
					Line #2
					Line #3
				`)
      })(),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      (() => {
        return outdent(`
					Line #${1}
					Line #${2}
					Line #${3}
				`)
      })(),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      (() => {
        return outdent(`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`)
      })(),
    ).toEqual('1. line #1\n2. line #2\n3. line')
  })
})
