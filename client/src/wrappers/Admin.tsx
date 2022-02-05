import { State } from '@/models/CommonTypes';
import React from 'react';
import { connect, Redirect } from 'umi'

interface AdminProps {
  isLogin: boolean
}

const Admin: React.FC<AdminProps> = (props) => {
  if (props.isLogin) {
    return <>{ props.children }</>;
  } else {
    return <Redirect to="/login" />;
  }
}

const mapStateToprops = (state: State) => ({
  isLogin: state.loginUser !== null
});

export default connect(mapStateToprops)(Admin);
