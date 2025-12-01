# @enrivolv/json-forge

<div align="center">

[![npm version](https://img.shields.io/npm/v/@enrivolv/json-forge.svg)](https://www.npmjs.com/package/@enrivolv/json-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**A powerful JSON parser and TypeScript/JavaScript model generator for modern development.**

Effortlessly parse JSON and automatically generate type-safe models for your projects.

</div>

---

## 🚀 Features

- ✨ **Seamless JSON Parsing**: Convert between JSON strings and objects with ease
- 🔧 **Automatic Model Generation**: Generate TypeScript interfaces or JavaScript types from JSON data
- �️ **Advanced Nested Structures**: Full support for multi-level nested objects, arrays of objects, and complex data hierarchies
- �🎯 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 📁 **Flexible Output**: Configure where and how models are generated
- 🎨 **Customizable**: Control prettification, naming, and export options
- 🚄 **Lightweight**: Zero dependencies for runtime usage
- 💼 **Enterprise-Ready**: Built by Enrivol IT Company for professional use

---

## 📦 Installation

```bash
npm install @enrivolv/json-forge
```

or

```bash
yarn add @enrivolv/json-forge
```

---

## 🎯 Quick Start

### Basic JSON Parsing

```typescript
import { JsonForge } from '@enrivolv/json-forge';

// Create an instance
const forge = new JsonForge();

// Parse JSON string to object
const result = forge.parseToObject('{"name": "John", "age": 30}');
console.log(result.data); // { name: 'John', age: 30 }

// Parse object to JSON string
const stringResult = forge.parseToString({ name: 'John', age: 30 });
console.log(stringResult.data); // '{"name":"John","age":30}'
```

### With Model Generation

```typescript
import { JsonForge } from '@enrivolv/json-forge';

// Configure with model generation
const forge = new JsonForge({
  generateModels: true,        // Enable model generation
  modelsPath: './src/models',  // Where to save models
  language: 'typescript',      // or 'javascript'
  interfaceName: 'User',       // Name for the generated interface
});

const jsonString = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true
}`;

const result = forge.parseToObject(jsonString);

console.log(result.success); // true
console.log(result.modelFiles); // ['./src/models/User.ts']
```

**Generated TypeScript Model (`./src/models/User.ts`):**

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
}
```

---

## 🔧 Configuration Options

```typescript
interface JsonForgeOptions {
  /**
   * Whether to generate model files
   * @default false
   */
  generateModels?: boolean;

  /**
   * Path where model files should be created (relative to project root)
   * @default './models'
   */
  modelsPath?: string;

  /**
   * Language for generated models
   * @default 'typescript'
   */
  language?: 'typescript' | 'javascript';

  /**
   * Whether to prettify the output JSON
   * @default true
   */
  prettify?: boolean;

  /**
   * Interface name for generated models
   * @default 'GeneratedModel'
   */
  interfaceName?: string;

  /**
   * Whether to export the generated models
   * @default true
   */
  exportModels?: boolean;
}
```

---

## 📚 API Reference

### Class: `JsonForge`

#### Constructor

```typescript
new JsonForge(options?: JsonForgeOptions)
```

#### Methods

##### `parseToObject(jsonString: string): ParseResult`

Parses a JSON string to a JavaScript object.

```typescript
const result = forge.parseToObject('{"name": "John"}');
```

##### `parseToString(obj: any): ParseResult`

Converts a JavaScript object to a JSON string.

```typescript
const result = forge.parseToString({ name: 'John' });
```

##### `configure(options: JsonForgeOptions): void`

Updates the configuration options.

```typescript
forge.configure({ prettify: true, generateModels: false });
```

##### `getConfig(): Required<JsonForgeOptions>`

Returns the current configuration.

```typescript
const config = forge.getConfig();
```

### Helper Functions

#### `parseJSON(jsonString: string, options?: JsonForgeOptions): ParseResult`

Quick helper to parse JSON string.

```typescript
import { parseJSON } from '@enrivolv/json-forge';

const result = parseJSON('{"name": "John"}', { prettify: true });
```

---

## 🚨 Error Handling

**JSON Forge provides detailed, actionable error messages** to help you debug JSON parsing issues quickly. Perfect for logging and monitoring in production!

### Error Response Structure

When parsing fails, you get a structured error response:

```typescript
{
  data: null,
  success: false,
  error: "Detailed error message with helpful hints"
}
```

### Example: Handling Invalid JSON

```typescript
import { parseJSON } from '@enrivolv/json-forge';

// Invalid JSON - missing quotes around property name
const result1 = parseJSON('{name: "John"}');
console.log(result1.error);
// Output: JSON Parse Error: Expected property name or '}' in JSON at position 1
//         → Check the syntax around the indicated position
//         → Near: "{name: "John"}"

// Invalid JSON - trailing comma
const result2 = parseJSON('{"name": "John",}');
console.log(result2.error);
// Output: JSON Parse Error: Expected double-quoted property name in JSON at position 16
//         → Check the syntax around the indicated position

// Empty string
const result3 = parseJSON('');
console.log(result3.error);
// Output: Input must be a non-empty string
```

### Production Logging Example

```typescript
function processUserData(jsonString: string, userId: string) {
  const result = parseJSON(jsonString);
  
  if (!result.success) {
    // Log to your monitoring system
    logger.error('JSON parsing failed', {
      userId,
      error: result.error,
      timestamp: new Date().toISOString(),
      input: jsonString.substring(0, 100) // First 100 chars for debugging
    });
    
    return null;
  }
  
  return result.data;
}
```

### Common Error Types

| Error Scenario | Example | Error Message |
|---------------|---------|---------------|
| Missing quotes | `{name: "John"}` | Expected property name or '}' |
| Trailing comma | `{"name": "John",}` | Expected double-quoted property name |
| Single quotes | `{'name': 'John'}` | Expected property name (JSON requires double quotes) |
| Incomplete JSON | `{"name": "John"` | Expected ',' or '}' after property value |
| Empty input | `""` | Input must be a non-empty string |
| Invalid syntax | `undefined` | Not valid JSON + helpful hints |

**💡 Tip**: All error messages include context snippets showing the problematic part of your JSON string, making debugging much faster!

See `examples/error-handling.js` for more comprehensive examples.

#### `stringifyJSON(obj: any, options?: JsonForgeOptions): ParseResult`

Quick helper to stringify objects.

```typescript
import { stringifyJSON } from '@enrivolv/json-forge';

const result = stringifyJSON({ name: 'John' }, { prettify: true });
```

---

## 🎨 Examples

### Example 1: API Response Processing

```typescript
import { JsonForge } from '@enrivolv/json-forge';

// Configure for API response types
const forge = new JsonForge({
  generateModels: true,
  modelsPath: './src/types',
  interfaceName: 'ApiResponse',
  language: 'typescript',
});

const apiResponse = `{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "John"},
      {"id": 2, "name": "Jane"}
    ]
  },
  "timestamp": 1638360000000
}`;

const result = forge.parseToObject(apiResponse);
// Generates: ./src/types/ApiResponse.ts
```

