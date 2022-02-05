import React, {useRef} from 'react'
import style from './index.less'
import { Typography, Space, Button, Input } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface LoingFormProps {
  onLogin: (loginId: string, loginPwd: string) => void
}

const LoginForm: React.FC<LoingFormProps> = (props) => {
  const countRef: any = useRef();
  const pwdRef: any = useRef();

  return (
    <div className={style.loginForm}>
      <Title level={4}>欢迎登录-学生管理系统</Title>
      <Space direction="vertical">
        <Input ref={countRef} placeholder="请输入账号" prefix={<UserOutlined />} />
        <Input.Password ref={pwdRef} placeholder="请输入密码" prefix={<EditOutlined />} />
        <Button block type='primary'
          onClick={() => {
            const loginId = countRef.current.input.value;
            const loginPwd = pwdRef.current.input.value;
            props.onLogin && props.onLogin(loginId, loginPwd);
          }}
        >登录</Button>
      </Space>
    </div>
  )
}

export default LoginForm;
