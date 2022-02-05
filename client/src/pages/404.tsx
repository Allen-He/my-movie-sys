import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { Redirect } from 'umi';


const NotFount: React.FC = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if(count === 0) {
      return;
    }
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  }, [count]);
  
  const renderInfo = () => {
    if(count === 0) {
      return <Redirect to="/" />
    }else {
      return <span>页面未找到；{count}秒后将跳转到系统首页</span>
    }
  }

  return (
    <Alert message={renderInfo()} type="info" showIcon />
  );
};

export default NotFount;
