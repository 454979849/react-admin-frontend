import { ActionBtnModel } from "~/common/sharedModel";
import ActionButtons from "~/components/shared/actionButtons/ActionButtons";
import SecretContent from "~/components/shared/secretContent/SecretContent";
import { DeleteUser } from "~/utils/users";

export interface UserModel {
  id: number;
  name: string;
  password: string;
  role: string;
}

export const initPagination = {
  current: 1,
  pageSize: 10,
  total: 0
};

export const getColumns = (refreshTable: Function) => {
  return [
    {
      key: 'name',
      title: '名字',
      dataIndex: 'name',
      sorter: true,
      width: '25%'
    },
    {
      key: 'password',
      title: '密码',
      dataIndex: 'password',
      width: '25%',
      render: (value: string) => (<SecretContent value={value} count={9} />)
    },
    {
      key: 'role',
      title: '用户角色',
      dataIndex: 'role',
      width: '25%'
    },
    {
      key: ' operations',
      title: '操作',
      width: '25%',
      render: (_text: any, record: any, _index: any) => (
        <ActionButtons
          actions={getActions(record, refreshTable)}
        />
      )
    },
  ];
};

const getActions = (record: any, refreshTable: Function): ActionBtnModel[] => {
  return [
    {
      text: '修改',
      testId: 'test-user-table-update-btn'
    },
    {
      text: '删除',
      testId: 'test-user-table-delete-btn',
      onClick: () => {
        DeleteUser(record.id, refreshTable);
      }
    },
  ];
};