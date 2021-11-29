import {
  userListData
} from './sampleData';


export const GetUsers = (config: object) => {
  return Promise.resolve({
   status: 200,
   data: {
     data: userListData,
     total: userListData.length
   },
  });
};

export const deleteUser = (config: object) => {
  return Promise.resolve({
    status: 200,
    data: 'deleted'
  });
};