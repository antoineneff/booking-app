module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/airbnb'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        semi: ['error', 'never'],
        indent: ['error', 4],
        "comma-dangle": ["error", "never"],
        "max-len": 0,
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
