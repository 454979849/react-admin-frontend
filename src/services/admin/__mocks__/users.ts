import {
  userListData,
  roleList
} from './sampleData';

export const GetRoleList = () => {
  return Promise.resolve({
    status: 200,
    data: {
      data: roleList,
    },
  });
};

export const GetUsers = (config: object) => {
  return Promise.resolve({
    status: 200,
    data: {
      data: userListData,
      total: userListData.length
    },
  });
};

export const CreateUser = (config: object) => {
  return Promise.resolve({
    status: 200,
    data: '用户创建成功'
  });
};

export const UpdateUser = (config: object) => {
  return Promise.resolve({
    status: 200,
    data: true
  });
};

export const DeleteUser = (config: object) => {
  return Promise.resolve({
    status: 200,
    data: 'deleted'
  });
};