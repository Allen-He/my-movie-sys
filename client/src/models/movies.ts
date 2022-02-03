import { ResponseDataByPagination } from '@/services/CommonTypes';
import MovieService, { Movie } from '@/services/MovieService';
import { Effect, Reducer, Subscription } from 'umi';
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
  };
  // subscriptions: { test: Subscription };
}


const movieModel: MovieModelType = {
  state: {
    condition: {
      page: 1,
      limit: 10,
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
        payload: { total: resp.total, data: resp.data }
      });
    }
  },
  // subscriptions: {
  //   test({ dispatch, history }) {
  //   },
  // },
};

export default movieModel;
