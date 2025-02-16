// Phonebook_Backend/eslint.config.mjs
import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',   // Using CommonJS module system (require/exports)
      globals: {
        ...globals.node,        // Use Node.js global variables (like process, __dirname)
        ...globals.browser      // Add browser globals like window, document, etc.
      },
      ecmaVersion: 'latest'      // Use the latest ECMAScript version
    },
    rules: {
      'eqeqeq': 'error',                        // Require === instead of ==
      'no-trailing-spaces': 'error',            // No spaces at end of lines
      'object-curly-spacing': ['error', 'always'], // Require spaces inside curly braces
      'arrow-spacing': ['error', { 'before': true, 'after': true }], // Require spaces around arrow functions
      'no-console': 'off',                      // Allow console.log statements
      'indent': ['error', 2],                   // Enforce 2-space indentation
      'quotes': ['error', 'single'],            // Use single quotes
      'semi': ['error', 'never'],               // No semicolons
      'no-unused-vars': 'warn',                 // Warn about unused variables
      'no-undef': 'error',                      // Disallow use of undeclared variables
      'no-fallthrough': 'error',                // Disallow fallthrough in switch statements
      'no-empty': 'error',                      // Disallow empty block statements
      'no-prototype-builtins': 'error',         // Disallow direct use of Object.prototype methods
      'valid-typeof': 'error'                   // Enforce valid typeof comparisons
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**']
  }
]
