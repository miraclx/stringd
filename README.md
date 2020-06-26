# STRING-D

> NodeJS String Variable Parser

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Create parsable strings using template formats by argument mapping.

Similar to [printf][printf] but supports nesting and exclusive recursions

[![NPM][npm-image-url]][npm-url]

## Installing

Via [NPM][npm]:

``` bash
npm install stringd
```

## Usage

``` javascript
// Node CommonJS
const stringd = require('stringd');
// Or ES6
import stringd from 'stringd';
```

``` html
<!-- Or in the Browser -->
<script src="stringd/dist/index.js"></script>
```

## Examples

``` javascript
stringd('Hello :{name}', {name: 'World'});
// Hello World

stringd(':{last}, :{first} :{last}', {last: 'Doe', first: 'John'});
// Doe, John Doe
```

## API

### stringd(template, object[, ignore])

* `tmp`: &lt;[string][]&gt;
* `props`: &lt;[object][]&gt;
* `ignore`: &lt;[string][][]&gt;
* Returns: &lt;[string][]&gt;

Parse the `tmp` string, replacing variable sections with flexibly defined values within the `props` object
String tags within the `ignore` array are skipped in the process. (used specifically to avoid repetition/recursion)

## Features

### Multi parse methods

Whichever is more comfortable for you would work just fine

``` javascript
stringd('Hello :{name}', {name: 'World'});  // Hello World
stringd('Hello %{name}', {name: 'World'});  // Hello World
stringd('Hello ${name}', {name: 'World'});  // Hello World
stringd('Hello :{name%}', {name: 'World'}); // Hello World
stringd('Hello %{name%}', {name: 'World'}); // Hello World
stringd('Hello ${name%}', {name: 'World'}); // Hello World
```

### Nesting

``` javascript
assert.equal('John Davis', stringd(':{name}', {
  name: ':{first} :{last}',
  last: 'Davis',
  first: 'John',
}));
```

### Extended, Variable Passing

``` javascript
assert.equal(
  'Age Difference = [32 + 25]  = [57]',
  stringd(
    stringd('Age Difference = [:{age1} + :{age2}]  = [:{add(:{age1}, :{age2})}]', {
      age1: 32,
      age2: 25,
    }),
    {add: (_, data) => data.args.reduce((a, v) => a + +v.trim(), 0)},
  ),
);
```

### Functional Evaluation

``` javascript
assert.equal(
  'Hello John Davis, you have contributed $585 in the span of 13 months',
  stringd(':{name:parsed}', {
    name: ':{first} :{last}',
    last: 'Davis',
    first: 'John',
    greeting: 'Hello :{name}',
    months: 13,
    duration: ':{months} months',
    contribution: 45,
    // Functions get the entire template object as an argument
    // so you can do advanced processing
    cash: ({contribution, months}) => contribution * months,
    'name:parsed': `:{greeting}, you have contributed $:{cash} in the span of :{duration}`,
  })
);
```

### Forward Padding, Space

``` javascript
assert.equal('   10', stringd(':5{val}', {val: 10}));
```

### End Padding, Space

``` javascript
assert.equal('10   ', stringd(':-5{val}', {val: 10}));
```

### Forward Padding, Zero

``` javascript
assert.equal('00010', stringd(':05{val}', {val: 10}));
```

### End Padding, Zero

``` javascript
assert.equal('10000', stringd(':-05{val}', {val: 10}));
```

### Complex Nesting with exclusive recursion

Recursive nesting is unparsed at the second level, otherwise, it continues until its done parsing the entire string

``` javascript
assert.equal(
  'James:{name} :{name} :{data} :{data} :{all} :{name} :{data}Jack James:{data}Jack James:{data}Jack :{misc} :{data} :{all} James:{data}Jack :{misc}',
  stringd(':{name} :{misc}', {
    name: ':{first}:{data}:{last}',
    first: 'James',
    last: 'Jack',
    misc: ':{data}',
    data: ':{name} :{all}',
    all: ':{name} :{misc} :{data} :{all} :{name} :{misc}',
  })
);
```

### Iterative processing

``` javascript
assert.equal('      2364', stringd(stringd('::{pad}{price}', {pad: 10}), {price: 2364}))
```

### Precedence

`stringd` replaces keys in order precedence. Keys that appear first are replaced first

``` javascript
stringd( // str key appears first
  stringd(':{tro:{str}}', {str: 'y', 'tro:{str}': ':{tron}'}),
  { tron: 'Movie', troy: 'Dude' }
); // Dude

stringd( // str key appears later
  stringd(':{tro:{str}}', {'tro:{str}': ':{tron}', str: 'y'}),
  { tron: 'Movie', troy: 'Dude' }
); // Movie
```

## Development

### Building

Feel free to clone, use in adherance to the [license](#license) and perhaps send pull requests

``` bash
git clone https://github.com/miraclx/stringd.git
cd stringd
npm install
# hack on code
npm run build
npm test
```

### Testing

Tests are executed with [Jest][jest]. To use it, simple run `npm install`, it will install
Jest and its dependencies in your project's `node_modules` directory followed by `npm run build` and finally `npm test`.

To run the tests:

```bash
npm install
npm run build
npm test
```

## License

[Apache 2.0][license] © **Miraculous Owonubi** ([@miraclx][author-url]) &lt;omiraculous@gmail.com&gt;

[npm]:  https://github.com/npm/cli "The Node Package Manager"
[jest]:  https://github.com/facebook/jest "Delightful JavaScript Testing"
[printf]:  https://github.com/adaltas/node-printf
[license]:  LICENSE "Apache 2.0 License"
[author-url]: https://github.com/miraclx

[npm-url]: https://npmjs.org/package/stringd
[npm-image]: https://badgen.net/npm/node/stringd
[npm-image-url]: https://nodei.co/npm/stringd.png?stars&downloads
[downloads-url]: https://npmjs.org/package/stringd
[downloads-image]: https://badgen.net/npm/dm/stringd

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
