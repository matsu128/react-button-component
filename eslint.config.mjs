import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest, // Jestのグローバル変数を追加
      },
    },
  },
  pluginJs.configs.recommended, // ESLintの推奨設定
  pluginReact.configs.flat.recommended, // React用の推奨設定
  {
    plugins: {
      prettier: pluginPrettier, // Prettierプラグインを追加
    },
    rules: {
      'prettier/prettier': 'error', // Prettierのルールを適用し、エラーとして扱う
      'react/react-in-jsx-scope': 'off', // React 17以降、Reactのインポートが不要
      'react/prop-types': 'error', // PropTypesのエラーチェックを有効化
    },
    settings: {
      react: {
        version: 'detect', // 自動的にReactのバージョンを検出
      },
    },
  },
  prettierConfig, // Prettierの設定を追加
  {
    files: ['**/*.test.js'], // テストファイルにのみ適用
    languageOptions: {
      globals: globals.jest, // Jestのグローバル変数を有効にする
    },
  },
];
