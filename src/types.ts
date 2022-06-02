import * as ImagePicker from 'expo-image-picker';

export interface IUser {
  isLogin: boolean;
  me: {
    u_idx: number | null;
    u_id: string | null;
    u_alias: string | null;
  };
  loading: boolean;
  error: {
    msg: string | null;
  };
}

export interface Iuser {
  u_idx: number;
  u_id: string;
  u_alias: string;
}

export interface Capsule {
  c_idx: number | null;
  c_generator: string | null;
  c_title: string | null;
  c_content: string | null;
  c_thumb: string | null;
  c_createdAt: Date | null;
  c_openAt: Date | null;
  c_location: string | null;
  isOpened: boolean | null;
  c_collaborator: string[];
}

export interface ICapsule {
  capsule: Capsule[];
  loading: boolean;
  success: boolean;
  error: {
    msg: string | null;
    status: boolean;
  };
}

export interface IMemory {
  m_idx: number;
  m_content: string;
  m_author: number | null;
  c_idx: number;
  User: {
    u_alias: string;
  };
  MemoryMusic: {
    link: string | null;
  };
  MemoryImgs: {
    img: string;
  }[];
}

interface IMemoryState {
  data: IMemory[];
  loading: boolean;
  error: boolean;
}

export interface IMemoryCreateResponse {
  result: string;
  data: null;
}

export interface IState {
  user: IUser;
  capsule: ICapsule;
  memory: IMemoryState;
}

export interface ImageOptions {
  mediaTypes: ImagePicker.MediaTypeOptions;
  allowsEditing: boolean;
  aspect: [number, number];
  quality: number;
}

export const backUrl = 'http://43.200.42.181';
