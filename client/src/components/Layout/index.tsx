import React, { ReactNode } from 'react';
import style from './index.less'
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  header: ReactNode
  sider: ReactNode
}

const _Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Layout className={style.wrap}>
      <Header>{props.header}</Header>
      <Layout className={style.main}>
        <Sider>{props.sider}</Sider>
        <Content className={style.content}>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default _Layout;
