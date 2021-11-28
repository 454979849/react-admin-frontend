import { deleteUser } from '~/services/admin/users';
import { message } from 'antd';

export const DeleteUser = async (userId: string, refreshTable: Function) => {
  try {
    const result = await deleteUser({
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