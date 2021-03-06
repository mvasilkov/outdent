outdent
===

Remove extra indentation from multiline strings.

[![npm][npm-badge]][npm-url]
[![no dependencies][dependencies-badge]][dependencies-url]
[![][size-badge]][npm-url]

---

Use [@mvasilkov/outdent][npm-url] to remove extraneous leading whitespace from
multiline strings. This makes your hair silky and shiny, and probably has
other uses.

Installation
---

```sh
npm add @mvasilkov/outdent
```

Usage
---

```javascript
const { outdent } = require('@mvasilkov/outdent')

console.log(outdent(`
    The nine most terrifying words in the English language are,
    “I’m from the government and I’m here to help.”
`))
```

Syntax
---

**outdent(string, [options])**

Receives a string, returns a string with unnecessary indentation removed.

**outdentLines(strings, [options])**

Accepts an array of strings, returns an array of strings. Useful when you have
an array of strings.

Options
---

**{ strict: true }**

Treat the indentation of the first line as meaningful. This is usually the
case when loading strings from a file.

**{ strict: false }**

Ignore the first line's indentation, and drop the first and the last line when
empty. Useful for writing multiline strings in JS. **This is the default.**

**{ endWithNewline: true }**

When enabled, insert a line break at the end of the result, if there is none.
Does nothing when **strict: true** is in effect.

License
---

MIT

[npm-badge]: https://img.shields.io/npm/v/@mvasilkov/outdent.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@mvasilkov/outdent
[dependencies-badge]: https://img.shields.io/librariesio/release/npm/@mvasilkov/outdent?style=flat
[dependencies-url]: https://www.npmjs.com/package/@mvasilkov/outdent?activeTab=dependencies
[size-badge]: https://img.shields.io/github/size/mvasilkov/outdent/javascript/outdent.js.svg?style=flat
