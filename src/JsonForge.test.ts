import { JsonForge, parseJSON, stringifyJSON } from './JsonForge';
import * as fs from 'fs';
import * as path from 'path';

describe('JsonForge', () => {
  const testModelsPath = './test-models';

  afterEach(() => {
    // Clean up test models
    if (fs.existsSync(testModelsPath)) {
      fs.rmSync(testModelsPath, { recursive: true, force: true });
    }
  });

  describe('parseToObject', () => {
    it('should parse valid JSON string to object', () => {
      const forge = new JsonForge();
      const jsonString = '{"name": "John", "age": 30}';
      const result = forge.parseToObject(jsonString);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ name: 'John', age: 30 });
      expect(result.error).toBeUndefined();
    });

    it('should return error for invalid JSON string', () => {
      const forge = new JsonForge();
      const invalidJson = '{name: "John"}';
      const result = forge.parseToObject(invalidJson);

      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.error).toBeDefined();
    });

    it('should generate TypeScript model when generateModels is true', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'User',
      });

      const jsonString = '{"name": "John", "age": 30, "active": true}';
      const result = forge.parseToObject(jsonString);

      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();
      expect(result.modelFiles?.length).toBe(1);
      expect(fs.existsSync(result.modelFiles![0])).toBe(true);
    });
  });

  describe('parseToString', () => {
    it('should parse object to JSON string', () => {
      const forge = new JsonForge({ prettify: false });
      const obj = { name: 'John', age: 30 };
      const result = forge.parseToString(obj);

      expect(result.success).toBe(true);
      expect(result.data).toBe('{"name":"John","age":30}');
    });

    it('should prettify JSON when prettify is true', () => {
      const forge = new JsonForge({ prettify: true });
      const obj = { name: 'John', age: 30 };
      const result = forge.parseToString(obj);

      expect(result.success).toBe(true);
      expect(result.data).toContain('\n');
      expect(result.data).toContain('  ');
    });

    it('should generate JavaScript model when language is javascript', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        language: 'javascript',
        interfaceName: 'Product',
      });

      const obj = { id: 1, name: 'Product', price: 99.99 };
      const result = forge.parseToString(obj);

      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();
      expect(result.modelFiles![0]).toMatch(/\.js$/);
    });
  });

  describe('Helper functions', () => {
    it('parseJSON should work as quick helper', () => {
      const result = parseJSON('{"test": true}');
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ test: true });
    });

    it('stringifyJSON should work as quick helper', () => {
      const result = stringifyJSON({ test: true }, { prettify: false });
      expect(result.success).toBe(true);
      expect(result.data).toBe('{"test":true}');
    });
  });

  describe('Configuration', () => {
    it('should allow updating configuration', () => {
      const forge = new JsonForge({ prettify: false });
      expect(forge.getConfig().prettify).toBe(false);

      forge.configure({ prettify: true });
      expect(forge.getConfig().prettify).toBe(true);
    });
  });

  describe('Nested Structures', () => {
    it('should handle nested objects', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'NestedData',
      });

      const nestedObj = {
        user: {
          profile: {
            name: 'John',
            age: 30,
          },
        },
      };

      const result = forge.parseToString(nestedObj);
      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();
      
      const modelContent = fs.readFileSync(result.modelFiles![0], 'utf8');
      expect(modelContent).toContain('interface NestedDataUserProfile');
      expect(modelContent).toContain('interface NestedDataUser');
      expect(modelContent).toContain('interface NestedData');
    });

    it('should handle arrays of objects', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'UsersData',
      });

      const arrayData = {
        users: [
          { id: 1, name: 'John', email: 'john@example.com' },
          { id: 2, name: 'Jane', email: 'jane@example.com' },
        ],
      };

      const result = forge.parseToString(arrayData);
      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();

      const modelContent = fs.readFileSync(result.modelFiles![0], 'utf8');
      expect(modelContent).toContain('interface UsersDataUsersItem');
      expect(modelContent).toContain('users: UsersDataUsersItem[]');
    });

    it('should handle deeply nested arrays with objects', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'ComplexData',
      });

      const deepData = {
        company: {
          departments: [
            {
              deptId: 1,
              name: 'Engineering',
              teams: [
                { teamId: 't1', members: [{ id: 1, name: 'Dev 1' }] },
              ],
            },
          ],
        },
      };

      const result = forge.parseToString(deepData);
      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();

      const modelContent = fs.readFileSync(result.modelFiles![0], 'utf8');
      expect(modelContent).toContain('interface ComplexDataCompanyDepartmentsItem');
      expect(modelContent).toContain('interface ComplexDataCompanyDepartmentsItemTeamsItem');
      expect(modelContent).toContain('interface ComplexDataCompanyDepartmentsItemTeamsItemMembersItem');
    });

    it('should handle arrays of primitives', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'TagsData',
      });

      const tagsData = {
        tags: ['typescript', 'javascript', 'node'],
        scores: [100, 95, 88],
        active: true,
      };

      const result = forge.parseToString(tagsData);
      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();

      const modelContent = fs.readFileSync(result.modelFiles![0], 'utf8');
      expect(modelContent).toContain('tags: string[]');
      expect(modelContent).toContain('scores: number[]');
      expect(modelContent).toContain('active: boolean');
    });

    it('should handle mixed nested structures', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'MixedData',
      });

      const mixedData = {
        project: {
          id: 'proj-1',
          team: [
            { memberId: 1, name: 'Alice', skills: ['TypeScript', 'React'] },
          ],
          budget: {
            total: 100000,
            breakdown: { dev: 60000, ops: 40000 },
          },
        },
        tags: ['important', 'active'],
      };

      const result = forge.parseToString(mixedData);
      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();

      const modelContent = fs.readFileSync(result.modelFiles![0], 'utf8');
      expect(modelContent).toContain('interface MixedDataProjectTeamItem');
      expect(modelContent).toContain('interface MixedDataProjectBudget');
      expect(modelContent).toContain('interface MixedDataProjectBudgetBreakdown');
      expect(modelContent).toContain('skills: string[]');
      expect(modelContent).toContain('tags: string[]');
    });

    it('should handle JavaScript models with nested structures', () => {
      const forge = new JsonForge({
        generateModels: true,
        modelsPath: testModelsPath,
        interfaceName: 'JsNested',
        language: 'javascript',
      });

      const data = {
        items: [{ id: 1, name: 'Item 1' }],
        metadata: { version: '1.0' },
      };

      const result = forge.parseToString(data);
      expect(result.success).toBe(true);
      expect(result.modelFiles).toBeDefined();

      const modelContent = fs.readFileSync(result.modelFiles![0], 'utf8');
      expect(modelContent).toContain('@typedef {Object} JsNestedItemsItem');
      expect(modelContent).toContain('@typedef {Object} JsNestedMetadata');
      expect(modelContent).toContain('@property {Array<JsNestedItemsItem>} items');
    });
  });
});
