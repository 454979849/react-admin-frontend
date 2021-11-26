import React from 'react';
import { Layout } from 'antd';
import classes from './index.less'

const { Header: LayoutHeader } = Layout;
interface Props {

}

const Header = (props: Props) => {
  return (
    <div className={classes.header}>
      <LayoutHeader>
        header
      </LayoutHeader>
    </div>
  )
}

export default Header
