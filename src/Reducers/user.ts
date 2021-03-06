import { IUser, Iuser } from '../types';
import quitAction from '../actions/userQuit';
import profileActions, { ProfileActionType } from '../actions/userProfile';

export const CREATE_S = 'USER/CREATE_SUCCESS' as const;
export const READ_R = 'USER/READ_REQUEST' as const;
export const READ_S = 'USER/READ_SUCCESS' as const;
export const READ_F = 'USER/READ_FAILURE' as const;
export const DELETE_S = 'USER/REMOVE_SUCESS' as const;

export const create_S = (payload: Iuser) => ({
  type: CREATE_S,
  payload,
});

export const read_R = (payload: Iuser) => ({
  type: READ_R,
  payload,
});

export const read_S = (payload: Iuser) => ({
  type: READ_S,
  payload,
});

export const read_F = (payload: Iuser) => ({
  type: READ_F,
  payload,
});

export const delete_S = (payload: Iuser) => ({
  type: DELETE_S,
  payload,
});

export type UserAction =
  | ReturnType<typeof create_S>
  | ReturnType<typeof read_R>
  | ReturnType<typeof read_S>
  | ReturnType<typeof read_F>
  | ReturnType<typeof delete_S>;

const initialState: IUser = {
  isLogin: false,
  me: {
    u_idx: null,
    u_id: null,
    u_alias: null,
  },
  loading: false,
  error: {
    msg: '',
  },
};

function user(state: IUser = initialState, action: UserAction): IUser {
  switch (action.type) {
    case READ_R:
      return {
        ...state,
        loading: true,
      };

    case READ_S:
      return {
        ...state,
        isLogin: true,
        me: {
          u_idx: action.payload.u_idx,
          u_id: action.payload.u_id,
          u_alias: action.payload.u_alias,
        },
        loading: false,
      };

    case READ_F:
      return {
        ...state,
        loading: false,
        error: {
          msg: '로그인 정보 없음',
        },
      };

    case DELETE_S:
      return initialState;

    case quitAction.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case quitAction.SUCCESS:
      return {
        ...state,
        isLogin: false,
        loading: false,
        me: {
          u_idx: null,
          u_id: null,
          u_alias: null,
        },
      };

    case quitAction.FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          msg: '탈퇴 실패',
        },
      };

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
          msg: 'api접속에러같음',
        },
      };

    default:
      return {
        ...state,
      };
  }
}

export default user;
