import { ReactElement } from 'react';
import { Outlet, Route, Navigate, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { RoutePropsModel } from '~/common/sharedModel';
import LeftNav from '~/components/admin/left-nav/LeftNav';
import Header from '~/components/admin/header/Header';
import styles from './index.less';

const { Sider, Content } = Layout;
interface Props extends RoutePropsModel {

}

function Admin({
  routes
}: Props): ReactElement {

  if (!localStorage.getItem('token')) {
    return (
      <Routes>
        <Route path={'/*'} element={<Navigate replace to={'/login'} />} />
      </Routes>
    );
  }

  return (
    <>
      <Layout className={styles.admin} style={{
        minHeight: '100%',
      }}>
        <Sider>
          <LeftNav routes={routes} />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: 20, backgroundColor: '#ffffff' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Admin;
