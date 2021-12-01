import request from '~/services/request';

export const GetRoleList = () => {
  return request({
    url: '/api/admin/roleList'
  });
};

export const GetUsers = (config: object) => {
  return request({
    url: '/api/admin/users',
    params: {
      ...config
    },
  });
};

export const CreateUser = (config: object) => {
  return request({
    url: '/api/admin/users',
    method: 'POST',
    data: {
      ...config
    },
  });
};

export const UpdateUser = (config: object) => {
  return request({
    url: '/api/admin/users',
    method: 'PUT',
    data: {
      ...config
    },
  });
};

export const DeleteUser = (config: object) => {
  return request({
    url: '/api/admin/users',
    method: 'DELETE',
    data: {
      ...config
    },
  });
};