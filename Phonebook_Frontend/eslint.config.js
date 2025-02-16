// Phonebook_Frontend/eslint.config.js
import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    plugins: {
      react
    },
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module',             // Use ES modules
      ecmaVersion: 'latest',            // Latest ECMAScript version
      globals: {
        ...globals.browser,             // Browser global variables like window, document
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true                     // Enable JSX
        }
      }
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
      'no-unused-vars': 'off',                 // Warn about unused variables
      'react/prop-types': 'off',                // Disable prop-types for now (if you're not using them)
      'react/react-in-jsx-scope': 'off'         // Not required in modern React with new JSX transform
    },
    settings: {
      react: {
        version: 'detect'  // Automatically detect the React version
      }
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**']
  }
]
