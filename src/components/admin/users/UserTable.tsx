import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'antd';
import { GetUsers, GetRoleList } from '~/services/admin/users';
import { UserModel, getColumns, initPagination, HandleColumns } from './UserTableProps';
import CreateOrUpdateUser from './CreateOrUpdateUser';

const UserTable = () => {
  const [userList, setUserList] = useState<UserModel[]>([]); //用户列表元数据
  const [roleList, setRoleList] = useState<string[]>([]);   // 用户角色元数据
  const [pagination, setPagination] = useState<object>(initPagination);  // 用户列表总长度
  const [loading, setLoading] = useState<boolean>(false);  // table的loading
  const [refresh, setRefresh] = useState<number>(0);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  const refreshTable = () => {
    setRefresh(refresh + 1);
  };

  const fetchUserList = async (pagination: any) => {
    setLoading(true);

    try {
      const result = await GetUsers({
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      });
      if (result.status === 200) {
        const { data, total } = result.data;
        setUserList(data);
        setPagination({
          ...pagination,
          total
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }

  const fetchRoleList = async () => {
    setLoading(true);

    try {
      const result = await GetRoleList();
      if (result.status === 200) {

        const { data } = result.data;
        setRoleList(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList(pagination);
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRoleList();
  }, [])

  const handleTableChange = (tablePagination: any) => {
    setPagination({
      ...pagination,
      ...tablePagination
    });
    refreshTable();
  };

  const handleColumns: HandleColumns = {
    refreshTable: refreshTable.bind(this),
    setShowUpdateModal: setShowUpdateModal.bind(this),
    setSelectedUser: setSelectedUser.bind(this),
  };

  const columns = getColumns(handleColumns, roleList);



  return (
    <div>
      <Button
        data-testid='test-user-table-create-btn'
        type='primary'
        style={{ margin: '10px ' }}
        onClick={() => {
          setShowUpdateModal(!showUpdateModal);
        }}
      >
        创建用户
      </Button>
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={userList}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        size='middle'
        bordered
      />

      <Modal
        title={!!selectedUser ? '修改用户信息' : '创建用户信息'}
        visible={showUpdateModal}
        okText={!!selectedUser ? '修改' : '创建'}
        cancelText={'取消'}
        onCancel={() => {
          setShowUpdateModal(false);
          setSelectedUser(null);
        }}
        destroyOnClose
        footer={null}
      >
        <CreateOrUpdateUser
          roleList={roleList}
          selectedUser={selectedUser}
          isUpdate={!!selectedUser}
          onSucess={() => {
            setTimeout(() => {
              setShowUpdateModal(!showUpdateModal);
              refreshTable();
            }, 1000);
          }}
        />
      </Modal>
    </div>
  )
}

export default UserTable
