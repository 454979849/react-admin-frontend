module.exports = {
  roots: ['<rootDir>/test'],
  setupFiles: ['<rootDir>/jest.config.js'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest',
  }
};