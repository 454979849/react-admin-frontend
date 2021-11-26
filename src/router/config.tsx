import { lazy } from 'react';
import {
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { RouteModel } from '~/common/sharedModel';
const Admin = lazy(() => import('~/pages/admin/Admin'));
const Login = lazy(() => import('~/pages/login/Login'));
const Home = lazy(() => import('~/pages/admin/child-pages/home/Home'));

const routes: RouteModel[] = [
  {
    index: true,
    title: '首页',
    path: '/admin',
    component: Admin,
    routes: [
      {
        index: true,
        path: 'home',
        component: Home,
        icon: <HomeOutlined />,
        title: '首页'
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