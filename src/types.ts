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
  c_idx: number;
  c_generator: string;
  c_title: string;
  c_content: string;
  c_thumb: string;
  c_createdAt: Date;
  c_openAt: Date;
  c_location: string;
  isOpened: boolean;
  c_collaborator: string[];
}

export interface ICapsule {
  capsule: Capsule[];
  loading: boolean;
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

export const backUrl = 'http://43.200.42.181';
