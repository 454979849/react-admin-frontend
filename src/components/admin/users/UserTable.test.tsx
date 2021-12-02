import React from 'react';
import ReactOM from 'react-dom'
import { render, screen, fireEvent, act, waitFor, within } from '@testing-library/react';
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

describe('UserTable操作', async () => {
  beforeEach(() => {
    act(() => {
      render(<UserTable />);
    });
  });

  test('UserTable显示数据', async () => {
    const LiJuanText = await screen.findByText('李娟');
    expect(LiJuanText).toBeInTheDocument();
  });

  it('UserTable删除数据', async () => {
    const deleteBtn = await screen.getAllByTestId('test-user-table-delete-btn');
    fireEvent.click(deleteBtn[0]);
    const deleteText = await screen.findByText('删除成功');
    expect(deleteText).toBeInTheDocument();
  });

  it('UserTable创建user必填验证', async () => {
    const createBtn = screen.getByTestId('test-user-table-create-btn');
    expect(createBtn).toBeInTheDocument();
    fireEvent.click(createBtn);

    const createForm = await screen.findByTestId('test-user-table-create-update-form');
    expect(createForm).toBeInTheDocument();
    const createFormBtn = within(createForm).getByTestId('test-user-table-create-update-form-btn');
    expect(createFormBtn).toBeInTheDocument();
    fireEvent.click(createFormBtn);
    // 验证空点时name，password验证
    const nameValiateText = await within(createForm).findByText('请填写姓名');
    expect(nameValiateText).toBeInTheDocument();
    const passwordValiateText = await within(createForm).findByText('请填写密码');
    expect(passwordValiateText).toBeInTheDocument();
  });

  it('UserTable密码正则验证', async () => {
    const createBtn = screen.getByTestId('test-user-table-create-btn');
    expect(createBtn).toBeInTheDocument();
    fireEvent.click(createBtn);
    const createForm = await screen.findByTestId('test-user-table-create-update-form');
    const createNameInput = within(createForm).getByTestId('test-user-table-name-input');
    const createPasswordInput = within(createForm).getByTestId('test-user-table-password-input');
    fireEvent.change((createNameInput), { target: { value: 'test' } });
    fireEvent.change(createPasswordInput, { target: { value: '_1' } })
    expect(createNameInput).toHaveValue('test');
    expect(createPasswordInput).toHaveValue('_1');
    const createFormBtn = within(createForm).getByTestId('test-user-table-create-update-form-btn');
    fireEvent.click(createFormBtn);
    const passwordValiateText = await within(createForm).findByText('密码格式错误');
    expect(passwordValiateText).toBeInTheDocument();
  });

  it('UserTable创建提交', async () => {
    const createBtn = screen.getByTestId('test-user-table-create-btn');
    expect(createBtn).toBeInTheDocument();
    fireEvent.click(createBtn);
    const createForm = await screen.findByTestId('test-user-table-create-update-form');
    const createNameInput = within(createForm).getByTestId('test-user-table-name-input');
    const createPasswordInput = within(createForm).getByTestId('test-user-table-password-input');
    fireEvent.change((createNameInput), { target: { value: 'test' } });
    fireEvent.change(createPasswordInput, { target: { value: '1234' } })
    expect(createNameInput).toHaveValue('test');
    expect(createPasswordInput).toHaveValue('1234');

    const createFormBtn = within(createForm).getByTestId('test-user-table-create-update-form-btn');
    fireEvent.click(createFormBtn);

    waitFor(async () => {
      const createText = await screen.findByText('用户创建成功');
      expect(createText).toBeInTheDocument();
    });
  })
});