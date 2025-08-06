// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs']
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    },
    {
        rules: {
            'prettier/prettier': [
                'error',
                {
                    trailingComma: 'es5',
                    singleQuote: true,
                    jsxSingleQuote: true,
                    tabWidth: 4,
                    endOfLine: 'auto',
                    printWidth: 120,
                },
            ],
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    }
                },
            ],
            "@typescript-eslint/no-unsafe-return": "off",
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'off',
            'no-throw-literal': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
);