### Example 2: Configuration File Processing

```typescript
import { stringifyJSON } from '@enrivolv/json-forge';

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  features: {
    auth: true,
    logging: false,
  },
};

const result = stringifyJSON(config, {
  prettify: true,
  generateModels: true,
  modelsPath: './config',
  interfaceName: 'AppConfig',
});

console.log(result.data);
// Also generates: ./config/AppConfig.ts
```

### Example 3: Nested Structures

```typescript
import { JsonForge } from '@enrivolv/json-forge';

const forge = new JsonForge({
  generateModels: true,
  modelsPath: './src/types',
  interfaceName: 'ProjectData',
});

// Complex nested data with arrays of objects
const projectData = {
  project: {
    team: [
      { 
        id: 1, 
        name: 'Alice', 
        skills: ['TypeScript', 'React'] 
      },
    ],
    budget: {
      total: 100000,
      breakdown: { dev: 60000, ops: 40000 }
    }
  }
};

const result = forge.parseToString(projectData);
// Generates properly typed interfaces for:
// - ProjectData
// - ProjectDataProject
// - ProjectDataProjectTeamItem (for array items)
// - ProjectDataProjectBudget
// - ProjectDataProjectBudgetBreakdown
```

**See [Nested Structures Guide](docs/NESTED-STRUCTURES.md) for detailed examples.**

### Example 4: JavaScript Models

```typescript
import { JsonForge } from '@enrivolv/json-forge';

const forge = new JsonForge({
  generateModels: true,
  language: 'javascript',
  modelsPath: './models',
  interfaceName: 'Product',
});

const product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  inStock: true,
};

forge.parseToString(product);
// Generates: ./models/Product.js with JSDoc types
```

---

## 🛠️ Use Cases

- **API Integration**: Automatically generate types from API responses
- **Configuration Management**: Create type-safe configuration interfaces
- **Data Migration**: Parse and validate JSON data with model generation
- **Code Generation**: Bootstrap model files for rapid development
- **Testing**: Generate mock data structures with proper typing
- **Documentation**: Create type definitions for external data sources

---

## 🏢 About Enrivol

**json-forge** is proudly developed and maintained by **Enrivol IT Company**, delivering enterprise-grade solutions for modern development challenges.

---

## 📄 License

MIT © Enrivol IT Company

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📧 Support

For enterprise support and consulting services, contact: **support@enrivol.com**

---

## 🌟 Why json-forge?

- **"Forge"** represents crafting and creating – we forge robust models from raw JSON
- Professional naming that builds brand recognition
- Easy to remember and pronounce
- SEO-friendly for NPM discovery
- Conveys reliability and quality craftsmanship

---

<div align="center">

**Made with ❤️ by Enrivol IT Company**

[Website](https://enrivol.com) • [Documentation](https://github.com/enrivol/json-forge) • [NPM](https://www.npmjs.com/package/@enrivolv/json-forge)

</div>
