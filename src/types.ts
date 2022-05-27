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

export interface ICapsule {
  tc: {
    c_idx: number;
    c_generator: string;
    c_title: string;
    c_content: string;
    c_thunb: string;
    c_createdAt: Date;
    c_openAt: Date;
    c_location: string;
    c_collaborator: string[];
  }[];
  loading: boolean;
  error: {
    msg: string | null;
  };
}

export interface IMemory {
  c_idx: number;
  memoryList: {
    m_idx: number;
    m_autor: string;
    content: string;
    img: string[];
    music: string;
  }[];
  loading: boolean;
  error: {
    msg: string | null;
  };
}

export interface IState {
  user: IUser;
  capsule: ICapsule;
  memory: IMemory;
}

export const backUrl = 'http://43.200.42.181';
