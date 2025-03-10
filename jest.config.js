export default {
    verbose: true,
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.js$': 'babel-jest', 
    },
    transformIgnorePatterns: [
      '/node_modules/', 
    ],
    moduleFileExtensions: ['js', 'mjs'],
};