import * as fs from 'fs';
import * as path from 'path';

/**
 * Infers TypeScript type from a value
 * @param value - The value to infer type from
 * @param parentKey - The parent key name for generating nested interface names
 * @returns Object with type string and flag indicating if it's a complex object
 */
export function inferType(value: any, parentKey?: string): { type: string; isComplexObject: boolean; isArrayOfObjects: boolean } {
  if (value === null) return { type: 'null', isComplexObject: false, isArrayOfObjects: false };
  
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: 'any[]', isComplexObject: false, isArrayOfObjects: false };
    
    const firstItem = value[0];
    if (firstItem !== null && typeof firstItem === 'object' && !Array.isArray(firstItem)) {
      // Array of objects - needs interface generation
      return { type: 'object', isComplexObject: false, isArrayOfObjects: true };
    } else {
      // Array of primitives or nested arrays
      const itemTypeInfo = inferType(firstItem);
      return { type: `${itemTypeInfo.type}[]`, isComplexObject: false, isArrayOfObjects: false };
    }
  }
  
  const type = typeof value;
  switch (type) {
    case 'string':
      return { type: 'string', isComplexObject: false, isArrayOfObjects: false };
    case 'number':
      return { type: 'number', isComplexObject: false, isArrayOfObjects: false };
    case 'boolean':
      return { type: 'boolean', isComplexObject: false, isArrayOfObjects: false };
    case 'object':
      return { type: 'object', isComplexObject: true, isArrayOfObjects: false };
    default:
      return { type: 'any', isComplexObject: false, isArrayOfObjects: false };
  }
}

/**
 * Generates TypeScript interface from JSON object
 */
export function generateTypeScriptInterface(
  data: any,
  interfaceName: string,
  exportModel: boolean = true
): string {
  const exportKeyword = exportModel ? 'export ' : '';
  let interfaceCode = `${exportKeyword}interface ${interfaceName} {\n`;
  let nestedInterfaces = '';

  for (const [key, value] of Object.entries(data)) {
    const typeInfo = inferType(value, key);
    
    if (typeInfo.isComplexObject && value !== null && !Array.isArray(value)) {
      // Nested object - create separate interface
      const nestedInterfaceName = `${interfaceName}${capitalize(key)}`;
      const nestedInterface = generateTypeScriptInterface(value, nestedInterfaceName, exportModel);
      nestedInterfaces = nestedInterface + '\n\n' + nestedInterfaces;
      interfaceCode += `  ${key}: ${nestedInterfaceName};\n`;
    } else if (typeInfo.isArrayOfObjects && Array.isArray(value) && value.length > 0) {
      // Array of objects - create interface for array items
      const itemInterfaceName = `${interfaceName}${capitalize(key)}Item`;
      const itemInterface = generateTypeScriptInterface(value[0], itemInterfaceName, exportModel);
      nestedInterfaces = itemInterface + '\n\n' + nestedInterfaces;
      interfaceCode += `  ${key}: ${itemInterfaceName}[];\n`;
    } else {
      // Primitive or simple type
      interfaceCode += `  ${key}: ${typeInfo.type};\n`;
    }
  }

  interfaceCode += '}';
  return nestedInterfaces + interfaceCode;
}

/**
 * Generates JavaScript JSDoc types from JSON object
 */
export function generateJavaScriptTypes(
  data: any,
  typeName: string,
  exportModel: boolean = true
): string {
  const exportKeyword = exportModel ? 'module.exports = ' : '';
  let typeCode = `/**\n * @typedef {Object} ${typeName}\n`;
  let nestedTypes = '';

  for (const [key, value] of Object.entries(data)) {
    const typeInfo = inferType(value, key);
    
    if (typeInfo.isComplexObject && value !== null && !Array.isArray(value)) {
      // Nested object - create separate typedef
      const nestedTypeName = `${typeName}${capitalize(key)}`;
      const nestedType = generateJavaScriptTypes(value, nestedTypeName, exportModel);
      nestedTypes = nestedType + '\n' + nestedTypes;
      typeCode += ` * @property {${nestedTypeName}} ${key}\n`;
    } else if (typeInfo.isArrayOfObjects && Array.isArray(value) && value.length > 0) {
      // Array of objects - create typedef for array items
      const itemTypeName = `${typeName}${capitalize(key)}Item`;
      const itemType = generateJavaScriptTypes(value[0], itemTypeName, exportModel);
      nestedTypes = itemType + '\n' + nestedTypes;
      typeCode += ` * @property {Array<${itemTypeName}>} ${key}\n`;
    } else {
      // Primitive or simple type
      const jsType = typeScriptToJSDocType(typeInfo.type);
      typeCode += ` * @property {${jsType}} ${key}\n`;
    }
  }

  typeCode += ' */\n\n';
  
  if (exportModel) {
    typeCode += `${exportKeyword}{};\n`;
  }

  return nestedTypes + typeCode;
}

/**
 * Converts TypeScript type to JSDoc type
 */
function typeScriptToJSDocType(tsType: string): string {
  if (tsType === 'any[]') return 'Array';
  if (tsType.endsWith('[]')) return `Array<${tsType.slice(0, -2)}>`;
  return tsType;
}

/**
 * Capitalizes the first letter of a string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Creates directory recursively if it doesn't exist
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Writes model file to disk
 */
export function writeModelFile(
  filePath: string,
  content: string
): void {
  const directory = path.dirname(filePath);
  ensureDirectoryExists(directory);
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Validates if string is valid JSON and returns detailed error
 */
export function validateJSON(str: string): { valid: boolean; error?: string } {
  if (!str || str.trim() === '') {
    return { valid: false, error: 'JSON string is empty or undefined' };
  }

  try {
    JSON.parse(str);
    return { valid: true };
  } catch (error) {
    let errorMessage = 'Invalid JSON format';
    
    if (error instanceof SyntaxError) {
      errorMessage = `JSON Parse Error: ${error.message}`;
      
      // Provide more specific hints based on common errors
      const msg = error.message.toLowerCase();
      if (msg.includes('unexpected token')) {
        errorMessage += ' - Check for missing quotes, trailing commas, or invalid characters';
      } else if (msg.includes('unexpected end')) {
        errorMessage += ' - The JSON string appears to be incomplete';
      } else if (msg.includes('position')) {
        errorMessage += ' - Check the syntax around the indicated position';
      }
    } else {
      errorMessage = `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
    
    return { valid: false, error: errorMessage };
  }
}

/**
 * Validates if string is valid JSON (backward compatibility)
 */
export function isValidJSON(str: string): boolean {
  return validateJSON(str).valid;
}
