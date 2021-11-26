import React, { ReactElement } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { RoutePropsModel } from '~/common/sharedModel';
import LeftNav from '~/components/admin/left-nav/LeftNav';
import Header from '~/components/admin/header/Header';


const { Footer, Sider, Content } = Layout;
interface Props extends RoutePropsModel {

}

function Admin({
  routes
}: Props): ReactElement {
  return (
    <>
      <Layout style={{
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
