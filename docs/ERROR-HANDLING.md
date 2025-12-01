# Error Handling Guide

## Overview

**@enrivol/json-forge** provides comprehensive error handling with detailed, actionable error messages that make debugging JSON parsing issues quick and efficient. This is especially valuable for production logging and monitoring.

## Error Response Structure

All parsing operations return a `ParseResult` object with the following structure:

```typescript
interface ParseResult {
  data: any | null;           // Parsed data (null on error)
  success: boolean;           // true if successful, false if error
  error?: string;             // Detailed error message (only present on failure)
  modelFiles?: string[];      // Generated model file paths (if applicable)
}
```

## Success Response

```typescript
{
  data: { name: "John", age: 30 },
  success: true,
  modelFiles: ["./models/User.ts"] // Optional, only if generateModels is true
}
```

## Error Response

```typescript
{
  data: null,
  success: false,
  error: "JSON Parse Error: Expected property name or '}' in JSON at position 1\n  → Check the syntax around the indicated position\n  → Near: \"{name: \"John\"}\""
}
```

## Common JSON Errors

### 1. Missing Quotes Around Property Names

**Invalid:**
```javascript
{name: "John", age: 30}
```

**Error:**
```
JSON Parse Error: Expected property name or '}' in JSON at position 1
  → Check the syntax around the indicated position
  → Near: "{name: "John", age: 3"
```

**Fix:**
```javascript
{"name": "John", "age": 30}
```

---

### 2. Trailing Commas

**Invalid:**
```javascript
{"name": "John", "age": 30,}
```

**Error:**
```
JSON Parse Error: Expected double-quoted property name in JSON at position 27
  → Check the syntax around the indicated position
  → Near: ": "John", "age": 30,}"
```

**Fix:**
```javascript
{"name": "John", "age": 30}
```

---

### 3. Single Quotes Instead of Double Quotes

**Invalid:**
```javascript
{'name': 'John', 'age': 30}
```

**Error:**
```
JSON Parse Error: Expected property name or '}' in JSON at position 1
  → Check the syntax around the indicated position
```

**Fix:**
```javascript
{"name": "John", "age": 30}
```

---

### 4. Incomplete JSON

**Invalid:**
```javascript
{"name": "John", "age": 30
```

**Error:**
```
JSON Parse Error: Expected ',' or '}' after property value in JSON at position 26
  → Check the syntax around the indicated position
  → Near: "": "John", "age": 30"
```

**Fix:**
```javascript
{"name": "John", "age": 30}
```

---

### 5. Empty String

**Invalid:**
```javascript
""
```

**Error:**
```
Input must be a non-empty string
```

**Fix:** Provide a valid JSON string.

---

### 6. Undefined or Invalid Keywords

**Invalid:**
```javascript
{"name": "John", "status": undefined}
```

**Error:**
```
JSON Parse Error: Unexpected token 'u', ...""status": undefined}" is not valid JSON
  → Check for: missing quotes around properties, trailing commas, or invalid characters
```

**Fix:**
```javascript
{"name": "John", "status": null}
```

---

### 7. Plain Text (Not JSON)

**Invalid:**
```javascript
Hello World
```

**Error:**
```
JSON Parse Error: Unexpected token 'T', "This is ju"... is not valid JSON
  → Check for: missing quotes around properties, trailing commas, or invalid characters
```

**Fix:** Provide valid JSON format.

---

## Production Usage Examples

### Example 1: API Endpoint Handler

```typescript
import { parseJSON } from '@enrivol/json-forge';
import { logger } from './logger';

export async function handleUserRequest(req, res) {
  const result = parseJSON(req.body);
  
  if (!result.success) {
    // Log detailed error for debugging
    logger.error('Invalid JSON received', {
      error: result.error,
      endpoint: '/api/user',
      ip: req.ip,
      timestamp: new Date().toISOString(),
      rawInput: req.body.substring(0, 200), // First 200 chars
    });
    
    // Return user-friendly error
    return res.status(400).json({
      error: 'Invalid JSON format',
      details: result.error,
    });
  }
  
  // Process valid data
  return res.json({ success: true, data: result.data });
}
```

---

### Example 2: Data Validation Pipeline

