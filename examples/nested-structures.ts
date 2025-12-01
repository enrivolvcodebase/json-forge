import { JsonForge } from '../src/index';
import * as path from 'path';

/**
 * Example: Handling Complex Nested Structures
 * Demonstrates how JsonForge handles:
 * - Multiple levels of nested objects
 * - Arrays of objects
 * - Nested arrays
 * - Mixed structures
 */

console.log('🔧 JSON Forge - Nested Structures Example\n');

// Example 1: Nested Objects (Multiple Levels)
console.log('📦 Example 1: Multi-level Nested Objects');
console.log('─'.repeat(50));

const nestedObjectData = {
  company: {
    name: 'Tech Corp',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    contact: {
      email: 'info@techcorp.com',
      phone: {
        mobile: '+1-555-0100',
        office: '+1-555-0101',
      },
    },
  },
};

const forge1 = new JsonForge({
  generateModels: true,
  modelsPath: './examples/models',
  interfaceName: 'Company',
  language: 'typescript',
});

const result1 = forge1.parseToString(nestedObjectData);
console.log('✅ Success:', result1.success);
console.log('📄 Generated files:', result1.modelFiles);
console.log();

// Example 2: Arrays of Objects
console.log('📋 Example 2: Arrays of Objects');
console.log('─'.repeat(50));

const arrayOfObjectsData = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      active: false,
    },
  ],
  posts: [
    {
      postId: 101,
      title: 'First Post',
      views: 1500,
    },
  ],
};

const forge2 = new JsonForge({
  generateModels: true,
  modelsPath: './examples/models',
  interfaceName: 'UserData',
  language: 'typescript',
});

const result2 = forge2.parseToString(arrayOfObjectsData);
console.log('✅ Success:', result2.success);
console.log('📄 Generated files:', result2.modelFiles);
console.log();

// Example 3: Complex Nested Structure with Arrays
console.log('🏗️ Example 3: Complex Nested Structure');
console.log('─'.repeat(50));

const complexData = {
  project: {
    id: 'proj-001',
    name: 'E-Commerce Platform',
    team: [
      {
        memberId: 1,
        name: 'Alice Johnson',
        role: 'Lead Developer',
        skills: ['TypeScript', 'React', 'Node.js'],
      },
      {
        memberId: 2,
        name: 'Bob Williams',
        role: 'Backend Developer',
        skills: ['Python', 'Django', 'PostgreSQL'],
      },
    ],
    milestones: [
      {
        id: 'm1',
        title: 'MVP Release',
        deadline: '2025-03-01',
        tasks: [
          {
            taskId: 't1',
            description: 'Setup infrastructure',
            completed: true,
          },
          {
            taskId: 't2',
            description: 'Develop authentication',
            completed: false,
          },
        ],
      },
    ],
    budget: {
      allocated: 100000,
      spent: 45000,
      currency: 'USD',
      breakdown: {
        development: 30000,
        infrastructure: 10000,
        marketing: 5000,
      },
    },
  },
  metadata: {
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
    version: '2.1.0',
  },
};

const forge3 = new JsonForge({
  generateModels: true,
  modelsPath: './examples/models',
  interfaceName: 'ProjectData',
  language: 'typescript',
});

const result3 = forge3.parseToString(complexData);
console.log('✅ Success:', result3.success);
console.log('📄 Generated files:', result3.modelFiles);
console.log();

// Example 4: Deeply Nested Arrays
console.log('🎯 Example 4: Deeply Nested Arrays');
console.log('─'.repeat(50));

const deeplyNestedData = {
  organization: {
    departments: [
      {
        deptId: 'd1',
        name: 'Engineering',
        teams: [
          {
            teamId: 'eng-001',
            teamName: 'Frontend',
            members: [
              { id: 1, name: 'Developer 1' },
              { id: 2, name: 'Developer 2' },
            ],
          },
        ],
      },
    ],
  },
  tags: ['enterprise', 'technology', 'innovation'],
  stats: {
    totalEmployees: 150,
    departments: 5,
  },
};

const forge4 = new JsonForge({
  generateModels: true,
  modelsPath: './examples/models',
  interfaceName: 'Organization',
  language: 'typescript',
});

const result4 = forge4.parseToString(deeplyNestedData);
console.log('✅ Success:', result4.success);
console.log('📄 Generated files:', result4.modelFiles);
console.log();

// Example 5: JavaScript Models with Nested Structures
console.log('📝 Example 5: JavaScript Models (JSDoc)');
console.log('─'.repeat(50));

const apiResponse = {
  status: 'success',
  data: {
    items: [
      {
        id: 'item-1',
        name: 'Product A',
        price: 29.99,
        attributes: {
          color: 'blue',
          size: 'medium',
        },
      },
    ],
    pagination: {
      page: 1,
      perPage: 20,
      total: 100,
    },
  },
  errors: [],
};

const forge5 = new JsonForge({
  generateModels: true,
  modelsPath: './examples/models',
  interfaceName: 'ApiResponse',
  language: 'javascript',
});

const result5 = forge5.parseToString(apiResponse);
console.log('✅ Success:', result5.success);
console.log('📄 Generated files:', result5.modelFiles);
console.log();

console.log('✨ All examples completed!');
console.log('📁 Check ./examples/models/ directory for generated model files.');
