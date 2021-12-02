import request from '~/services/request';

export const Login = (config: object) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      ...config
    },
  });
};