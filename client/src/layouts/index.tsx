import React from 'react';
import style from './index.less';
import Layout from '@/components/Layout';
import SiderMenu from '@/components/SiderMenu';
import HeadNavContainer from '@/components/connect/HeadNavContainer';
import Admin from '@/wrappers/Admin';

const GlobalLayout: React.FC<any> = (props) => {
  if(props.location.pathname === '/login') {
    return props.children;
  }else {
    return (
      <Admin>
        <Layout header={<HeadNavContainer/>} sider={<SiderMenu/>}>
          <div className={style.main}>
            {props.children}
          </div>
        </Layout>
      </Admin>
    );
  }
}

export default GlobalLayout;
