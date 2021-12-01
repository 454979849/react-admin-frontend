import React from 'react';
import ReactOM from 'react-dom'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
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
  act(() => {
    render(<UserTable />);
  });

  expect.assertions(2);

  //获取用户列表
  const LiJuanText = await screen.findByText('李娟');
  expect(LiJuanText).toBeInTheDocument();

  // 删除操作
  const deleteBtn = await screen.getAllByTestId('test-user-table-delete-btn');
  fireEvent.click(deleteBtn[0]);
  await waitFor(async () => {
    const deleteText = await screen.findByText('删除成功');
    expect(deleteText).toBeInTheDocument();
  });
});