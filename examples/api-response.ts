// Example 4: API Response Processing
import { parseJSON } from '@enrivol/json-forge';

console.log('=== Example 4: API Response Processing ===\n');

// Simulating an API response
const apiResponse = `{
  "status": "success",
  "code": 200,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "email": "alice@example.com"
      },
      {
        "id": 2,
        "name": "Bob Smith",
        "email": "bob@example.com"
      }
    ],
    "total": 2,
    "page": 1
  },
  "timestamp": 1638360000000
}`;

const result = parseJSON(apiResponse, {
  generateModels: true,
  modelsPath: './examples/generated-models',
  interfaceName: 'ApiResponse',
});

if (result.success) {
  console.log('API Response Status:', result.data.status);
  console.log('Total Users:', result.data.data.total);
  console.log('\nUsers:');
  result.data.data.users.forEach((user: any) => {
    console.log(`  - ${user.name} (${user.email})`);
  });

  if (result.modelFiles) {
    console.log('\nGenerated Model:', result.modelFiles[0]);
  }
}
