export interface JsonForgeOptions {
  /**
   * Whether to generate model files
   * @default false
   */
  generateModels?: boolean;

  /**
   * Path where model files should be created (relative to project root)
   * @default './models'
   */
  modelsPath?: string;

  /**
   * Language for generated models
   * @default 'typescript'
   */
  language?: 'typescript' | 'javascript';

  /**
   * Whether to prettify the output JSON
   * @default true
   */
  prettify?: boolean;

  /**
   * Interface name for generated models
   * @default 'GeneratedModel'
   */
  interfaceName?: string;

  /**
   * Whether to export the generated models
   * @default true
   */
  exportModels?: boolean;
}

export interface ParseResult {
  /**
   * Parsed JSON object
   */
  data: any;

  /**
   * Generated model file paths (if generateModels is true)
   */
  modelFiles?: string[];

  /**
   * Success status
   */
  success: boolean;

  /**
   * Error message (if any)
   */
  error?: string;
}
