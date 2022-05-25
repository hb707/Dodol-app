import { IUser } from '../types';
import profileActions, { ProfileActionType } from '../actions/userProfile';

const initialState: IUser = {
  isLogin: false,
  me: {
    u_idx: null,
    u_id: null,
    u_alias: null,
  },
  loading: false,
  error: {
    msg: null,
  },
};

function user(state: IUser = initialState, action: ProfileActionType): IUser {
  switch (action.type) {
    case profileActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: {
          msg: null,
        },
      };

    case profileActions.SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.payload,
      };

    case profileActions.FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          msg: action.payload.error,
        },
      };
    default:
      return state;
  }
}

export default user;
