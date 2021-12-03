import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, message, Modal } from 'antd';
import {
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
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

  const path = useLocation().pathname.substring(1);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('退出成功!');
    const gotoLogin = new CustomEvent('gotoLoginEvent');
    window.parent.dispatchEvent(gotoLogin);
  };

  const logoutModal = () => {
    Modal.confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        logout();
      },
    });
  };

  return (
    <div className={styles.leftNav}>
      <Link to={'/'}
      >
        <header className={styles.leftNavHeader}>
          <h1>后台管理</h1>
        </header>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
      >
        {
          getMenuNodes(routes)
        }
        <Menu.Item
          key='logout'
          icon={<LogoutOutlined />}
          onClick={logoutModal}
        >
          退出
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default LeftNav
