import { useSelector } from 'react-redux';
import { ICapsule } from '../types';

export const CREATE_R = 'capsule/CREATE_REQUEST' as const;
export const READ_R = 'capsule/READ_REQUEST' as const;
export const READ_S = 'capsule/READ_SUCCESS' as const;

export interface IPayload {
  cGenerator: object;
  cName: string;
  cDesc: string;
  cLocation: string;
  cCollaborator: object[];
  cOpenAt: Date;
}

export const create_R = (payload: IPayload) => ({
  type: CREATE_R,
  payload,
});

export const read_R = (payload: IPayload) => ({
  type: READ_R,
  payload,
});

export const read_S = (payload: IPayload) => ({
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
    },
  ],
  loading: false,
  error: {
    msg: '',
    status: false,
  },
};

export type CapsuleAction =
  | ReturnType<typeof create_R>
  | ReturnType<typeof read_R>
  | ReturnType<typeof read_S>;

function capsule(state: ICapsule = initialState, action: CapsuleAction) {
  switch (action.type) {
    case READ_R:
      return {
        ...state,
        loading: true,
      };
    case READ_S:
      return {
        ...state,
        loading: false,
      };
    case CREATE_R:
      console.log('디스패치 여기로 옴?');
      return {
        ...state,
        capsule: [
          {
            ...state.capsule,
          },
          {
            c_generator: action.payload.cGenerator,
            c_title: action.payload.cName,
            c_content: action.payload.cDesc,
            c_thumb: '1',
            c_location: action.payload.cLocation,
            c_collaborator: [action.payload.cCollaborator],
            c_openAt: action.payload.cOpenAt,
          },
        ],
        loading: true,
      };
    default:
      return { ...state };
  }
}

export default capsule;
