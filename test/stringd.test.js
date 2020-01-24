import stringd from '../dist/lib';

test('very complex nesting, with exclusive recursion', () => {
  expect(
    stringd(':{name} :{misc}', {
      name: ':{first_name}:{data}:{last_name}',
      first_name: 'James',
      last_name: 'Jack',
      misc: ':{data}',
      data: ':{name} :{all}',
      all: ':{name} :{misc} :{data} :{all} :{name} :{misc}',
    }),
  ).toBe('James:{name} :{name} :{data} :{data} :{all} :{name} :{data}Jack James:{data}Jack James:{data}Jack :{misc} :{data} :{all} James:{data}Jack :{misc}');
});

test('forward padding', () => {
  expect(stringd('Percentage [:3{percentage}%]', {percentage: 66})).toBe('Percentage [ 66%]');
});

test('forward padding, complete', () => {
  expect(stringd('Percentage [:3{percentage}%]', {percentage: 100})).toBe('Percentage [100%]');
});

test('forward zero padding', () => {
  expect(stringd('Number [:02{number}/:{total}]', {number: 5, total: 10})).toBe('Number [05/10]');
});

test('forward zero padding, complete', () => {
  expect(stringd('Number [:02{number}/:{total}]', {number: 10, total: 10})).toBe('Number [10/10]');
});

test('end padding', () => {
  expect(stringd('Compiler: [:-5{compiler}]', {compiler: 'gcc'})).toBe('Compiler: [gcc  ]');
});

test('end padding, complete', () => {
  expect(stringd('Compiler: [:-5{compiler}]', {compiler: 'clang'})).toBe('Compiler: [clang]');
});

test('end zero padding', () => {
  expect(stringd('Count: [:-03{count}]', {count: 5})).toBe('Count: [500]');
});

test('end zero padding, complete', () => {
  expect(stringd('Count: [:-03{count}]', {count: 374})).toBe('Count: [374]');
});

test('simple parsing', () => {
  expect(stringd('Hello :{msg}', {msg: 'World'})).toBe('Hello World');
});

test('simple nesting', () => {
  expect(stringd('Hello :{name}', {name: ':{first} :{last}', first: 'John', last: 'Doe'})).toBe('Hello John Doe');
});

test('complex nesting', () => {
  expect(
    stringd(':{user}', {
      user: ':{name} :{age} :{job}',
      name: ':{first} :{last}',
      first: 'Tim',
      last: 'Cook',
      age: 'is :{age_data} years old',
      job: 'and is :{occupation} of :{company}',
      age_data: 57,
      company: 'Apple',
      occupation: 'CEO',
    }),
  ).toBe('Tim Cook is 57 years old and is CEO of Apple');
});

test('exclusive recursion on nested trees', () => {
  expect(stringd('Hello :{name}', {name: ':{first}', first: 'John :{name} :{last}', last: 'Doe'})).toBe('Hello John :{name} Doe');
});

test('functional evaluation', () => {
  expect(
    stringd(':{name:parsed}', {
      name: ':{first} :{last}',
      last: 'Davis',
      first: 'John',
      greeting: 'Hello :{name}',
      months: 13,
      duration: ':{months} months',
      contribution: 45,
      cash: ({contribution, months}) => contribution * months,
      'name:parsed': `:{greeting}, you have contributed $:{cash} in the span of :{duration}`,
    }),
  ).toBe('Hello John Davis, you have contributed $585 in the span of 13 months');
});
