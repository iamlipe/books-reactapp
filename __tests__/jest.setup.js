import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        request: {use: jest.fn(() => Promise.resolve({data: {foo: 'bar'}}))},
        response: {use: jest.fn(() => Promise.resolve({data: {foo: 'bar'}}))},
      },
    })),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-localize', () => {
  return {
    findBestAvailableLanguage: jest.fn(() => ({languageTag: 'pt'})),
  };
});

jest.mock('react-hook-form', () => {
  const originalModule = jest.requireActual('react-hook-form');

  return {
    __esModule: true,
    ...originalModule,
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
