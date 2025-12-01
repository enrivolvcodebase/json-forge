# Nested Structures Support

## Overview

JSON Forge now fully supports complex nested structures including:
- **Multi-level nested objects** (unlimited depth)
- **Arrays of objects** with proper interface generation
- **Nested arrays within objects**
- **Mixed structures** (primitives, objects, and arrays combined)

## How It Works

### 1. Nested Objects

When you have nested objects, JSON Forge automatically creates separate interfaces for each level:

**Input:**
```typescript
const data = {
  company: {
    address: {
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    }
  }
};
```

**Generated TypeScript:**
```typescript
export interface CompanyAddressCoordinates {
  lat: number;
  lng: number;
}

export interface CompanyAddress {
  coordinates: CompanyAddressCoordinates;
}

export interface Company {
  address: CompanyAddress;
}
```

### 2. Arrays of Objects

Arrays containing objects are now properly typed with dedicated item interfaces:

**Input:**
```typescript
const data = {
  users: [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" }
  ]
};
```

**Generated TypeScript:**
```typescript
export interface UserDataUsersItem {
  id: number;
  name: string;
  email: string;
}

export interface UserData {
  users: UserDataUsersItem[];
}
```

### 3. Deeply Nested Arrays

JSON Forge handles multiple levels of nested arrays with objects:

**Input:**
```typescript
const data = {
  departments: [
    {
      name: "Engineering",
      teams: [
        {
          teamName: "Frontend",
          members: [
            { id: 1, name: "Developer 1" }
          ]
        }
      ]
    }
  ]
};
```

**Generated TypeScript:**
```typescript
export interface OrgDepartmentsItemTeamsItemMembersItem {
  id: number;
  name: string;
}

export interface OrgDepartmentsItemTeamsItem {
  teamName: string;
  members: OrgDepartmentsItemTeamsItemMembersItem[];
}

export interface OrgDepartmentsItem {
  name: string;
  teams: OrgDepartmentsItemTeamsItem[];
}

export interface Org {
  departments: OrgDepartmentsItem[];
}
```

### 4. Arrays of Primitives

Simple arrays are typed accordingly:

**Input:**
```typescript
const data = {
  tags: ["typescript", "javascript"],
  scores: [100, 95, 88],
  flags: [true, false, true]
};
```

**Generated TypeScript:**
```typescript
export interface Data {
  tags: string[];
  scores: number[];
  flags: boolean[];
}
```

## Usage Examples

### TypeScript Models

```typescript
import { JsonForge } from '@enrivolv/json-forge';

const forge = new JsonForge({
  generateModels: true,
  modelsPath: './src/types',
  interfaceName: 'ApiResponse',
  language: 'typescript',
});

const complexData = {
  project: {
    team: [
      { id: 1, name: "Alice", skills: ["React", "TypeScript"] }
    ],
    budget: {
      total: 100000,
      breakdown: { dev: 60000, ops: 40000 }
    }
  }
};

const result = forge.parseToString(complexData);
// Generates: ./src/types/ApiResponse.ts with proper nested interfaces
```

### JavaScript Models (JSDoc)

```typescript
const forge = new JsonForge({
  generateModels: true,
  modelsPath: './types',
  interfaceName: 'Product',
  language: 'javascript',
});

const data = {
  items: [
    { id: 1, price: 29.99, attributes: { color: "blue" } }
  ]
};

const result = forge.parseToString(data);
// Generates: ./types/Product.js with JSDoc typedefs
```

## Naming Convention

Generated interface names follow this pattern:
- **Nested objects**: `{ParentInterface}{CapitalizedPropertyName}`
- **Array items**: `{ParentInterface}{CapitalizedPropertyName}Item`

Examples:
- `UserData` → `UserDataProfile` (nested object)
- `UserData.posts` → `UserDataPostsItem` (array item)
- `Project.team.members` → `ProjectTeamItemMembersItem` (deeply nested array)

## Benefits

✅ **Type Safety**: Full TypeScript support for complex data structures  
✅ **Auto-completion**: IDE support for all nested properties  
✅ **Maintainability**: Automatically synced with your JSON data  
✅ **Documentation**: Clear interfaces serve as documentation  
✅ **Flexibility**: Works with any level of nesting  

## Running Examples

Check out the comprehensive examples:

```bash
# Run the nested structures example
npx ts-node examples/nested-structures.ts

# Check generated models
ls examples/models/
```

## Testing

All nested structure scenarios are covered by automated tests:

```bash
npm test
```

Tests include:
- Multi-level nested objects
- Arrays of objects
- Deeply nested arrays
- Arrays of primitives
- Mixed structures
- JavaScript models

## API Reference

The enhanced `inferType` function now returns:

```typescript
{
  type: string;              // The TypeScript/JSDoc type
  isComplexObject: boolean;  // True if value is a nested object
  isArrayOfObjects: boolean; // True if value is an array of objects
}
```

This allows proper handling of all nested scenarios during model generation.
