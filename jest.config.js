const config = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
  },
  testPathIgnorePatterns: [
    '<rootDir>/ios',
    '<rootDir>/android',
    '<rootDir>/__tests__/jest.setup.js',
    '<rootDir>/node_modules',
  ],
  verbose: true,
  setupFiles: ['<rootDir>/__tests__/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@?react-navigation||@react-native-community)',
  ],
};

module.exports = config;
