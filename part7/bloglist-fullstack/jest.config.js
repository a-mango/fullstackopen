module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@controllers(.*)$': '<rootDir>/server/controllers$1',
    '^@models(.*)$': '<rootDir>/server/models$1',
    '^@middleware(.*)$': '<rootDir>/server/middleware$1',
    '^@util(.*)$': '<rootDir>/server/util$1',
    '^@server(.*)$': '<rootDir>/server$1',
    '^@root(.*)$': '<rootDir>$1',
  },
}
