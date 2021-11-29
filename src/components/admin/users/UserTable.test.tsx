import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import UserTable from './UserTable';

// beforeAll(() => {
//   Object.defineProperty(window, "matchMedia", {
//     value: jest.fn(() => { return { matches: true } })
//   });
// });

// jest.mock('../../../services/admin/users.ts');

describe('UserTable单元测试', async () => {
  test('UserTable显示数据', async () => {
    await render(<UserTable />);
    // screen.debug();

    // const userName = await screen.findByText('李娟');
    // expect(userName).toBeInTheDocument();
  });
});