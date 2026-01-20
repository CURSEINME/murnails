module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxBracketSameLine: false, // Для React 17+ лучше использовать false
  jsxSingleQuote: false,
  printWidth: 100, // Увеличено с 80 для лучшей читаемости современного кода
  proseWrap: 'always', // Более предсказуемое поведение для Markdown
  quoteProps: 'consistent', // Более последовательное поведение
  requirePragma: false,
  semi: true,
  singleQuote: true, // Рекомендуется для JavaScript/TypeScript
  tabWidth: 2,
  trailingComma: 'all', // Более современный вариант чем 'es5'
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
  plugins: [
    'prettier-plugin-tailwindcss', // Автоматически сортирует классы Tailwind
  ],
};