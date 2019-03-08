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
var stringd = require('stringd');
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

* `template`: &lt;[string][]&gt;
* `object`: &lt;[object][]&gt;
* `ignore`: &lt;[string][][]&gt;
* Returns: &lt;[string][]&gt;

Parse the `template` with the variables stated in `object`, ignore the variables defined in the `ignore` array

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
  'James:{name} :{name} :{data} :{data} :{all} :{name} :{data}Jack :{data}',
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
```
$ git clone https://github.com/Miraclx/stringd.git
### Testing

Tests are executed with [Jest][jest]. To use it, simple run `npm install`, it will install
Jest and its dependencies in your project's `node_modules` directory followed by `npm run build` and finally `npm test`.

To run the tests:

```bash
npm install
npm run build
npm test
```
## About
### License
[Apache 2.0][license]
### Author
Miraculous Owonubi: [[email]](mailto:omiraculous@gmail.com) <https://github.com/Miraclx>

[npm]:  https://github.com/npm/npm "The Node Package Manager"
[jest]:  https://github.com/facebook/jest "Delightful JavaScript Testing"
[printf]:  https://github.com/adaltas/node-printf
[license]:  LICENSE "Apache 2.0 License"

[npm-url]: https://npmjs.org/package/stringd
[npm-image]: https://badgen.net/npm/node/stringd
[npm-image-url]: https://nodei.co/npm/stringd.png?stars&downloads
[downloads-url]: https://npmjs.org/package/stringd
[downloads-image]: https://badgen.net/npm/dm/stringd

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
