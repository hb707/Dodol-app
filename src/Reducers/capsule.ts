import { useSelector } from 'react-redux';
import capsuleOpenActions from '../actions/capsuleOpen';
import { CapsuleCreateSuccessPayload, IPayload } from '../api/capsule';
import { ICapsule, Capsule } from '../types';

export const CREATE_R = 'capsule/CREATE_REQUEST' as const;
export const CREATE_S = 'capsule/CREATE_SUCCESS' as const;
export const CREATE_F = 'capsule/CREATE_FAIL' as const;

export const READ_R = 'capsule/READ_REQUEST' as const;
export const READ_S = 'capsule/READ_SUCCESS' as const;

export interface ReadPayloadAttribute {
  u_idx: null | number;
}

export interface ReadActionAttribute {
  type: string;
  payload: ReadPayloadAttribute;
}

export const create_R = (payload: IPayload) => ({
  type: CREATE_R,
  payload,
});

export const create_S = (payload: CapsuleCreateSuccessPayload) => ({
  type: CREATE_S,
  payload,
});

export const create_F = () => ({
  type: CREATE_F,
  payload: null,
});

export const read_R = (payload: ReadPayloadAttribute) => ({
  type: READ_R,
  payload,
});

export const read_S = (payload: Capsule[]) => ({
  type: READ_S,
  payload,
});

const initialState: ICapsule = {
  capsule: [
    {
      c_idx: 0,
      c_generator: '',
      c_title: '',
      c_content: '',
      c_thumb: '',
      c_location: '',
      c_createdAt: new Date(),
      c_openAt: new Date(),
      c_collaborator: [],
      isOpened: false,
    },
  ],
  loading: false,
  success: false,
  error: {
    msg: '',
    status: false,
  },
};

export type CapsuleAction =
  | ReturnType<typeof create_R>
  | ReturnType<typeof read_R>
  | ReturnType<typeof read_S>
  | ReturnType<typeof create_S>
  | ReturnType<typeof create_F>;

function capsule(state: ICapsule = initialState, action: CapsuleAction) {
  switch (action.type) {
    case READ_R:
      return {
        ...state,
        loading: true,
        error: {
          msg: '',
          status: false,
        },
      };

    case READ_S:
      return {
        ...state,
        capsule: action.payload,
        loading: false,
      };

    case CREATE_R:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case CREATE_S: {
      return {
        ...state,
        capsule: [
          ...state.capsule,
          {
            c_idx: action.payload.c_idx,
            c_generator: action.payload.c_generator,
            c_title: action.payload.c_title,
            c_content: action.payload.c_content,
            c_thumb: action.payload.c_thumb,
            c_location: action.payload.c_location,
            c_collaborator: action.payload.c_collaborator,
            c_createdAt: action.payload.c_createdAt,
            c_openAt: action.payload.c_openAt,
            isOpened: action.payload.isOpened,
          },
        ],
        loading: false,
        success: true,
      };
    }
    case CREATE_F:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case capsuleOpenActions.REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

export default capsule;
