import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // supabase/functions is Deno TypeScript — remote URL imports and a Deno global —
  // which this browser/React config cannot meaningfully parse. Ignoring it is
  // STATED INTENT, not a gap: those files already matched no config block, so
  // `eslint .` walked past them and exited 0 having never opened them. They are
  // covered by `deno check` and `deno lint` instead (see the lint and
  // check:functions scripts in package.json).
  globalIgnores(['dist', 'supabase/functions']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
