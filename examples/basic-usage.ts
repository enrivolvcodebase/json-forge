// Example 1: Basic JSON Parsing
import { JsonForge } from '@enrivol/json-forge';

console.log('=== Example 1: Basic JSON Parsing ===\n');

const forge = new JsonForge();

// Parse string to object
const jsonString = '{"name": "John Doe", "age": 30, "email": "john@example.com"}';
const parseResult = forge.parseToObject(jsonString);

console.log('Parsed Object:', parseResult.data);

// Parse object to string
const obj = { name: 'Jane Doe', age: 25, city: 'New York' };
const stringifyResult = forge.parseToString(obj);

console.log('JSON String:', stringifyResult.data);
