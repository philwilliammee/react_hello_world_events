// http://eslint.org/docs/user-guide/configuring
module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'parserOptions': {
      'sourceType': 'module',
    },
    'plugins': [
      'react',
    ],
    'env': {
      'browser': true,
      'es6': true,
    },
    'extends': [
      // Load default configuration for react
      //'plugin:react/recommended',
      'google',
      // If you were to extend another popular 
      // eslint config, you'd put it here
    ],
    // add your custom rules here
    'rules': {
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      // Default no-unused-vars
      'no-unused-vars': 1,
      // jsx version of no-unused-vars
      'react/jsx-uses-vars': 1,
      //4 white spaces defined by laravel editor config
      "indent": ["error", 4],
      "max-len": [2, 80, 4, {ignoreComments: true, ignoreUrls: true, ignorePattern: "const url = `//"}]
    }
  }