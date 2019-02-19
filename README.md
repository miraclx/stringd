STRING-D (NodeJS String Variable Parser)
========================================

Create parsable strings using template formats by argument mapping.

Similar to [printf][printf] but supports nesting and exclusive recursions

[![NPM](https://nodei.co/npm/stringd.png?stars&downloads)](https://nodei.co/npm/stringd/)

## Installing

Via [NPM][npm]:

``` bash
$ npm install stringd
```

## Usage

``` javascript
// CommonJS
var stringd = require('stringd').default;
var result = stringd(template: string, object: {key: value, ...}, ignore?: string[]);

// ES6
import stringd from 'stringd';
var result = stringd(template: string, object: {key: value, ...}, ignore?: string[]));
```

# API
## stringd(&lt;template&gt;, &lt;object&gt;[, ignore])
Parse the `template` with the variables stated in `object`, ignore the variables defined in the `ignore` array

# Examples
``` javascript
stringd('Hello :{name}', {name: 'World'});
// Hello World

stringd(':{last}, :{first} :{last}', {last: 'Doe', first: 'John'});
// Doe, John Doe
```

# Features
### Multi parse methods
Whichever is more comfortable for you would work just fine
``` javascript
stringd('Hello :{name}', {name: 'World'});  // Hello world
stringd('Hello %{name}', {name: 'World'});  // Hello world
stringd('Hello ${name}', {name: 'World'});  // Hello world
stringd('Hello :{name%}', {name: 'World'}); // Hello world
stringd('Hello %{name%}', {name: 'World'}); // Hello world
stringd('Hello ${name%}', {name: 'World'}); // Hello world
```


### Nesting
``` javascript
assert.equal('John Davis', stringd(':{name}', {
  name: ":{first} :{last}",
  last: "Davis"
  first: "John",
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
## Development
Tests are executed with [Jest][jest]. To use it, simple run `npm install`, it will install
Jest and its dependencies in your project's `node_modules` directory followed by `npm test`.

To run the tests:

```bash
npm install
npm test
```
## About
### License: [Apache 2.0](LICENSE)
### Miraculous Owonubi: ([email](mailto:omiraculous@gmail.com)) <https://github.com/Miraclx>

[npm]:  https://github.com/npm/npm "The Node Package Manager"
[node]: http://nodejs.org "The Node.JS platform"
[jest]:  https://github.com/facebook/jest "Delightful JavaScript Testing"
[printf]:  https://github.com/adaltas/node-printf
