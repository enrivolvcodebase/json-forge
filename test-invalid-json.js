const { parseJSON } = require('./dist/index.js');

console.log('=== Testing Invalid JSON Strings ===\n');

// Test 1: Missing quotes around property name
console.log('Test 1 - Invalid JSON (missing quotes around property):');
const result1 = parseJSON('{name: "John"}');
console.log(JSON.stringify(result1, null, 2));
console.log('');

// Test 2: Trailing comma
console.log('Test 2 - Invalid JSON (trailing comma):');
const result2 = parseJSON('{"name": "John",}');
console.log(JSON.stringify(result2, null, 2));
console.log('');

// Test 3: Single quotes instead of double quotes
console.log('Test 3 - Invalid JSON (single quotes):');
const result3 = parseJSON("{'name': 'John'}");
console.log(JSON.stringify(result3, null, 2));
console.log('');

// Test 4: Incomplete JSON (missing closing brace)
console.log('Test 4 - Invalid JSON (incomplete - missing closing brace):');
const result4 = parseJSON('{"name": "John"');
console.log(JSON.stringify(result4, null, 2));
console.log('');

// Test 5: Not JSON at all
console.log('Test 5 - Invalid JSON (plain text):');
const result5 = parseJSON('Hello World');
console.log(JSON.stringify(result5, null, 2));
console.log('');

// Test 6: Empty string
console.log('Test 6 - Invalid JSON (empty string):');
const result6 = parseJSON('');
console.log(JSON.stringify(result6, null, 2));
console.log('');

// Test 7: Undefined property
console.log('Test 7 - Invalid JSON (undefined keyword):');
const result7 = parseJSON('{"name": undefined}');
console.log(JSON.stringify(result7, null, 2));
console.log('');

// Test 8: Valid JSON for comparison
console.log('Test 8 - VALID JSON (for comparison):');
const result8 = parseJSON('{"name": "John", "age": 30}');
console.log(JSON.stringify(result8, null, 2));
