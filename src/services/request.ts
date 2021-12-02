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
    const token = localStorage.getItem('token');
    console.log(token)
    return config;
  });

  instance.interceptors.response.use(response => {
    return response;
  }, err => {
    const response = err.response;
    message.error({
      content: `请求错误(${response.status}), ${response.data.message || response.data}`
    });
  });

  return instance(config);
};

export default request;