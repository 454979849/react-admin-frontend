import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import { RouteModel, RoutePropsModel } from '~/common/sharedModel';
import styles from './index.less';

const { SubMenu } = Menu;



interface Props extends RoutePropsModel {
}

const LeftNav = ({
  routes,
}: Props): ReactElement => {
  const getMenuNodes = (menuList: RouteModel[]) => {
    return menuList.map(menu => {
      if (!menu.routes) {
        return (
          <Menu.Item key={menu.path} icon={menu.icon}>
            <Link to={menu.path}>
              {menu.title}
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={menu.path} icon={menu.icon} title={menu.title}>
            {
              getMenuNodes(menu.routes)
            }
          </SubMenu>
        );
      }
    });
  };

  return (
    <>
      <Link to={'/'}
        className={styles.leftNav}
      >
        <header className={styles.leftNavHeader}>
          <h1>后台管理</h1>
        </header>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
      // selectedKeys={[path]}
      // defaultOpenKeys={[this.openKey]}
      >
        {
          getMenuNodes(routes)
        }
      </Menu>
    </>
  )
}

export default LeftNav
