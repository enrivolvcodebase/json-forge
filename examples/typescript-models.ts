// Example 2: Model Generation (TypeScript)
import { JsonForge } from '@enrivol/json-forge';

console.log('=== Example 2: TypeScript Model Generation ===\n');

const forge = new JsonForge({
  generateModels: true,
  modelsPath: './examples/generated-models',
  language: 'typescript',
  interfaceName: 'User',
  prettify: true,
});

const userData = {
  id: 1,
  username: 'johndoe',
  email: 'john@example.com',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    isActive: true,
  },
  roles: ['admin', 'user'],
  createdAt: '2024-01-01T00:00:00Z',
};

const result = forge.parseToString(userData);

console.log('Success:', result.success);
console.log('Generated Model Files:', result.modelFiles);
console.log('\nJSON Output:');
console.log(result.data);

console.log('\nCheck the generated TypeScript interface at:', result.modelFiles?.[0]);
