jest.mock('react-native-localize', () => {
  return {
    findBestAvailableLanguage: jest.fn(() => ({languageTag: 'pt'})),
  };
});

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));
