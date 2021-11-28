import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { GetUsers } from '~/services/admin/users';
import { UserModel, getColumns, initPagination } from './UserTableProps';

const UserTable = () => {
  const [userList, setUserList] = useState<UserModel[]>([]); //用户列表元数据
  const [pagination, setPagination] = useState<object>(initPagination);  // 用户列表总长度
  const [loading, setLoading] = useState<boolean>(false);  // table的loading

  const fetchUserList = async (pagination: any) => {
    setLoading(true);

    const result = await GetUsers({
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
    if (result.status === 200) {
      const { data, total } = result.data;
      setUserList(data);
      setPagination({
        ...setPagination,
        total
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserList(pagination);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTableChange = (tablePagination: any) => {
    setPagination({
      ...pagination,
      ...tablePagination
    });
    fetchUserList(tablePagination);
  };

  const columns = getColumns();

  return (
    <div>
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={userList}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default UserTable
