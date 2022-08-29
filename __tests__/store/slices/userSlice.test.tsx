import reducer, {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  User,
} from '@store/slices/userSlice';

describe('userSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGIN', () => {
    const validLogin = {
      email: 'validemail@email.com',
      password: '12341234',
    };

    const reducerLogin = reducer(undefined, LOGIN(validLogin));

    expect(reducerLogin).toEqual({
      isLoading: true,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGIN_SUCCESS', () => {
    const user: User = {
      id: '1',
      name: 'Neymar Junior',
      email: 'neymar@email.com',

      authorization: undefined,
      refreshToken: undefined,
    };

    const reducerLoginSuccess = reducer(
      undefined,
      LOGIN_SUCCESS({data: user, status: 200}),
    );

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: user,
      error: null,
      statusCode: 200,
    });
  });

  test('should handle LOGIN_FAILURE', () => {
    const errorResponse = 'something went wrong';

    const reducerLoginSuccess = reducer(
      undefined,
      LOGIN_FAILURE({error: errorResponse}),
    );

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: null,
      error: errorResponse,
      statusCode: null,
    });
  });

  test('should handle LOGOUT', () => {
    const reducerLogout = reducer(undefined, LOGOUT());

    expect(reducerLogout).toEqual({
      isLoading: true,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGOUT_SUCCESS', () => {
    const reducerLogout = reducer(undefined, LOGOUT_SUCCESS());

    expect(reducerLogout).toEqual({
      isLoading: false,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGOUT_FAILURE', () => {
    const reducerLogout = reducer(
      undefined,
      LOGOUT_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerLogout).toEqual({
      isLoading: false,
      auth: null,
      error: 'something went wrong',
      statusCode: null,
    });
  });
});
