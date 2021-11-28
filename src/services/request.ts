import axios from 'axios';
import { message } from 'antd';


interface Config {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: object;
  data?: object;
}

const request = (config: Config) => {
  const instance = axios.create({
    timeout: 5000,
    withCredentials: true,
  });

  instance.interceptors.request.use(config => {
    return config;
  });

  instance.interceptors.response.use(response => {
    return response;
  }, err => {
    message.error({
      content: `网络请求错误, ${err.message}`
    });
  });

  return instance(config);
};

export default request;