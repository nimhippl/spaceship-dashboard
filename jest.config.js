module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/tests/unit/__mocks__/fileMock.js'
    },
    transformIgnorePatterns: [
        '/node_modules/'
    ],
    globals: {
        'vue-jest': {
            transform: {
                // Трансформатор для игнорирования svg
                '^.+\\.svg$': 'identity-obj-proxy'
            }
        }
    }
};
