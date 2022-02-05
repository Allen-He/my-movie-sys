import { ResponseDataByPagination } from '@/services/CommonTypes';
import MovieService, { Movie } from '@/services/MovieService';
import { history, Effect, Reducer, Subscription } from 'umi';
import { State } from './CommonTypes';

export interface MovieModelState {
  condition: {
    page: number,
    limit: number,
    key: string
  };
  result: {
    total: number,
    datas: Movie[]
  }
};

export interface MovieModelType {
  state: MovieModelState;
  reducers: {
    setCondition: Reducer<MovieModelState>;
    setResult: Reducer<MovieModelState>
  };
  effects: {
    fetchMovies: Effect;
    changeUrl: Effect;
  };
  subscriptions: { listenUrlChange: Subscription };
}


const movieModel: MovieModelType = {
  state: {
    condition: {
      page: 1,
      limit: 6,
      key: ''
    },
    result: {
      total: 0,
      datas: []
    }
  },
  reducers: {
    setCondition(state, { payload }) {
      return {
        ...state,
        condition: {
          ...state?.condition,
          ...payload
        }
      } as MovieModelState;
    },
    setResult(state, { payload }) {
      return {
        ...state,
        result: payload
      } as MovieModelState;
    }
  },
  effects: {
    *fetchMovies({ payload }, { call, put, select }) {
      const condition = yield select((state: State) => state.movies.condition);
      const resp = yield call(MovieService.find, condition);
      yield put({
        type: 'setResult',
        payload: { total: resp.total, datas: resp.data }
      });
    },
    *changeUrl({ payload }, { call, select }) {
      const oldCondition = yield select((state: State) => state.movies.condition);
      const newCondition = { ...oldCondition, ...payload };
      const { page, limit, key } = newCondition;
      history.push(`/movies?page=${page}&limit=${limit}&key=${key}`);
    }
  },
  subscriptions: {
    listenUrlChange({ dispatch, history }) {
      history.listen((newLoc) => {
        if(newLoc.pathname !== '/movies') {
          return; //如果当前不为电影查询页，则什么都不做
        }
        const newCondition = getConditionByQuery((newLoc as any).query);
        dispatch({
          type: 'setCondition',
          payload: newCondition
        });
        dispatch({ type: 'fetchMovies' });
      })
    },
  },
};

/** 根据传入的query对象得到正确格式的condition对象 */
function getConditionByQuery(query: any) {
  const { page, limit, key } = query;
  const res: any = {};
  page && (res.page = +page);
  limit && (res.limit = +limit);
  key && (res.key = key);
  return res;
}

export default movieModel;
