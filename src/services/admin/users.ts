import request from '~/services/request';

export const GetUsers = (config: object) => {
  return request({
    url: '/api/admin/users',
    params: {
      ...config
    },
  });
};