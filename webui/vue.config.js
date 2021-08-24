const path = require('path');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
const rootResolve = (...ps) => path.resolve(__dirname, '../', ...ps);

const EntryName = 'manager.html';

module.exports = {
  lintOnSave: false,
  outputDir: rootResolve('site'),
  assetsDir: 'static',
  pages: {
    manager: {
      entry: 'src/pages/manager/index.ts',
      template: 'index.html',
      filename: EntryName,
      title: 'ZanProxy Admin Manager',
      chunks: ['chunk-vendors', 'chunk-common', 'manager'],
    },
    monitor: {
      entry: 'src/pages/monitor/index.ts',
      template: 'index.html',
      filename: 'monitor.html',
      title: 'ZanProxy Monitor',
      chunks: ['chunk-vendors', 'chunk-common', 'monitor'],
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@core': rootResolve('src/core'),
        '@webui': rootResolve('src/webui'),
      },
    },
    plugins: [
      new MonacoEditorWebpackPlugin({
        languages: ['html', 'json', 'javascript', 'typescript'],
        features: [
          'accessibilityHelp',
          'bracketMatching',
          'find',
          'folding',
          'format',
          'hover',
          'inPlaceReplace',
          'inspectTokens',
          'multicursor',
          'parameterHints',
          'smartSelect',
          'suggest',
          'wordHighlighter',
        ],
      }),
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 8085,
    inline: true,
    // public: 'http://127.0.0.1:40001',
    proxy: {
      '/': {
        target: 'http://127.0.0.1:40001'
      },
    },
    index: EntryName,
    writeToDisk: filepath => {
      return !filepath.includes('.hot-update.');
    },
  },
};
