// Example 3: Model Generation (JavaScript)
import { JsonForge } from '@enrivol/json-forge';

console.log('=== Example 3: JavaScript Model Generation ===\n');

const forge = new JsonForge({
  generateModels: true,
  modelsPath: './examples/generated-models',
  language: 'javascript',
  interfaceName: 'Product',
});

const productData = {
  id: 101,
  name: 'Laptop',
  description: 'High-performance laptop',
  price: 1299.99,
  inStock: true,
  categories: ['Electronics', 'Computers'],
  specs: {
    cpu: 'Intel i7',
    ram: '16GB',
    storage: '512GB SSD',
  },
};

const result = forge.parseToString(productData);

console.log('Success:', result.success);
console.log('Generated Model Files:', result.modelFiles);
console.log('\nJSON Output:');
console.log(result.data);

console.log('\nCheck the generated JavaScript types at:', result.modelFiles?.[0]);
