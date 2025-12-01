# Quick Start Guide

## Installation

```bash
npm install @enrivolv/json-forge
```

## Basic Usage

### 1. Simple JSON Parsing

```typescript
import { JsonForge } from '@enrivolv/json-forge';

const forge = new JsonForge();

// String to Object
const result = forge.parseToObject('{"name": "John", "age": 30}');
console.log(result.data); // { name: 'John', age: 30 }

// Object to String
const obj = { name: 'Jane', age: 25 };
const stringResult = forge.parseToString(obj);
console.log(stringResult.data); // '{"name":"Jane","age":25}'
```

### 2. With Model Generation

```typescript
import { JsonForge } from '@enrivolv/json-forge';

const forge = new JsonForge({
  generateModels: true,           // Enable model generation
  modelsPath: './src/models',     // Output path
  interfaceName: 'User',          // Model name
  language: 'typescript',         // or 'javascript'
});

const userData = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  active: true,
};

const result = forge.parseToString(userData);

// This creates: ./src/models/User.ts
console.log(result.modelFiles); // ['./src/models/User.ts']
```

### 3. Quick Helpers

```typescript
import { parseJSON, stringifyJSON } from '@enrivolv/json-forge';

// Quick parse
const data = parseJSON('{"hello": "world"}');

// Quick stringify with options
const json = stringifyJSON({ hello: 'world' }, { 
  prettify: true,
  generateModels: true,
  modelsPath: './models',
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `generateModels` | boolean | `false` | Create model files |
| `modelsPath` | string | `'./models'` | Output directory |
| `language` | `'typescript'` \| `'javascript'` | `'typescript'` | Model language |
| `prettify` | boolean | `true` | Format JSON output |
| `interfaceName` | string | `'GeneratedModel'` | Model name |
| `exportModels` | boolean | `true` | Export models |

## Common Use Cases

### API Response Types

```typescript
const forge = new JsonForge({
  generateModels: true,
  modelsPath: './src/types',
  interfaceName: 'ApiResponse',
});

const apiData = await fetch('/api/users').then(r => r.text());
const result = forge.parseToObject(apiData);
// Generates: ./src/types/ApiResponse.ts
```

### Configuration Files

```typescript
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  features: { auth: true, logging: false },
};

stringifyJSON(config, {
  prettify: true,
  generateModels: true,
  interfaceName: 'AppConfig',
  modelsPath: './config',
});
```

## Next Steps

- Read the [full documentation](README.md)
- Check out [examples](examples/)
- Report issues on [GitHub](https://github.com/enrivol/json-forge/issues)

---

Made with ❤️ by Enrivol IT Company
