import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

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

describe('UserTable单元测试', async () => {
  test('UserTable显示数据', async () => {
    await render(<UserTable />);

    const userName = await screen.findByText('李娟');
    expect(userName).toBeInTheDocument();
  });
});