// Example 5: Configuration Management
import { stringifyJSON } from '@enrivol/json-forge';

console.log('=== Example 5: Configuration Management ===\n');

const appConfig = {
  app: {
    name: 'MyApp',
    version: '1.0.0',
    environment: 'production',
  },
  server: {
    host: 'localhost',
    port: 3000,
    ssl: true,
  },
  database: {
    host: 'db.example.com',
    port: 5432,
    name: 'myapp_db',
    poolSize: 10,
  },
  features: {
    authentication: true,
    logging: true,
    caching: false,
  },
};

const result = stringifyJSON(appConfig, {
  prettify: true,
  generateModels: true,
  modelsPath: './examples/generated-models',
  interfaceName: 'AppConfig',
});

console.log('Configuration JSON:');
console.log(result.data);

if (result.modelFiles) {
  console.log('\nGenerated Config Interface:', result.modelFiles[0]);
}
