import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as usersService from '~/services/admin/users';

import UserTable from './UserTable';

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

jest.mock('~/services/admin/users.ts');

test('UserTable显示数据', async () => {
  await render(<UserTable />);
});