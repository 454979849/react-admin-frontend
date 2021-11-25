import { lazy } from 'react'
import { RouteModel } from '~/common/sharedModel';
const Admin = lazy(() => import('~/pages/admin/Admin'));
const Login = lazy(() => import('~/pages/login/Login'));
const Temp = lazy(() => import('~/pages/temp/Temp'));

const routes: RouteModel[] = [
  {
    path: '/',
    component: Admin,
    routes: [
      {
        path: '/temp',
        component: Temp
      },
    ],
  },
  {
    path: '/login',
    component: Login,
  },
];

export default routes;