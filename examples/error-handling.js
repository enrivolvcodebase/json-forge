const { parseJSON, stringifyJSON } = require('../dist/index.js');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║         JSON Forge - Error Handling & Logging Demo           ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

/**
 * Helper function to log results with proper formatting
 */
function logResult(testName, result) {
  console.log(`\n📋 ${testName}`);
  console.log('─'.repeat(70));
  
  if (result.success) {
    console.log('✅ Status: SUCCESS');
    console.log('📦 Data:', JSON.stringify(result.data, null, 2));
  } else {
    console.log('❌ Status: FAILED');
    console.log('🚨 Error Details:');
    console.log(result.error);
    
    // You can log this to your logging system
    // Example: logger.error('JSON Parse Failed', { error: result.error, timestamp: new Date() });
  }
  console.log('─'.repeat(70));
}

// Test Cases with Invalid JSON Strings

// 1. Missing quotes around property name
logResult(
  'Test 1: Missing Quotes Around Property',
  parseJSON('{name: "John", age: 30}')
);

// 2. Trailing comma
logResult(
  'Test 2: Trailing Comma',
  parseJSON('{"name": "John", "age": 30,}')
);

// 3. Single quotes instead of double quotes
logResult(
  'Test 3: Single Quotes (invalid in JSON)',
  parseJSON("{'name': 'John', 'age': 30}")
);

// 4. Incomplete JSON - missing closing brace
logResult(
  'Test 4: Incomplete JSON (missing closing brace)',
  parseJSON('{"name": "John", "age": 30')
);

// 5. Plain text (not JSON)
logResult(
  'Test 5: Plain Text (not JSON)',
  parseJSON('This is just plain text')
);

// 6. Empty string
logResult(
  'Test 6: Empty String',
  parseJSON('')
);

// 7. Undefined keyword (not valid in JSON)
logResult(
  'Test 7: Undefined Keyword',
  parseJSON('{"name": "John", "status": undefined}')
);

// 8. Malformed array
logResult(
  'Test 8: Malformed Array',
  parseJSON('[1, 2, 3,]')
);

// 9. Mixed quotes
logResult(
  'Test 9: Mixed Quotes',
  parseJSON('{"name": "John", \'age\': 30}')
);

// 10. Valid JSON for comparison
logResult(
  'Test 10: VALID JSON (for comparison)',
  parseJSON('{"name": "John", "age": 30, "active": true}')
);

console.log('\n\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║              Using Errors for Production Logging             ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

// Example: Production-ready error logging
function parseUserInput(jsonString, userId = 'unknown') {
  const result = parseJSON(jsonString);
  
  if (!result.success) {
    // Log to your logging system (e.g., Winston, Bunyan, etc.)
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      service: 'json-parser',
      userId: userId,
      errorType: 'JSON_PARSE_ERROR',
      errorMessage: result.error,
      input: jsonString.substring(0, 100), // Log first 100 chars for debugging
    };
    
    console.log('📝 Production Log Entry:');
    console.log(JSON.stringify(logEntry, null, 2));
    
    // In production, you would send this to your logging service:
    // logger.error('JSON parsing failed', logEntry);
    // Sentry.captureException(new Error(result.error), { extra: logEntry });
    
    return null;
  }
  
  console.log('✅ Successfully parsed JSON for user:', userId);
  return result.data;
}

console.log('\n📌 Example 1: User submits invalid JSON');
parseUserInput('{"user": "Alice", "status": undefined}', 'user_12345');

console.log('\n\n📌 Example 2: User submits valid JSON');
parseUserInput('{"user": "Bob", "status": "active"}', 'user_67890');

console.log('\n\n✨ All tests completed!\n');
