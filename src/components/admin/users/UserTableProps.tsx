import { ActionBtnModel } from "~/common/sharedModel";
import ActionButtons from "~/components/shared/actionButtons/ActionButtons";
import SecretContent from "~/components/shared/secretContent/SecretContent";
import { deleteUser } from "~/utils/users";

export interface HandleColumns {
  refreshTable: Function;
  setShowUpdateModal: Function;
  setSelectedUser: Function
};
export interface UserModel {
  id: string;
  name: string;
  password: string;
  role: string;
}

export const initPagination = {
  current: 1,
  pageSize: 10,
  total: 0
};

export const getColumns = (handleColumns: HandleColumns) => {
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
      render: (_text: any, record: UserModel, _index: any) => (
        <ActionButtons
          actions={getActions(record, handleColumns)}
        />
      )
    },
  ];
};

const getActions = (record: UserModel, handleColumns: HandleColumns): ActionBtnModel[] => {
  return [
    {
      text: '修改',
      testId: 'test-user-table-update-btn',
      onClick: () => {
        handleColumns.setShowUpdateModal(true);
        handleColumns.setSelectedUser(record);
      }
    },
    {
      text: '删除',
      testId: 'test-user-table-delete-btn',
      onClick: () => {
        deleteUser(record.id, handleColumns.refreshTable);
      }
    },
  ];
};