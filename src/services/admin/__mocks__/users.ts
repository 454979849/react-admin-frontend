import {
  userListData
} from './sampleData';


export const GetUsers = (config: object) => {
  return Promise.resolve({
    data: userListData,
    status: 200,
    total: userListData.length
  });
};

export const deleteUser = (config: object) => {
  return Promise.resolve({
    status: 200,
    data: 'deleted'
  });
};