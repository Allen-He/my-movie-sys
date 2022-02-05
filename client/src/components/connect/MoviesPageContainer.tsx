import { State } from '@/models/CommonTypes';
import { connect, Dispatch } from 'umi';
import MoviesSearchBar from '../MoviesSearchBar';
import MoviesTable from '../MoviesTable';

let mapStateToProps1 = (state: State) => {
  return {
    keyword: state.movies.condition.key,
  }
}

let mapDispatchToProps1 = (dispatch: Dispatch) => {
  return {
    onSearch: (keyword: string) => {
      dispatch({
        type: 'movies/changeUrl',
        payload: { key: keyword, page: 1 }
      })
    }
  }
}

const MoviesSearchBarContainer = connect(mapStateToProps1, mapDispatchToProps1)(MoviesSearchBar);


let mapStateToProps2 = (state: State) => {
  return {
    movies: state.movies.result.datas,
    loading: state.loading.effects['movies/fetchMovies'] || false,
    current: state.movies.condition.page,
    total: state.movies.result.total,
    pageSize: state.movies.condition.limit,
  }
}

let mapDispatchToProps2 = (dispatch: Dispatch) => {
  return {
    onPageChange: (page: number) => {
      dispatch({
        type: 'movies/changeUrl',
        payload: { page }
      })
    }
  }
}

const MoviesTableContainer = connect(mapStateToProps2, mapDispatchToProps2)(MoviesTable);

export default function MoviesPageContainer() {
  return (
    <>
      <MoviesSearchBarContainer />
      <MoviesTableContainer />
    </>
  )
}
