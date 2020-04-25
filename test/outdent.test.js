'use strict'

/* Tests based on https://www.npmjs.com/package/ts-dedent */

const assert = require('assert').strict
const { describe, it, xdescribe } = require('smoltest')(exports)

const { outdent } = require('..')

const expect = a => ({ toEqual(b) { assert.strictEqual(a, b) } })

function tag(strings, ...values) {
  let string = strings[0]

  values.forEach((value, i) => {
    string += 2 * value + strings[i + 1]
  })

  return string
}

xdescribe('outdent tag', () => {
  it('should work with empty string', () => {
    expect(outdent``).toEqual('')
  })

  it('should work with tabs', () => {
    expect(outdent`Line #1
			Line #2
			Line #3`).toEqual('Line #1\nLine #2\nLine #3')

    expect(outdent`Line #${1}
			Line #${2}
			Line #${3}`).toEqual('Line #1\nLine #2\nLine #3')

    expect(outdent`${1}. line #${1}
			${2}. line #${2}
			${3}. line`).toEqual('1. line #1\n2. line #2\n3. line')
  })

  it('should work with spaces', () => {
    expect(outdent`Line #1
            Line #2
            Line #3`).toEqual('Line #1\nLine #2\nLine #3')

    expect(outdent`Line #${1}
            Line #${2}
            Line #${3}`).toEqual('Line #1\nLine #2\nLine #3')

    expect(outdent`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`).toEqual('1. line #1\n2. line #2\n3. line')
  })

  it('should remove leading/trailing line break', () => {
    expect(
      outdent`
			Line #1
			Line #2
			Line #3
			`,
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent`
			Line #${1}
			Line #${2}
			Line #${3}
			`,
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`,
    ).toEqual('1. line #1\n2. line #2\n3. line')
  })

  it('should not remove more than one leading/trailing line break', () => {
    expect(
      outdent`

			Line #1
			Line #2
			Line #3

			`,
    ).toEqual('\nLine #1\nLine #2\nLine #3\n')

    expect(
      outdent`

			Line #${1}
			Line #${2}
			Line #${3}

			`,
    ).toEqual('\nLine #1\nLine #2\nLine #3\n')

    expect(
      outdent`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`,
    ).toEqual('\n1. line #1\n2. line #2\n3. line\n')
  })

  it('should remove the same number of tabs/spaces from each line', () => {
    expect(
      outdent`
			Line #1
				Line #2
					Line #3
			`,
    ).toEqual('Line #1\n\tLine #2\n\t\tLine #3')

    expect(
      outdent`
			Line #${1}
				Line #${2}
					Line #${3}
			`,
    ).toEqual('Line #1\n\tLine #2\n\t\tLine #3')

    expect(
      outdent`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`,
    ).toEqual('1. line #1\n\t2. line #2\n\t\t3. line')
  })

  it("should ignore the last line if it doesn't contain anything else than whitespace", () => {
    expect(
      (() => {
        return outdent`
					Line #1
					Line #2
					Line #3
				`
      })(),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      (() => {
        return outdent`
					Line #${1}
					Line #${2}
					Line #${3}
				`
      })(),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      (() => {
        return outdent`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`
      })(),
    ).toEqual('1. line #1\n2. line #2\n3. line')
  })
})

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

describe('outdent() function with custom tag', () => {
  it('should work with tabs', () => {
    expect(
      outdent(tag`Line #1
			Line #2
			Line #3`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(tag`Line #${1}
			Line #${2}
			Line #${3}`),
    ).toEqual('Line #2\nLine #4\nLine #6')

    expect(
      outdent(tag`${1}. line #${1}
			${2}. line #${2}
			${3}. line`),
    ).toEqual('2. line #2\n4. line #4\n6. line')
  })

  it('should work with spaces', () => {
    expect(
      outdent(tag`Line #1
            Line #2
            Line #3`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(tag`Line #${1}
            Line #${2}
            Line #${3}`),
    ).toEqual('Line #2\nLine #4\nLine #6')

    expect(
      outdent(tag`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`),
    ).toEqual('2. line #2\n4. line #4\n6. line')
  })

  it('should remove leading/trailing line break', () => {
    expect(
      outdent(tag`
			Line #1
			Line #2
			Line #3
			`),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      outdent(tag`
			Line #${1}
			Line #${2}
			Line #${3}
			`),
    ).toEqual('Line #2\nLine #4\nLine #6')

    expect(
      outdent(tag`
			${1}. line #${1}
			${2}. line #${2}
			${3}. line
			`),
    ).toEqual('2. line #2\n4. line #4\n6. line')
  })

  it('should not remove more than one leading/trailing line break', () => {
    expect(
      outdent(tag`

			Line #1
			Line #2
			Line #3

			`),
    ).toEqual('\nLine #1\nLine #2\nLine #3\n')

    expect(
      outdent(tag`

			Line #${1}
			Line #${2}
			Line #${3}

			`),
    ).toEqual('\nLine #2\nLine #4\nLine #6\n')

    expect(
      outdent(tag`

			${1}. line #${1}
			${2}. line #${2}
			${3}. line

			`),
    ).toEqual('\n2. line #2\n4. line #4\n6. line\n')
  })

  it('should remove the same number of tabs/spaces from each line', () => {
    expect(
      outdent(tag`
			Line #1
				Line #2
					Line #3
			`),
    ).toEqual('Line #1\n\tLine #2\n\t\tLine #3')

    expect(
      outdent(tag`
			Line #${1}
				Line #${2}
					Line #${3}
			`),
    ).toEqual('Line #2\n\tLine #4\n\t\tLine #6')

    expect(
      outdent(tag`
			${1}. line #${1}
				${2}. line #${2}
					${3}. line
			`),
    ).toEqual('2. line #2\n\t4. line #4\n\t\t6. line')
  })

  it("should ignore the last line if it doesn't contain anything else than whitespace", () => {
    expect(
      (() => {
        return outdent(tag`
					Line #1
					Line #2
					Line #3
				`)
      })(),
    ).toEqual('Line #1\nLine #2\nLine #3')

    expect(
      (() => {
        return outdent(tag`
					Line #${1}
					Line #${2}
					Line #${3}
				`)
      })(),
    ).toEqual('Line #2\nLine #4\nLine #6')

    expect(
      (() => {
        return outdent(tag`
					${1}. line #${1}
					${2}. line #${2}
					${3}. line
				`)
      })(),
    ).toEqual('2. line #2\n4. line #4\n6. line')
  })
})
