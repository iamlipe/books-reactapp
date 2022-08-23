import React from 'react';
import {renderWithThemeProvider} from '@config/functions/Testing';

import {Login} from '@presentational/LoginScreen/Login';

it('renders correctly', () => {
  renderWithThemeProvider(<Login />);
});
