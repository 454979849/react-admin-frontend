import request from '~/services/request';

export const GetUsers = (config: object) => {
  return request({
    url: '/api/admin/users',
    params: {
      ...config
    },
  });
};

export const deleteUser = (config: object) => {
  return request({
    url: '/api/admin/users',
    method: 'DELETE',
    data: {
      ...config
    },
  });
};