```typescript
import { parseJSON } from '@enrivol/json-forge';

interface ValidationResult {
  valid: boolean;
  data?: any;
  errors: string[];
}

function validateAndParseJSON(jsonString: string): ValidationResult {
  const errors: string[] = [];
  
  // Step 1: Parse JSON
  const parseResult = parseJSON(jsonString);
  
  if (!parseResult.success) {
    errors.push(`Parsing Error: ${parseResult.error}`);
    return { valid: false, errors };
  }
  
  // Step 2: Additional validation (business logic)
  const data = parseResult.data;
  
  if (!data.id) {
    errors.push('Missing required field: id');
  }
  
  if (!data.name) {
    errors.push('Missing required field: name');
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return { valid: true, data, errors: [] };
}

// Usage
const result = validateAndParseJSON('{"name": "John"}');
if (!result.valid) {
  console.error('Validation failed:', result.errors);
}
```

---

### Example 3: Logging Integration (Winston)

```typescript
import { parseJSON } from '@enrivol/json-forge';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

function processData(jsonString: string, context: any) {
  const result = parseJSON(jsonString);
  
  if (!result.success) {
    logger.error('JSON parsing failed', {
      error: result.error,
      context,
      severity: 'high',
      timestamp: new Date().toISOString(),
      service: 'data-processor',
    });
    
    throw new Error(`Failed to parse JSON: ${result.error}`);
  }
  
  logger.info('JSON parsed successfully', {
    dataSize: JSON.stringify(result.data).length,
    context,
  });
  
  return result.data;
}
```

---

### Example 4: Error Monitoring (Sentry)

```typescript
import { parseJSON } from '@enrivol/json-forge';
import * as Sentry from '@sentry/node';

function safeParseJSON(jsonString: string, userId?: string) {
  const result = parseJSON(jsonString);
  
  if (!result.success) {
    // Send to Sentry for monitoring
    Sentry.captureException(new Error('JSON Parse Failure'), {
      level: 'error',
      tags: {
        errorType: 'json_parse_error',
      },
      extra: {
        errorMessage: result.error,
        userId,
        inputLength: jsonString.length,
        inputPreview: jsonString.substring(0, 100),
      },
    });
    
    return null;
  }
  
  return result.data;
}
```

---

## Best Practices

### 1. Always Check the Success Flag

```typescript
const result = parseJSON(jsonString);

if (!result.success) {
  // Handle error
  console.error(result.error);
  return;
}

// Use result.data safely
processData(result.data);
```

---

### 2. Log Errors with Context

```typescript
const result = parseJSON(jsonString);

if (!result.success) {
  logger.error({
    message: 'JSON parsing failed',
    error: result.error,
    userId: currentUser.id,
    endpoint: req.path,
    timestamp: Date.now(),
  });
}
```

---

### 3. Provide User-Friendly Errors

```typescript
const result = parseJSON(jsonString);

if (!result.success) {
  // Log detailed error for developers
  logger.error(result.error);
  
  // Return simple message to users
  return { error: 'Invalid JSON format. Please check your input.' };
}
```

---

### 4. Use Try-Catch for Additional Safety

```typescript
try {
  const result = parseJSON(jsonString);
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result.data;
} catch (error) {
  logger.error('Unexpected error during JSON parsing', error);
  return null;
}
```

---

## Error Message Components

Each error message includes:

1. **Error Type**: e.g., "JSON Parse Error"
2. **Specific Issue**: e.g., "Expected property name or '}'"
3. **Position**: e.g., "at position 1 (line 1 column 2)"
4. **Helpful Hints**: e.g., "→ Check for: missing quotes around properties"
5. **Context Snippet**: e.g., "→ Near: \"{name: \"John\"}\""

This structure makes it easy to:
- Identify the problem quickly
- Locate the exact position of the error
- Understand what went wrong
- Fix the issue efficiently

---

## Testing Error Handling

See `examples/error-handling.js` for comprehensive error handling examples, or run:

```bash
node examples/error-handling.js
```

This will demonstrate all common error scenarios with formatted output.

---

## Summary

- ✅ All errors return a structured `ParseResult` object
- ✅ Detailed error messages with position information
- ✅ Helpful hints for common mistakes
- ✅ Context snippets showing the problematic JSON
- ✅ Perfect for production logging and monitoring
- ✅ Easy integration with logging systems (Winston, Bunyan, Sentry, etc.)

---

**Need help?** Contact Enrivol IT Company at support@enrivol.com
