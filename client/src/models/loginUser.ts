import { Effect, Reducer, Subscription } from 'umi';

export type loginUserModelState = string;

export interface loginUserModelType {
  state: loginUserModelState | null;
  reducers: {
    setLoginUser: Reducer<loginUserModelState>;
  };
  effects: {
    login: Effect;
    logout: Effect;
  };
  subscriptions: { syncLocalStorage: Subscription };
}

const LOGINUSER_KEY = 'loginUser_info';

const loginUserModel: loginUserModelType = {
  state: null,
  reducers: {
    setLoginUser(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { loginId, loginPwd } = payload;
      if(loginId === 'admin' && loginPwd === '123456') {
        yield put({ type: 'setLoginUser', payload: loginId });
        localStorage.setItem(LOGINUSER_KEY, loginId);
        return true; //登录成功
      }
      return false; //登录失败
    },
    *logout({ payload }, { call, put }) {
      yield put({ type: 'setLoginUser', payload: null });
      localStorage.removeItem(LOGINUSER_KEY);
    }
  },
  subscriptions: {
    syncLocalStorage({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const loginId = localStorage.getItem(LOGINUSER_KEY);
        if(loginId) { //若loginId存在，则证明当前已登录 --- 初始化状态
          dispatch({type: 'setLoginUser', payload: loginId});
        }
      });
    },
  },
};

export default loginUserModel;
