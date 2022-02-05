import React, { ReactNode } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { SubMenu } = Menu;

interface menuItemType {
  key: string,
  title: string,
  icon?: ReactNode,
  children?: menuItemType[]
}

const menuConfig = [
  { key: '/', title: '首页', icon: <AppstoreOutlined /> },
  { key: 'moviesManager', title: '电影管理', icon: <SettingOutlined />,
    children: [
      { key: '/movies', title: '查询电影' },
      { key: '/movies/add', title: '添加电影' },
    ]
  }
];
function renderItem(menuConfig: menuItemType[]) {
  return menuConfig.map((item, i) => {
    if(item.children) {
      return (
        <SubMenu key={item.key} title={item.title} icon={item.icon}>
          {renderItem(item.children)}
        </SubMenu>
      )
    }else {
      return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>
    }
  });
}

function getDefaultOpenKeys(menuConfig: menuItemType[], curPathname: string): string[] {
  const resKeys: string[] = [];
  menuConfig.forEach((item) => {
    if(item.children) {
      for (const cur of item.children) {
        if(cur.key === curPathname) {
          resKeys.push(item.key);
        }
      }
    }
  });
  return resKeys;
}

function handleClick(e: any) {
  history.push(e.key);
}

const SiderMenu: React.FC = () => {
  const { pathname } = history.location;
  const menuItem = renderItem(menuConfig);
  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={getDefaultOpenKeys(menuConfig, pathname)}
      mode="inline"
      theme="dark"
    >
      {menuItem}
    </Menu>
  );
};

export default SiderMenu;
