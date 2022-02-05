import { State } from "@/models/CommonTypes"
import { Dispatch, connect, history } from "umi"
import HeadNav from "../HeadNav"

let mapStateToProps = (state: State) => {
  return {
    userId: state.loginUser,
  }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => {
      dispatch({ type: 'loginUser/logout' });
      history.push('/login');
    }
  }
}

const HeadNavContainer = connect(mapStateToProps, mapDispatchToProps)(HeadNav);

export default HeadNavContainer;
