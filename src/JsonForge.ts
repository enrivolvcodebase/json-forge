import * as path from 'path';
import { JsonForgeOptions, ParseResult } from './types';
import {
  generateTypeScriptInterface,
  generateJavaScriptTypes,
  writeModelFile,
  isValidJSON,
} from './utils';

/**
 * JsonForge - A powerful JSON parser and model generator
 */
export class JsonForge {
  private options: Required<JsonForgeOptions>;

  constructor(options: JsonForgeOptions = {}) {
    this.options = {
      generateModels: options.generateModels ?? false,
      modelsPath: options.modelsPath ?? './models',
      language: options.language ?? 'typescript',
      prettify: options.prettify ?? true,
      interfaceName: options.interfaceName ?? 'GeneratedModel',
      exportModels: options.exportModels ?? true,
    };
  }

  /**
   * Parse JSON string to object
   */
  public parseToObject(jsonString: string): ParseResult {
    try {
      // Validate JSON with detailed error message
      const validation = this.validateJSONString(jsonString);
      if (!validation.valid) {
        return {
          data: null,
          success: false,
          error: validation.error || 'Invalid JSON string',
        };
      }

      const data = JSON.parse(jsonString);
      const modelFiles: string[] = [];

      if (this.options.generateModels) {
        const modelFile = this.generateModel(data);
        if (modelFile) {
          modelFiles.push(modelFile);
        }
      }

      return {
        data,
        success: true,
        modelFiles: modelFiles.length > 0 ? modelFiles : undefined,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown parsing error',
      };
    }
  }

  /**
   * Validate JSON string with detailed error message
   */
  private validateJSONString(jsonString: string): { valid: boolean; error?: string } {
    if (!jsonString || typeof jsonString !== 'string') {
      return {
        valid: false,
        error: 'Input must be a non-empty string',
      };
    }

    if (jsonString.trim() === '') {
      return {
        valid: false,
        error: 'JSON string is empty or contains only whitespace',
      };
    }

    try {
      JSON.parse(jsonString);
      return { valid: true };
    } catch (error) {
      let errorMessage = 'Invalid JSON format';
      
      if (error instanceof SyntaxError) {
        errorMessage = `JSON Parse Error: ${error.message}`;
        
        // Provide specific hints based on common JSON errors
        const msg = error.message.toLowerCase();
        if (msg.includes('unexpected token')) {
          errorMessage += '\n  → Check for: missing quotes around properties, trailing commas, or invalid characters';
        } else if (msg.includes('unexpected end')) {
          errorMessage += '\n  → The JSON string appears to be incomplete (missing closing braces or brackets)';
        } else if (msg.includes('position')) {
          errorMessage += '\n  → Check the syntax around the indicated position';
        }
        
        // Add position information if available
        const positionMatch = error.message.match(/position (\d+)/i);
        if (positionMatch) {
          const position = parseInt(positionMatch[1]);
          const snippet = jsonString.substring(Math.max(0, position - 20), position + 20);
          errorMessage += `\n  → Near: "${snippet}"`;
        }
      } else {
        errorMessage = `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
      
      return { valid: false, error: errorMessage };
    }
  }

  /**
   * Parse object to JSON string
   */
  public parseToString(obj: any): ParseResult {
    try {
      const jsonString = this.options.prettify
        ? JSON.stringify(obj, null, 2)
        : JSON.stringify(obj);

      const modelFiles: string[] = [];

      if (this.options.generateModels) {
        const modelFile = this.generateModel(obj);
        if (modelFile) {
          modelFiles.push(modelFile);
        }
      }

      return {
        data: jsonString,
        success: true,
        modelFiles: modelFiles.length > 0 ? modelFiles : undefined,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Generate model file from data
   */
  private generateModel(data: any): string | null {
    try {
      const { language, modelsPath, interfaceName, exportModels } = this.options;
      const fileExtension = language === 'typescript' ? '.ts' : '.js';
      const fileName = `${interfaceName}${fileExtension}`;
      const filePath = path.resolve(modelsPath, fileName);

      let modelContent: string;

      if (language === 'typescript') {
        modelContent = generateTypeScriptInterface(data, interfaceName, exportModels);
      } else {
        modelContent = generateJavaScriptTypes(data, interfaceName, exportModels);
      }

      writeModelFile(filePath, modelContent);
      return filePath;
    } catch (error) {
      console.error('Error generating model:', error);
      return null;
    }
  }

  /**
   * Update configuration options
   */
  public configure(options: JsonForgeOptions): void {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  /**
   * Get current configuration
   */
  public getConfig(): Required<JsonForgeOptions> {
    return { ...this.options };
  }
}

/**
 * Quick parse JSON string to object
 */
export function parseJSON(jsonString: string, options?: JsonForgeOptions): ParseResult {
  const forge = new JsonForge(options);
  return forge.parseToObject(jsonString);
}

/**
 * Quick parse object to JSON string
 */
export function stringifyJSON(obj: any, options?: JsonForgeOptions): ParseResult {
  const forge = new JsonForge(options);
  return forge.parseToString(obj);
}

export default JsonForge;
