module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
  resolver: '<rootDir>/jest/resolver.js',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-gesture-handler|@react-navigation|nativewind)/)',
  ],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/jest/styleMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
