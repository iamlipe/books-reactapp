const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  cancelToken: {
    source: jest.fn(),
  },
  create: jest.fn(),
  defaults: {
    adapter: {},
    headers: {
      common: {},
    },
  },
};

export default axios;
