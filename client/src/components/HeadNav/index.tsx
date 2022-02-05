import React from 'react';
import style from './index.less';
import { Button, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface HeadNavProps {
  userId: string
  onLogout: () => void
}

const HeadNav: React.FC<HeadNavProps> = (props) => {
  return (
    <div className={style.box}>
      <div className={style.logo}>猫眼电影_后台管理系统</div>
      <div>
        <span className={style.userId}>
          欢迎：{props.userId}
        </span>
        <Tooltip title="注销">
          <Button danger type="primary" icon={<LogoutOutlined />} onClick={props.onLogout} />
        </Tooltip>
      </div>
    </div>
  );
}

export default HeadNav;
