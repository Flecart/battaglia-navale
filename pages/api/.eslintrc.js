module.exports = {
    'extends': '../../.eslintrc.js',
    'rules': {
        'new-cap': 'off',
        'indent': [ // https://stackoverflow.com/questions/70642350/eslint-indent-rule-indents-decorated-members
            `error`,
            4,
            {
                'ignoredNodes': [
                    `FunctionExpression > .params[decorators.length > 0]`,
                    `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
                    `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
                ],
            },
        ],
    },
};
