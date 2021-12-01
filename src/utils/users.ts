import { DeleteUser } from '~/services/admin/users';
import { message } from 'antd';

export const deleteUser = async (userId: string, refreshTable: Function) => {
  try {
    const result = await DeleteUser({
      id: userId
    });
    if (result.status === 200) {
      message.success('删除成功');
      setTimeout(() => {
        refreshTable();
      }, 1000);
    }
  } catch (err) { }
};