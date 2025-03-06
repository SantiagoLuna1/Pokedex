export default {
    verbose: true,
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.js$': 'babel-jest', // Transforma los archivos JS usando Babel
    },
    transformIgnorePatterns: [
      '/node_modules/', // Esto permite a Jest transformar un paquete específico en node_modules (reemplaza "your-package-name" con el nombre de tu paquete)
    ],
    moduleFileExtensions: ['js', 'mjs'],
};