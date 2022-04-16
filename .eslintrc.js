module.exports = {
  // 当前目录为根目录，ESLint规则被限定在根目录下
  root: true,
  // env 启用ESLint 检测的环境
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser', // 解析.vue文件
  extends: [
    'standard', // 采用 standard style
    'plugin:vue/recommended', // 这里是对插件vue-eslint-parser下的某一类配置对象的引用
    // 'plugin:vue/essential' // 这里是对插件vue-eslint-parser下的某一类配置对象的引用
    // ...其他lint
    // 为了保证格式化后代码都以prettier为准，把这两项配置放到数组最后
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    // ecmaVersion: 12,
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  plugins: [],
  rules: {
    'no-unused-vars': 'warn',
    // 多个单词作组件名
    'vue/multi-word-component-names': 'off',

    // 'no-undef': 'warn',
    // 'no-labels': 'off',
    // camelcase: 'off',
    // 'quote-props': ['warn', 'consistent']
  },
}
