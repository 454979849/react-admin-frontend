import { lazy } from 'react';
import {
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { RouteModel } from '~/common/sharedModel';

import Home from '~/pages/admin/child-pages/home/Home';
import Users from '~/pages/admin/child-pages/users/Users';

const Admin = lazy(() => import('~/pages/admin/Admin'));
const Login = lazy(() => import('~/pages/login/Login'));

const routes: RouteModel[] = [
  {
    index: true,
    title: '首页',
    path: '/',
    component: Admin,
    routes: [
      {
        index: true,
        path: 'home',
        component: Home,
        icon: <HomeOutlined />,
        title: '首页'
      },
      {
        path: 'users',
        component: Users,
        icon: <UserOutlined />,
        title: '用户'
      },
    ],
  },
  {
    title: '登录',
    path: '/login',
    component: Login,
  },
];

export default routes;